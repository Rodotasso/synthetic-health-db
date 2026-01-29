"""
Validador de modelos epidemicos (SIR, SEIR).

Valida:
- R0 dentro de rangos de literatura
- Gamma (tasa recuperacion) plausible
- Dinamica de curva SIR/SEIR
- Conservacion de poblacion
"""

from typing import Dict, Optional
import numpy as np
import pandas as pd

from .base_validator import (
    BaseValidator,
    ValidationReport,
    ValidationResult,
    ValidationSeverity,
)
from ..reference_data.r0_by_disease import (
    R0_REFERENCE,
    get_r0_range,
    validate_r0,
    validate_gamma,
)


class EpidemicValidator(BaseValidator):
    """Validador de plausibilidad para modelos epidemicos"""

    @property
    def name(self) -> str:
        return "EpidemicValidator"

    def validate(
        self,
        data: pd.DataFrame,
        disease: Optional[str] = None,
        R0: Optional[float] = None,
        gamma: Optional[float] = None,
        model: str = "sir",
        **kwargs,
    ) -> ValidationReport:
        """
        Valida datos de modelo epidemico.

        Args:
            data: DataFrame con columnas 'day', 'susceptible', 'infected', 'recovered'
                  (y 'exposed' para SEIR)
            disease: Clave de enfermedad para referencias (ej: 'influenza_seasonal')
            R0: R0 usado en generacion
            gamma: Gamma usado en generacion
            model: Tipo de modelo ('sir' o 'seir')

        Returns:
            ValidationReport
        """
        self._reset_results()
        description = f"Modelo {model.upper()}"
        if disease:
            description += f" ({disease})"

        # Validar estructura de datos
        self._validate_structure(data, model)

        # Validar R0 si se proporciono
        if R0 is not None:
            self._validate_r0(R0, disease)

        # Validar gamma si se proporciono
        if gamma is not None:
            self._validate_gamma(gamma, disease)

        # Validar dinamica de curva
        self._validate_dynamics(data, model)

        # Validar conservacion de poblacion
        self._validate_population_conservation(data, model)

        # Validar comportamiento biologico
        self._validate_biological_behavior(data, model)

        # Validar R0 empirico de los datos
        if R0 is not None and gamma is not None:
            self._validate_empirical_r0(data, R0, gamma)

        return self._create_report(description)

    def _validate_structure(self, data: pd.DataFrame, model: str) -> None:
        """Valida estructura del DataFrame"""
        required_cols = ["day", "susceptible", "infected", "recovered"]
        if model == "seir":
            required_cols.append("exposed")

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
                message=f"Estructura correcta para modelo {model.upper()}",
            ))

    def _validate_r0(self, R0: float, disease: Optional[str]) -> None:
        """Valida R0 contra referencias"""
        if disease and disease in R0_REFERENCE:
            is_valid, message = validate_r0(disease, R0)
            ref = R0_REFERENCE[disease]

            self._add_result(ValidationResult(
                check_name="r0_range",
                passed=is_valid,
                severity=ValidationSeverity.INFO if is_valid else ValidationSeverity.ERROR,
                message=message,
                observed_value=R0,
                expected_value=(ref.r0_min, ref.r0_max),
                reference=ref.source,
            ))
        else:
            # Validar rango general
            if R0 < 0.5:
                self._add_result(ValidationResult(
                    check_name="r0_range",
                    passed=False,
                    severity=ValidationSeverity.ERROR,
                    message=f"R0={R0} muy bajo para enfermedad transmisible",
                    observed_value=R0,
                ))
            elif R0 > 20:
                self._add_result(ValidationResult(
                    check_name="r0_range",
                    passed=False,
                    severity=ValidationSeverity.WARNING,
                    message=f"R0={R0} muy alto, solo sarampion (~15) alcanza valores similares",
                    observed_value=R0,
                ))
            else:
                self._add_result(ValidationResult(
                    check_name="r0_range",
                    passed=True,
                    severity=ValidationSeverity.INFO,
                    message=f"R0={R0} en rango razonable (sin referencia especifica)",
                    observed_value=R0,
                ))

    def _validate_gamma(self, gamma: float, disease: Optional[str]) -> None:
        """Valida gamma contra referencias"""
        if disease and disease in R0_REFERENCE:
            is_valid, message = validate_gamma(disease, gamma)
            ref = R0_REFERENCE[disease]

            self._add_result(ValidationResult(
                check_name="gamma_range",
                passed=is_valid,
                severity=ValidationSeverity.INFO if is_valid else ValidationSeverity.WARNING,
                message=message,
                observed_value=gamma,
                expected_value=ref.gamma,
                reference=ref.source,
            ))
        else:
            # Validar rango general (periodo infeccioso 1-30 dias)
            infectious_days = 1 / gamma if gamma > 0 else float("inf")

            if infectious_days < 1:
                severity = ValidationSeverity.ERROR
                passed = False
                message = f"gamma={gamma} implausible (periodo infeccioso < 1 dia)"
            elif infectious_days > 60:
                severity = ValidationSeverity.WARNING
                passed = False
                message = f"gamma={gamma} implica periodo infeccioso de {infectious_days:.0f} dias"
            else:
                severity = ValidationSeverity.INFO
                passed = True
                message = f"gamma={gamma} plausible (periodo infeccioso ~{infectious_days:.1f} dias)"

            self._add_result(ValidationResult(
                check_name="gamma_range",
                passed=passed,
                severity=severity,
                message=message,
                observed_value=gamma,
            ))

    def _validate_dynamics(self, data: pd.DataFrame, model: str) -> None:
        """Valida dinamica de la curva epidemica"""
        S = data["susceptible"].values
        I = data["infected"].values
        R = data["recovered"].values

        # 1. S debe ser monotona decreciente (o constante)
        s_decreasing = np.all(np.diff(S) <= 1e-6)  # Tolerancia numerica
        self._add_result(ValidationResult(
            check_name="susceptible_decreasing",
            passed=s_decreasing,
            severity=ValidationSeverity.INFO if s_decreasing else ValidationSeverity.ERROR,
            message="S decrece monotonamente" if s_decreasing else "S aumenta en algun punto (error)",
        ))

        # 2. R debe ser monotona creciente
        r_increasing = np.all(np.diff(R) >= -1e-6)
        self._add_result(ValidationResult(
            check_name="recovered_increasing",
            passed=r_increasing,
            severity=ValidationSeverity.INFO if r_increasing else ValidationSeverity.ERROR,
            message="R crece monotonamente" if r_increasing else "R decrece en algun punto (error)",
        ))

        # 3. Curva I debe tener forma de campana (un maximo)
        i_peak_idx = np.argmax(I)
        i_has_peak = 0 < i_peak_idx < len(I) - 1

        # Verificar que hay un pico claro
        if i_has_peak:
            before_peak = np.all(np.diff(I[:i_peak_idx]) >= -1)
            after_peak = np.all(np.diff(I[i_peak_idx:]) <= 1)
            proper_shape = before_peak and after_peak

            if proper_shape:
                message = f"Curva I tiene pico en dia {i_peak_idx} (I_max={I[i_peak_idx]:.0f})"
                severity = ValidationSeverity.INFO
            else:
                message = f"Curva I no tiene forma de campana clara"
                severity = ValidationSeverity.WARNING
        else:
            # Pico al inicio o final
            if i_peak_idx == 0:
                message = "I maxima al inicio (posible R0 < 1 o poblacion saturada)"
            else:
                message = "I maxima al final (epidemia no terminada)"
            severity = ValidationSeverity.INFO
            proper_shape = True  # No es error per se

        self._add_result(ValidationResult(
            check_name="infection_curve_shape",
            passed=proper_shape if i_has_peak else True,
            severity=severity,
            message=message,
            metadata={"peak_day": int(i_peak_idx), "peak_infected": float(I[i_peak_idx])},
        ))

    def _validate_population_conservation(
        self, data: pd.DataFrame, model: str
    ) -> None:
        """Valida conservacion de poblacion (S + I + R = N constante)"""
        S = data["susceptible"].values
        I = data["infected"].values
        R = data["recovered"].values

        if model == "seir" and "exposed" in data.columns:
            E = data["exposed"].values
            total = S + E + I + R
        else:
            total = S + I + R

        initial_pop = total[0]
        max_deviation = np.max(np.abs(total - initial_pop))
        relative_deviation = max_deviation / initial_pop if initial_pop > 0 else 0

        passed = relative_deviation < 0.001  # < 0.1% desviacion

        if passed:
            message = f"Poblacion conservada (desviacion max: {max_deviation:.2f})"
            severity = ValidationSeverity.INFO
        else:
            message = (
                f"Poblacion no conservada (desviacion: {max_deviation:.0f}, "
                f"{relative_deviation*100:.2f}%)"
            )
            severity = ValidationSeverity.ERROR

        self._add_result(ValidationResult(
            check_name="population_conservation",
            passed=passed,
            severity=severity,
            message=message,
            observed_value=max_deviation,
            expected_value=0,
        ))

    def _validate_biological_behavior(self, data: pd.DataFrame, model: str) -> None:
        """Valida comportamiento biologico esperado"""
        S = data["susceptible"].values
        I = data["infected"].values
        R = data["recovered"].values

        # 1. Valores no negativos
        all_positive = np.all(S >= 0) and np.all(I >= 0) and np.all(R >= 0)
        self._add_result(ValidationResult(
            check_name="non_negative_values",
            passed=all_positive,
            severity=ValidationSeverity.INFO if all_positive else ValidationSeverity.CRITICAL,
            message="Todos los valores >= 0" if all_positive else "Valores negativos detectados",
        ))

        # 2. Tasa de ataque final razonable
        initial_s = S[0]
        final_s = S[-1]
        attack_rate = (initial_s - final_s) / initial_s if initial_s > 0 else 0

        # La tasa de ataque depende de R0
        # R0=1.5 -> ~40%, R0=2 -> ~60%, R0=3 -> ~70%, R0=5 -> ~80%
        if attack_rate < 0.01:
            message = f"Tasa de ataque muy baja ({attack_rate*100:.1f}%) - posible R0 cercano a 1"
            severity = ValidationSeverity.WARNING
            passed = True  # No es error, solo advertencia
        elif attack_rate > 0.95:
            message = f"Tasa de ataque muy alta ({attack_rate*100:.1f}%) - posible R0 > 10"
            severity = ValidationSeverity.INFO
            passed = True
        else:
            message = f"Tasa de ataque final: {attack_rate*100:.1f}%"
            severity = ValidationSeverity.INFO
            passed = True

        self._add_result(ValidationResult(
            check_name="attack_rate",
            passed=passed,
            severity=severity,
            message=message,
            observed_value=attack_rate,
            metadata={"attack_rate_percent": attack_rate * 100},
        ))

    def _validate_empirical_r0(
        self, data: pd.DataFrame, expected_r0: float, gamma: float
    ) -> None:
        """Valida R0 empirico calculado de los datos"""
        S = data["susceptible"].values
        I = data["infected"].values

        initial_pop = S[0] + I[0] + data["recovered"].values[0]

        # Calcular R efectivo en fase temprana (primeros 10% de dias o mientras I crece)
        early_days = max(10, len(data) // 10)

        # R efectivo = (dI/dt + gamma*I) * N / (beta * S * I)
        # En fase temprana, R_eff ≈ R0 * (S/N)

        # Usar crecimiento exponencial temprano para estimar R0
        # En fase temprana: dI/dt ≈ (beta*S/N - gamma) * I = (R0 - 1) * gamma * I
        # log(I(t)/I(0)) ≈ (R0-1) * gamma * t

        I_early = I[:early_days]
        if len(I_early) > 5 and I_early[0] > 0 and np.all(I_early > 0):
            log_I = np.log(I_early)
            t = np.arange(len(I_early))

            # Regresion lineal
            slope = np.polyfit(t, log_I, 1)[0]

            # R0_empirico = slope/gamma + 1
            empirical_r0 = slope / gamma + 1 if gamma > 0 else expected_r0

            # Comparar con esperado
            deviation = abs(empirical_r0 - expected_r0) / expected_r0 if expected_r0 > 0 else 0

            if deviation < 0.2:
                passed = True
                severity = ValidationSeverity.INFO
                message = f"R0 empirico ({empirical_r0:.2f}) consistente con parametro ({expected_r0:.2f})"
            elif deviation < 0.5:
                passed = True
                severity = ValidationSeverity.WARNING
                message = (
                    f"R0 empirico ({empirical_r0:.2f}) difiere del parametro ({expected_r0:.2f}) "
                    f"en {deviation*100:.0f}%"
                )
            else:
                passed = False
                severity = ValidationSeverity.ERROR
                message = (
                    f"R0 empirico ({empirical_r0:.2f}) muy diferente del parametro ({expected_r0:.2f})"
                )

            self._add_result(ValidationResult(
                check_name="empirical_r0",
                passed=passed,
                severity=severity,
                message=message,
                observed_value=empirical_r0,
                expected_value=expected_r0,
            ))

    def validate_sir(
        self,
        data: pd.DataFrame,
        disease: Optional[str] = None,
        R0: Optional[float] = None,
        gamma: Optional[float] = None,
    ) -> ValidationReport:
        """Atajo para validar modelo SIR"""
        return self.validate(data, disease=disease, R0=R0, gamma=gamma, model="sir")

    def validate_seir(
        self,
        data: pd.DataFrame,
        disease: Optional[str] = None,
        R0: Optional[float] = None,
        sigma: Optional[float] = None,
        gamma: Optional[float] = None,
    ) -> ValidationReport:
        """Atajo para validar modelo SEIR"""
        return self.validate(
            data, disease=disease, R0=R0, gamma=gamma, model="seir", sigma=sigma
        )

    @staticmethod
    def list_diseases() -> list:
        """Lista enfermedades con datos de referencia"""
        return list(R0_REFERENCE.keys())

    @staticmethod
    def get_disease_info(disease: str) -> Optional[dict]:
        """Obtiene info de enfermedad"""
        if disease in R0_REFERENCE:
            ref = R0_REFERENCE[disease]
            return {
                "name": ref.name,
                "r0_range": (ref.r0_min, ref.r0_max),
                "r0_typical": ref.r0_typical,
                "gamma": ref.gamma,
                "serial_interval_days": ref.serial_interval_days,
                "incubation_days": ref.incubation_days,
                "infectious_days": ref.infectious_days,
                "source": ref.source,
            }
        return None
