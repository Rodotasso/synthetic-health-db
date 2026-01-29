"""
Validador de datos de supervivencia (Kaplan-Meier, Cox).

Valida:
- Tasas de eventos plausibles
- Hazard ratios vs literatura
- Distribucion de tiempos de seguimiento
- Censura adecuada
"""

from typing import Dict, List, Optional, Tuple
import numpy as np
import pandas as pd

from .base_validator import (
    BaseValidator,
    ValidationReport,
    ValidationResult,
    ValidationSeverity,
)
from ..reference_data.survival_benchmarks import (
    SURVIVAL_BENCHMARKS,
    HR_REFERENCE,
    get_survival_benchmark,
    validate_survival_rate,
    validate_hazard_ratio,
)


class SurvivalValidator(BaseValidator):
    """Validador de plausibilidad para datos de supervivencia"""

    @property
    def name(self) -> str:
        return "SurvivalValidator"

    def validate(
        self,
        data: pd.DataFrame,
        cancer_type: Optional[str] = None,
        expected_event_rate: Optional[float] = None,
        followup_days: Optional[int] = None,
        **kwargs,
    ) -> ValidationReport:
        """
        Valida datos de supervivencia.

        Args:
            data: DataFrame con columnas 'followup_days', 'event', 'censored'
                  (y opcionalmente 'age', 'sex', 'stage')
            cancer_type: Tipo de cancer para referencias
            expected_event_rate: Tasa de eventos esperada
            followup_days: Dias de seguimiento maximo

        Returns:
            ValidationReport
        """
        self._reset_results()
        description = "Datos de supervivencia"
        if cancer_type:
            description += f" ({cancer_type})"

        # Validar estructura
        self._validate_structure(data)

        # Validar tasa de eventos
        self._validate_event_rate(data, expected_event_rate, cancer_type)

        # Validar distribucion de tiempos
        self._validate_followup_distribution(data, followup_days)

        # Validar censura
        self._validate_censoring(data)

        # Validar supervivencia vs benchmarks (si aplica)
        if cancer_type and cancer_type in SURVIVAL_BENCHMARKS:
            self._validate_survival_vs_benchmark(data, cancer_type)

        # Validar covariables (si existen)
        if "age" in data.columns:
            self._validate_age_distribution(data)

        if "stage" in data.columns:
            self._validate_stage_distribution(data, cancer_type)

        return self._create_report(description)

    def _validate_structure(self, data: pd.DataFrame) -> None:
        """Valida estructura del DataFrame"""
        required_cols = ["followup_days", "event"]
        missing = [col for col in required_cols if col not in data.columns]

        if missing:
            self._add_result(ValidationResult(
                check_name="structure_check",
                passed=False,
                severity=ValidationSeverity.CRITICAL,
                message=f"Columnas faltantes: {missing}",
            ))
        else:
            self._add_result(ValidationResult(
                check_name="structure_check",
                passed=True,
                severity=ValidationSeverity.INFO,
                message="Estructura correcta para datos de supervivencia",
            ))

    def _validate_event_rate(
        self,
        data: pd.DataFrame,
        expected_rate: Optional[float],
        cancer_type: Optional[str],
    ) -> None:
        """Valida tasa de eventos observada"""
        if "event" not in data.columns:
            return

        n_events = data["event"].sum()
        n_total = len(data)
        observed_rate = n_events / n_total if n_total > 0 else 0

        # Si hay tasa esperada, comparar
        if expected_rate is not None:
            self._check_in_range(
                check_name="event_rate_vs_expected",
                observed=observed_rate,
                expected=expected_rate,
                tolerance=0.3,
            )
        else:
            # Validar rango general
            if observed_rate < 0.01:
                message = f"Tasa de eventos muy baja ({observed_rate*100:.2f}%)"
                severity = ValidationSeverity.WARNING
            elif observed_rate > 0.8:
                message = f"Tasa de eventos muy alta ({observed_rate*100:.2f}%)"
                severity = ValidationSeverity.WARNING
            else:
                message = f"Tasa de eventos: {observed_rate*100:.1f}% ({n_events}/{n_total})"
                severity = ValidationSeverity.INFO

            self._add_result(ValidationResult(
                check_name="event_rate",
                passed=True,
                severity=severity,
                message=message,
                observed_value=observed_rate,
                metadata={"n_events": int(n_events), "n_total": n_total},
            ))

    def _validate_followup_distribution(
        self, data: pd.DataFrame, max_followup: Optional[int]
    ) -> None:
        """Valida distribucion de tiempos de seguimiento"""
        if "followup_days" not in data.columns:
            return

        followup = data["followup_days"].values

        # Estadisticas basicas
        mean_fu = np.mean(followup)
        median_fu = np.median(followup)
        max_fu = np.max(followup)
        min_fu = np.min(followup)

        # Validar valores no negativos
        if np.any(followup < 0):
            self._add_result(ValidationResult(
                check_name="followup_non_negative",
                passed=False,
                severity=ValidationSeverity.CRITICAL,
                message="Tiempos de seguimiento negativos detectados",
            ))
            return

        # Validar rango
        if max_followup is not None:
            within_range = np.all(followup <= max_followup * 1.1)  # 10% tolerancia
            self._add_result(ValidationResult(
                check_name="followup_within_range",
                passed=within_range,
                severity=ValidationSeverity.INFO if within_range else ValidationSeverity.WARNING,
                message=(
                    f"Seguimiento dentro de rango ({max_fu:.0f} <= {max_followup} dias)"
                    if within_range
                    else f"Seguimiento excede maximo ({max_fu:.0f} > {max_followup} dias)"
                ),
            ))

        # Informar estadisticas
        self._add_result(ValidationResult(
            check_name="followup_statistics",
            passed=True,
            severity=ValidationSeverity.INFO,
            message=(
                f"Seguimiento: mediana={median_fu:.0f}, media={mean_fu:.0f}, "
                f"rango=[{min_fu:.0f}, {max_fu:.0f}] dias"
            ),
            metadata={
                "mean": float(mean_fu),
                "median": float(median_fu),
                "min": float(min_fu),
                "max": float(max_fu),
            },
        ))

    def _validate_censoring(self, data: pd.DataFrame) -> None:
        """Valida patron de censura"""
        if "event" not in data.columns:
            return

        n_total = len(data)
        n_events = data["event"].sum()
        n_censored = n_total - n_events
        censoring_rate = n_censored / n_total if n_total > 0 else 0

        # Tasa de censura debe ser razonable (tipicamente 20-70%)
        if censoring_rate < 0.05:
            message = f"Censura muy baja ({censoring_rate*100:.1f}%) - posible seguimiento excesivo"
            severity = ValidationSeverity.WARNING
            passed = True
        elif censoring_rate > 0.9:
            message = f"Censura muy alta ({censoring_rate*100:.1f}%) - pocos eventos para analisis"
            severity = ValidationSeverity.WARNING
            passed = True
        else:
            message = f"Tasa de censura: {censoring_rate*100:.1f}%"
            severity = ValidationSeverity.INFO
            passed = True

        self._add_result(ValidationResult(
            check_name="censoring_rate",
            passed=passed,
            severity=severity,
            message=message,
            observed_value=censoring_rate,
            metadata={"n_censored": int(n_censored), "n_events": int(n_events)},
        ))

        # Verificar que censura es informativa (no al final solamente)
        if "followup_days" in data.columns and n_censored > 0:
            censored_mask = data["event"] == 0
            event_mask = data["event"] == 1

            mean_censored_time = data.loc[censored_mask, "followup_days"].mean()
            mean_event_time = (
                data.loc[event_mask, "followup_days"].mean()
                if event_mask.sum() > 0
                else 0
            )

            # Censura no informativa: tiempos censura ~ tiempos evento
            # (censura informativa puede ser problema)
            if mean_event_time > 0:
                ratio = mean_censored_time / mean_event_time
                if ratio > 2.0:
                    message = "Censura concentrada en tiempos largos (posible censura tipo I)"
                    severity = ValidationSeverity.INFO
                elif ratio < 0.5:
                    message = "Censura concentrada en tiempos cortos (posible drop-out)"
                    severity = ValidationSeverity.WARNING
                else:
                    message = "Patron de censura no informativo (apropiado)"
                    severity = ValidationSeverity.INFO

                self._add_result(ValidationResult(
                    check_name="censoring_pattern",
                    passed=True,
                    severity=severity,
                    message=message,
                    metadata={
                        "mean_censored_time": float(mean_censored_time),
                        "mean_event_time": float(mean_event_time),
                    },
                ))

    def _validate_survival_vs_benchmark(
        self, data: pd.DataFrame, cancer_type: str
    ) -> None:
        """Valida supervivencia observada vs benchmarks SEER"""
        benchmark = SURVIVAL_BENCHMARKS.get(cancer_type)
        if not benchmark:
            return

        # Calcular supervivencia Kaplan-Meier simplificada
        n_total = len(data)
        if n_total == 0:
            return

        # Aproximacion: supervivencia = 1 - tasa_eventos (para comparacion rapida)
        event_rate = data["event"].sum() / n_total

        # Convertir a supervivencia 5 anos (aproximacion)
        max_followup = data["followup_days"].max()

        if max_followup >= 365 * 5:  # Al menos 5 anos de seguimiento
            # Supervivencia observada ~ 1 - event_rate
            observed_5y = (1 - event_rate) * 100

            is_valid, message = validate_survival_rate(
                cancer_type, observed_5y, tolerance=0.25
            )

            self._add_result(ValidationResult(
                check_name="survival_vs_seer",
                passed=is_valid,
                severity=ValidationSeverity.INFO if is_valid else ValidationSeverity.WARNING,
                message=message,
                observed_value=observed_5y,
                expected_value=benchmark.survival_5y,
                reference=benchmark.source,
            ))

    def _validate_age_distribution(self, data: pd.DataFrame) -> None:
        """Valida distribucion de edad"""
        ages = data["age"].values

        mean_age = np.mean(ages)
        std_age = np.std(ages)
        min_age = np.min(ages)
        max_age = np.max(ages)

        # Validar rango
        issues = []
        if min_age < 0:
            issues.append("edades negativas")
        if max_age > 120:
            issues.append("edades > 120")
        if std_age < 5:
            issues.append("poca variabilidad en edad")

        if issues:
            self._add_result(ValidationResult(
                check_name="age_distribution",
                passed=False,
                severity=ValidationSeverity.WARNING,
                message=f"Problemas en edad: {', '.join(issues)}",
            ))
        else:
            self._add_result(ValidationResult(
                check_name="age_distribution",
                passed=True,
                severity=ValidationSeverity.INFO,
                message=f"Edad: media={mean_age:.1f}, DE={std_age:.1f}, rango=[{min_age}, {max_age}]",
                metadata={"mean": float(mean_age), "std": float(std_age)},
            ))

    def _validate_stage_distribution(
        self, data: pd.DataFrame, cancer_type: Optional[str]
    ) -> None:
        """Valida distribucion de estadios"""
        stages = data["stage"].value_counts()
        n_total = len(data)

        # Proporciones observadas
        observed_props = {stage: count / n_total for stage, count in stages.items()}

        # Proporciones tipicas (aproximadas)
        expected_props = {"I": 0.30, "II": 0.25, "III": 0.20, "IV": 0.25}

        # Verificar que estadios estan presentes
        common_stages = ["I", "II", "III", "IV"]
        present_stages = [s for s in common_stages if s in stages.index]

        if len(present_stages) >= 3:
            # Suficientes estadios para evaluar
            self._check_distribution(
                check_name="stage_distribution",
                observed_counts=dict(stages),
                expected_proportions={
                    k: v for k, v in expected_props.items() if k in stages.index
                },
                reference="Distribucion tipica oncologica",
            )
        else:
            self._add_result(ValidationResult(
                check_name="stage_distribution",
                passed=True,
                severity=ValidationSeverity.INFO,
                message=f"Estadios presentes: {list(stages.index)}",
                observed_value=observed_props,
            ))

    def validate_cox_hazard_ratios(
        self,
        hazard_ratios: Dict[str, float],
        context: str = "cancer_general",
    ) -> ValidationReport:
        """
        Valida hazard ratios de modelo Cox vs literatura.

        Args:
            hazard_ratios: Dict de {variable: HR}
            context: Contexto de validacion ('cancer_general', 'cardiovascular')

        Returns:
            ValidationReport
        """
        self._reset_results()

        refs = HR_REFERENCE.get(context, [])
        ref_dict = {r.exposure: r for r in refs}

        for variable, observed_hr in hazard_ratios.items():
            if variable in ref_dict:
                ref = ref_dict[variable]
                is_valid, message = validate_hazard_ratio(
                    context, variable, observed_hr, tolerance=0.5
                )

                self._add_result(ValidationResult(
                    check_name=f"hr_{variable}",
                    passed=is_valid,
                    severity=ValidationSeverity.INFO if is_valid else ValidationSeverity.WARNING,
                    message=message,
                    observed_value=observed_hr,
                    expected_value=ref.hr,
                    reference=ref.source,
                ))
            else:
                # Sin referencia, solo informar
                if observed_hr < 0.1 or observed_hr > 10:
                    severity = ValidationSeverity.WARNING
                    message = f"HR={observed_hr:.2f} para {variable} es extremo"
                else:
                    severity = ValidationSeverity.INFO
                    message = f"HR={observed_hr:.2f} para {variable} (sin referencia)"

                self._add_result(ValidationResult(
                    check_name=f"hr_{variable}",
                    passed=True,
                    severity=severity,
                    message=message,
                    observed_value=observed_hr,
                ))

        return self._create_report(f"Hazard Ratios ({context})")

    @staticmethod
    def list_cancer_types() -> list:
        """Lista tipos de cancer con benchmarks"""
        return list(SURVIVAL_BENCHMARKS.keys())

    @staticmethod
    def get_cancer_info(cancer_type: str) -> Optional[dict]:
        """Obtiene info de tipo de cancer"""
        if cancer_type in SURVIVAL_BENCHMARKS:
            ref = SURVIVAL_BENCHMARKS[cancer_type]
            return {
                "name": ref.name,
                "survival_1y": ref.survival_1y,
                "survival_3y": ref.survival_3y,
                "survival_5y": ref.survival_5y,
                "survival_10y": ref.survival_10y,
                "median_survival_months": ref.median_survival_months,
                "stage_specific": ref.stage_specific,
                "source": ref.source,
            }
        return None
