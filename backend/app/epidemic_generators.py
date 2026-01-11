from typing import List
import numpy as np
import pandas as pd


class EpidemicGenerator:
    """Generador de modelos epidémicos (SIR, SEIR)"""

    def __init__(self, seed: int = 42):
        np.random.seed(seed)

    def sir(
        self, n_days: int, population: int, R0: float, gamma: float
    ) -> pd.DataFrame:
        """Modelo SIR"""
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


class SurvivalGenerator:
    """Generador de datos de supervivencia"""

    def __init__(self, seed: int = 42):
        np.random.seed(seed)

    def kaplan_meier(
        self, n_subjects: int, followup_days: int, event_rate: float
    ) -> pd.DataFrame:
        """Genera datos para Kaplan-Meier"""
        times = np.random.exponential(scale=200, size=n_subjects)
        events = np.random.binomial(1, event_rate, n_subjects)
        censored = 1 - events

        ages = np.random.normal(50, 15, n_subjects).astype(int)
        ages = np.clip(ages, 18, 85)
        sex = np.random.choice(["M", "F"], n_subjects)

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
