from typing import List
import numpy as np
import pandas as pd
from .base_generator import BaseGenerator


class EpidemicGenerator(BaseGenerator):
    """Generador de modelos epidemicos (SIR, SEIR)"""

    def __init__(self, seed: int = 42):
        super().__init__(seed)

    def generate(self, n: int, model: str = "sir", **kwargs) -> pd.DataFrame:
        """
        Genera modelo epidemico.

        Args:
            n: Numero de dias
            model: Tipo de modelo ('sir' o 'seir')
            **kwargs: Parametros del modelo

        Returns:
            DataFrame con curva epidemica
        """
        self._validate_positive_int(n, "n")

        if model == "sir":
            return self.sir(
                n_days=n,
                population=kwargs.get("population", 100000),
                R0=kwargs.get("R0", 2.5),
                gamma=kwargs.get("gamma", 0.1),
            )
        elif model == "seir":
            return self.seir(
                n_days=n,
                population=kwargs.get("population", 100000),
                R0=kwargs.get("R0", 3.0),
                sigma=kwargs.get("sigma", 0.2),
                gamma=kwargs.get("gamma", 0.1),
                latent_period=kwargs.get("latent_period", 5),
            )
        else:
            raise ValueError(f"Modelo no soportado: {model}")

    def sir(
        self, n_days: int, population: int, R0: float, gamma: float
    ) -> pd.DataFrame:
        """Modelo SIR"""
        self._validate_positive_int(n_days, "n_days")
        self._validate_positive_int(population, "population")
        self._validate_positive_float(R0, "R0")
        self._validate_positive_float(gamma, "gamma")

        beta = R0 * gamma
        S = np.ones(n_days) * population
        I = np.ones(n_days) * 10
        R = np.zeros(n_days)

        for i in range(1, n_days):
            new_infected = beta * S[i - 1] * I[i - 1] / population
            new_recovered = gamma * I[i - 1]

            S[i] = S[i - 1] - new_infected
            I[i] = I[i - 1] + new_infected - new_recovered
            R[i] = R[i - 1] + new_recovered

        return pd.DataFrame(
            {"day": range(n_days), "susceptible": S, "infected": I, "recovered": R}
        )

    def seir(
        self,
        n_days: int,
        population: int,
        R0: float,
        sigma: float,
        gamma: float,
        latent_period: int,
    ) -> pd.DataFrame:
        """Modelo SEIR"""
        self._validate_positive_int(n_days, "n_days")
        self._validate_positive_int(population, "population")
        self._validate_positive_float(R0, "R0")
        self._validate_positive_float(sigma, "sigma")
        self._validate_positive_float(gamma, "gamma")

        beta = R0 * gamma
        S = np.ones(n_days) * population
        E = np.zeros(n_days)
        I = np.ones(n_days) * 10
        R = np.zeros(n_days)

        for i in range(1, n_days):
            new_exposed = beta * S[i - 1] * I[i - 1] / population
            new_infected = sigma * E[i - 1]
            new_recovered = gamma * I[i - 1]

            S[i] = S[i - 1] - new_exposed
            E[i] = E[i - 1] + new_exposed - new_infected
            I[i] = I[i - 1] + new_infected - new_recovered
            R[i] = R[i - 1] + new_recovered

        return pd.DataFrame(
            {
                "day": range(n_days),
                "susceptible": S,
                "exposed": E,
                "infected": I,
                "recovered": R,
            }
        )


class SurvivalGenerator(BaseGenerator):
    """Generador de datos de supervivencia"""

    def __init__(self, seed: int = 42):
        super().__init__(seed)

    def generate(self, n: int, **kwargs) -> pd.DataFrame:
        """
        Genera datos de supervivencia.

        Args:
            n: Numero de sujetos
            **kwargs: Parametros adicionales

        Returns:
            DataFrame con datos Kaplan-Meier
        """
        return self.kaplan_meier(
            n_subjects=n,
            followup_days=kwargs.get("followup_days", 1095),
            event_rate=kwargs.get("event_rate", 0.15),
        )

    def kaplan_meier(
        self, n_subjects: int, followup_days: int, event_rate: float
    ) -> pd.DataFrame:
        """Genera datos para Kaplan-Meier"""
        self._validate_positive_int(n_subjects, "n_subjects")
        self._validate_positive_int(followup_days, "followup_days")
        self._validate_probability(event_rate, "event_rate")

        times = self.rng.exponential(scale=200, size=n_subjects)
        events = self.rng.binomial(1, event_rate, n_subjects)
        censored = 1 - events

        ages = self.rng.normal(50, 15, n_subjects).astype(int)
        ages = np.clip(ages, 18, 85)
        sex = self.rng.choice(["M", "F"], n_subjects)

        return pd.DataFrame(
            {
                "subject_id": range(1, n_subjects + 1),
                "age": ages,
                "sex": sex,
                "followup_days": np.minimum(times, followup_days),
                "event": events,
                "censored": censored,
            }
        )
