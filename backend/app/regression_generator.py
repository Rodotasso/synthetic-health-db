from typing import List, Dict, Tuple
import numpy as np
import pandas as pd
from .base_generator import BaseGenerator


class RegressionGenerator(BaseGenerator):
    """Generador completo de regresiones estadisticas"""

    def __init__(self, seed: int = 42):
        super().__init__(seed)

    def generate(self, n: int, model: str = "logistic", **kwargs) -> pd.DataFrame:
        """
        Genera datos para modelo de regresion.

        Args:
            n: Numero de observaciones
            model: Tipo de modelo ('linear', 'logistic', 'poisson', 'cox', 'multiple')
            **kwargs: Parametros del modelo

        Returns:
            DataFrame con datos para regresion
        """
        self._validate_positive_int(n, "n")

        if model == "linear":
            return self._linear(
                n=n,
                coeffs=kwargs.get("coeffs", [1.5, -2.0]),
                intercept=kwargs.get("intercept", 0.0),
                noise=kwargs.get("noise", 0.5),
            )
        elif model == "logistic":
            return self._logistic(
                n=n,
                coeffs=kwargs.get("coeffs", {"age": 0.05, "sex_M": 0.3, "bp": 0.02, "chol": 0.01}),
                intercept=kwargs.get("intercept", -8.0),
            )
        elif model == "poisson":
            return self._poisson(
                n=n,
                rate_lambda=kwargs.get("rate_lambda", 5.0),
                overdispersion=kwargs.get("overdispersion", 1.0),
                offset=kwargs.get("offset", 0.0),
            )
        elif model == "cox":
            return self._cox_ph(
                n=n,
                hazard_ratios=kwargs.get("hazard_ratios", {}),
                baseline_hazard=kwargs.get("baseline_hazard", 0.01),
                durations=kwargs.get("durations", None),
                censoring_rate=kwargs.get("censoring_rate", 0.3),
            )
        elif model == "multiple":
            return self._multiple(
                n=n,
                coeffs=kwargs.get("coeffs", {}),
                include_interactions=kwargs.get("include_interactions", True),
                intercept=kwargs.get("intercept", 5.0),
            )
        else:
            raise ValueError(f"Modelo no soportado: {model}")

    def _linear(
        self, n: int, coeffs: List[float], intercept: float, noise: float
    ) -> pd.DataFrame:
        """Regresion lineal: Y = bX + e"""
        k = len(coeffs)
        X = self.rng.normal(0, 1, (n, k))
        beta = np.array(coeffs)
        y_true = X @ beta + intercept
        y = y_true + self.rng.normal(0, noise, n)
        df = pd.DataFrame(X, columns=[f"x{i+1}" for i in range(k)])
        df["y"] = y
        return df

    def _logistic(
        self, n: int, coeffs: Dict, intercept: float
    ) -> pd.DataFrame:
        """Regresion logistica: P(Y=1) = 1/(1+exp(-bX))"""
        ages = self.rng.poisson(45, n)
        ages = np.clip(ages, 18, 85).astype(int)

        sex = self.rng.choice(["M", "F"], n, p=[0.5, 0.5])
        sex_M = (sex == "M").astype(int)

        bp = self.rng.normal(130, 15, n)
        chol = self.rng.normal(220, 30, n)

        linear_pred = (
            intercept
            + coeffs.get("age", 0) * ages
            + coeffs.get("sex_M", 0) * sex_M
            + coeffs.get("bp", 0) * bp
            + coeffs.get("chol", 0) * chol
        )
        disease_prob = 1 / (1 + np.exp(-linear_pred))
        disease = self.rng.binomial(1, disease_prob, n)

        return pd.DataFrame(
            {
                "age": ages,
                "sex": sex,
                "blood_pressure": bp,
                "cholesterol": chol,
                "disease": disease,
            }
        )

    def _poisson(
        self, n: int, rate_lambda: float, overdispersion: float, offset: float = 0.0
    ) -> pd.DataFrame:
        """Regresion de Poisson (conteo de eventos)"""
        exposure = self.rng.poisson(rate_lambda, n)
        radiation = self.rng.exponential(1 / rate_lambda if rate_lambda > 0 else 1, n)

        smoking = self.rng.binomial(1, 0.35, n)
        cancer = (
            self.rng.negative_binomial(np.maximum(exposure, 1), 0.0008, n) + exposure
        )

        return pd.DataFrame(
            {
                "exposure_years": exposure,
                "radiation": radiation,
                "smoking_status": smoking,
                "cancer_incidence": cancer,
            }
        )

    def _cox_ph(
        self,
        n: int,
        hazard_ratios: Dict,
        baseline_hazard: float,
        durations: List[float] = None,
        censoring_rate: float = 0.3,
    ) -> pd.DataFrame:
        """Regresion de Cox: Hazard proporcional"""
        if durations is None:
            durations = [30, 90, 182.5, 365, 730, 1095, 1825]

        ages = self.rng.normal(60, 10, n).astype(int)
        ages = np.clip(ages, 35, 85)

        sex = self.rng.choice(["M", "F"], n, p=[0.5, 0.5])

        stages = self.rng.choice(
            ["I", "II", "III", "IV"], n, p=[0.3, 0.25, 0.2, 0.25]
        )
        stage_hr = np.array(
            [
                hazard_ratios.get(s, {"I": 1.0, "II": 1.8, "III": 2.5, "IV": 3.2}[s])
                for s in stages
            ]
        )

        treatment = self.rng.choice(["A", "B"], n, p=[0.5, 0.5])
        treatment_B = (treatment == "B").astype(int)
        tx_hazard = np.where(treatment_B, 1.0, 0.75)

        base_hazard = baseline_hazard * np.exp(np.log(2) / 10 * (ages - 60) / 10)
        cumulative_hazard = base_hazard * stage_hr + base_hazard * (1 + tx_hazard)

        event_prob = 1 - np.exp(-cumulative_hazard * 30 / 365)
        events = self.rng.binomial(1, event_prob, n)
        censored = self.rng.binomial(1, censoring_rate, n) - events

        # Assign followup from durations cyclically
        followup = np.array([durations[i % len(durations)] for i in range(n)])
        actual_followup = followup * self.rng.uniform(0.8, 1.2, n)
        actual_followup = np.minimum(actual_followup, followup)

        return pd.DataFrame(
            {
                "subject_id": range(1, n + 1),
                "age": ages,
                "sex": sex,
                "treatment": treatment,
                "stage": stages,
                "followup_days": actual_followup,
                "event": events,
                "censored": censored,
            }
        )

    def _multiple(
        self,
        n: int,
        coeffs: Dict,
        include_interactions: bool = True,
        intercept: float = 5.0,
    ) -> pd.DataFrame:
        """Regresion multiple con interacciones"""
        x1 = self.rng.normal(0, 1, n)
        x2 = self.rng.normal(5, 1, n)
        x3 = self.rng.binomial(1, 0.7, n).astype(float)

        y_true = (
            coeffs.get("x1", 3.2) * x1
            + coeffs.get("x2", 1.5) * x2
            + coeffs.get("x3", 0.8) * x3
            + intercept
        )
        y_true += coeffs.get("x1_x2", 0.9) * x1 * x2
        y_true += coeffs.get("x1_x3", -1.2) * x1 * x3

        y = y_true + self.rng.normal(0, 0.1, n)

        df = pd.DataFrame({"x1": x1, "x2": x2, "x3": x3, "y": y})

        if include_interactions:
            df["x1_x2"] = x1 * x2
            df["x1_x3"] = x1 * x3

        return df
