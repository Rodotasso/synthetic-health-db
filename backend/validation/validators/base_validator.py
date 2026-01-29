"""
Clase base para validadores de plausibilidad.

Define interfaz comun y estructuras de resultado.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, List, Optional
import pandas as pd


class ValidationSeverity(str, Enum):
    """Severidad del resultado de validacion"""
    INFO = "info"           # Informativo
    WARNING = "warning"     # Discrepancia menor
    ERROR = "error"         # Discrepancia significativa
    CRITICAL = "critical"   # Valor implausible


@dataclass
class ValidationResult:
    """Resultado de una validacion individual"""
    check_name: str          # Nombre del check
    passed: bool             # Paso la validacion
    severity: ValidationSeverity
    message: str             # Mensaje descriptivo
    observed_value: Any = None
    expected_value: Any = None
    reference: Optional[str] = None  # Fuente de referencia
    metadata: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict:
        """Convierte a diccionario"""
        return {
            "check_name": self.check_name,
            "passed": self.passed,
            "severity": self.severity.value,
            "message": self.message,
            "observed_value": self.observed_value,
            "expected_value": self.expected_value,
            "reference": self.reference,
            "metadata": self.metadata,
        }


@dataclass
class ValidationReport:
    """Reporte completo de validacion"""
    validator_name: str
    data_description: str
    total_checks: int
    passed_checks: int
    results: List[ValidationResult]
    summary: str = ""

    @property
    def failed_checks(self) -> int:
        return self.total_checks - self.passed_checks

    @property
    def pass_rate(self) -> float:
        if self.total_checks == 0:
            return 0.0
        return self.passed_checks / self.total_checks * 100

    @property
    def errors(self) -> List[ValidationResult]:
        return [r for r in self.results if r.severity == ValidationSeverity.ERROR]

    @property
    def warnings(self) -> List[ValidationResult]:
        return [r for r in self.results if r.severity == ValidationSeverity.WARNING]

    @property
    def critical(self) -> List[ValidationResult]:
        return [r for r in self.results if r.severity == ValidationSeverity.CRITICAL]

    def to_dict(self) -> Dict:
        """Convierte a diccionario"""
        return {
            "validator": self.validator_name,
            "data": self.data_description,
            "total_checks": self.total_checks,
            "passed_checks": self.passed_checks,
            "failed_checks": self.failed_checks,
            "pass_rate": round(self.pass_rate, 1),
            "summary": self.summary,
            "results": [r.to_dict() for r in self.results],
        }

    def __str__(self) -> str:
        """Representacion string del reporte"""
        lines = [
            f"=== {self.validator_name} ===",
            f"Data: {self.data_description}",
            f"Checks: {self.passed_checks}/{self.total_checks} passed ({self.pass_rate:.1f}%)",
            "",
        ]

        if self.critical:
            lines.append(f"CRITICAL ({len(self.critical)}):")
            for r in self.critical:
                lines.append(f"  [!] {r.check_name}: {r.message}")

        if self.errors:
            lines.append(f"ERRORS ({len(self.errors)}):")
            for r in self.errors:
                lines.append(f"  [X] {r.check_name}: {r.message}")

        if self.warnings:
            lines.append(f"WARNINGS ({len(self.warnings)}):")
            for r in self.warnings:
                lines.append(f"  [!] {r.check_name}: {r.message}")

        if self.summary:
            lines.append("")
            lines.append(f"Summary: {self.summary}")

        return "\n".join(lines)


class BaseValidator(ABC):
    """Clase base abstracta para validadores"""

    def __init__(self, tolerance: float = 0.3):
        """
        Inicializa validador.

        Args:
            tolerance: Tolerancia relativa para comparaciones (default 30%)
        """
        self.tolerance = tolerance
        self._results: List[ValidationResult] = []

    @property
    @abstractmethod
    def name(self) -> str:
        """Nombre del validador"""
        pass

    @abstractmethod
    def validate(self, data: pd.DataFrame, **kwargs) -> ValidationReport:
        """
        Ejecuta validacion sobre datos.

        Args:
            data: DataFrame a validar
            **kwargs: Parametros adicionales

        Returns:
            ValidationReport con resultados
        """
        pass

    def _reset_results(self) -> None:
        """Reinicia lista de resultados"""
        self._results = []

    def _add_result(self, result: ValidationResult) -> None:
        """Agrega resultado a lista"""
        self._results.append(result)

    def _check_in_range(
        self,
        check_name: str,
        observed: float,
        expected: float,
        tolerance: Optional[float] = None,
        reference: Optional[str] = None,
    ) -> ValidationResult:
        """
        Verifica si valor esta en rango esperado.

        Args:
            check_name: Nombre del check
            observed: Valor observado
            expected: Valor esperado
            tolerance: Tolerancia (usa default si None)
            reference: Fuente de referencia

        Returns:
            ValidationResult
        """
        tol = tolerance if tolerance is not None else self.tolerance
        lower = expected * (1 - tol)
        upper = expected * (1 + tol)

        passed = lower <= observed <= upper

        if passed:
            severity = ValidationSeverity.INFO
            message = f"Valor {observed:.2f} dentro de rango [{lower:.2f}, {upper:.2f}]"
        else:
            deviation = abs(observed - expected) / expected if expected != 0 else float("inf")
            if deviation > 1.0:
                severity = ValidationSeverity.CRITICAL
            elif deviation > 0.5:
                severity = ValidationSeverity.ERROR
            else:
                severity = ValidationSeverity.WARNING
            message = (
                f"Valor {observed:.2f} fuera de rango esperado "
                f"[{lower:.2f}, {upper:.2f}] (desviacion: {deviation*100:.1f}%)"
            )

        result = ValidationResult(
            check_name=check_name,
            passed=passed,
            severity=severity,
            message=message,
            observed_value=observed,
            expected_value=expected,
            reference=reference,
        )
        self._add_result(result)
        return result

    def _check_distribution(
        self,
        check_name: str,
        observed_counts: Dict[str, int],
        expected_proportions: Dict[str, float],
        reference: Optional[str] = None,
    ) -> ValidationResult:
        """
        Verifica distribucion categorica via chi-cuadrado.

        Args:
            check_name: Nombre del check
            observed_counts: Conteos observados por categoria
            expected_proportions: Proporciones esperadas (suma = 1)
            reference: Fuente de referencia

        Returns:
            ValidationResult
        """
        from scipy import stats

        total = sum(observed_counts.values())
        if total == 0:
            return ValidationResult(
                check_name=check_name,
                passed=False,
                severity=ValidationSeverity.ERROR,
                message="No hay datos para validar distribucion",
                reference=reference,
            )

        # Calcular chi-cuadrado
        observed = []
        expected = []
        for category in observed_counts:
            observed.append(observed_counts[category])
            expected.append(expected_proportions.get(category, 0) * total)

        chi2, p_value = stats.chisquare(observed, expected)

        passed = p_value > 0.05  # Significancia 5%

        if passed:
            severity = ValidationSeverity.INFO
            message = f"Distribucion consistente (chi2={chi2:.2f}, p={p_value:.3f})"
        else:
            if p_value < 0.001:
                severity = ValidationSeverity.ERROR
            else:
                severity = ValidationSeverity.WARNING
            message = (
                f"Distribucion difiere de esperada "
                f"(chi2={chi2:.2f}, p={p_value:.3f})"
            )

        result = ValidationResult(
            check_name=check_name,
            passed=passed,
            severity=severity,
            message=message,
            observed_value=dict(observed_counts),
            expected_value=expected_proportions,
            reference=reference,
            metadata={"chi2": chi2, "p_value": p_value},
        )
        self._add_result(result)
        return result

    def _check_ks_test(
        self,
        check_name: str,
        observed_data: List[float],
        reference_cdf: str,
        params: Dict[str, float],
        reference: Optional[str] = None,
    ) -> ValidationResult:
        """
        Test Kolmogorov-Smirnov para distribuciones continuas.

        Args:
            check_name: Nombre del check
            observed_data: Datos observados
            reference_cdf: Nombre de distribucion ('norm', 'expon', etc.)
            params: Parametros de distribucion
            reference: Fuente de referencia

        Returns:
            ValidationResult
        """
        from scipy import stats

        if len(observed_data) < 10:
            return ValidationResult(
                check_name=check_name,
                passed=True,
                severity=ValidationSeverity.INFO,
                message="Muestra muy pequena para K-S test",
                reference=reference,
            )

        # Ejecutar K-S test
        if reference_cdf == "norm":
            stat, p_value = stats.kstest(
                observed_data,
                "norm",
                args=(params.get("loc", 0), params.get("scale", 1)),
            )
        elif reference_cdf == "expon":
            stat, p_value = stats.kstest(
                observed_data,
                "expon",
                args=(params.get("loc", 0), params.get("scale", 1)),
            )
        else:
            stat, p_value = stats.kstest(observed_data, reference_cdf)

        passed = p_value > 0.05

        if passed:
            severity = ValidationSeverity.INFO
            message = f"Distribucion consistente (KS stat={stat:.3f}, p={p_value:.3f})"
        else:
            severity = ValidationSeverity.WARNING
            message = (
                f"Distribucion difiere de {reference_cdf} "
                f"(KS stat={stat:.3f}, p={p_value:.3f})"
            )

        result = ValidationResult(
            check_name=check_name,
            passed=passed,
            severity=severity,
            message=message,
            metadata={"ks_stat": stat, "p_value": p_value, "distribution": reference_cdf},
            reference=reference,
        )
        self._add_result(result)
        return result

    def _create_report(self, data_description: str) -> ValidationReport:
        """
        Crea reporte final de validacion.

        Args:
            data_description: Descripcion de los datos validados

        Returns:
            ValidationReport
        """
        passed = sum(1 for r in self._results if r.passed)
        total = len(self._results)

        # Generar resumen
        critical = len([r for r in self._results if r.severity == ValidationSeverity.CRITICAL])
        errors = len([r for r in self._results if r.severity == ValidationSeverity.ERROR])
        warnings = len([r for r in self._results if r.severity == ValidationSeverity.WARNING])

        if critical > 0:
            summary = f"FALLO: {critical} valores criticos implausibles"
        elif errors > 0:
            summary = f"ATENCION: {errors} discrepancias significativas"
        elif warnings > 0:
            summary = f"OK con {warnings} advertencias menores"
        else:
            summary = "Todos los valores plausibles"

        return ValidationReport(
            validator_name=self.name,
            data_description=data_description,
            total_checks=total,
            passed_checks=passed,
            results=self._results.copy(),
            summary=summary,
        )

    def summary(self) -> str:
        """Retorna resumen de ultimos resultados"""
        if not self._results:
            return "No hay resultados de validacion"

        passed = sum(1 for r in self._results if r.passed)
        total = len(self._results)
        return f"{self.name}: {passed}/{total} checks passed ({passed/total*100:.1f}%)"
