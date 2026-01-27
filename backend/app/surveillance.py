"""
Generadores de Vigilancia Epidemiologica

Modelos para sistemas de vigilancia en salud publica:
- Deteccion de brotes
- Alertas epidemiologicas
- Series temporales con tendencias
- Clustering geografico
"""

from typing import Dict, List, Optional, Tuple
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from scipy import stats
from dataclasses import dataclass
from .base_generator import BaseGenerator


@dataclass
class AlertThreshold:
    """Umbral de alerta epidemiologica"""

    disease_code: str
    warning_level: float  # Desviaciones std para warning
    alert_level: float  # Desviaciones std para alerta
    baseline: float  # Incidencia basal por 100k
    seasonal: bool  # Tiene patron estacional


class SurveillanceGenerator(BaseGenerator):
    """Generador de datos de vigilancia epidemiologica"""

    def __init__(self, seed: int = 42):
        super().__init__(seed)
        self._alert_counter = 0

    def generate(self, n: int, **kwargs) -> pd.DataFrame:
        """
        Genera sistema de alertas epidemiologicas.

        Args:
            n: Numero de dias de simulacion
            **kwargs: Parametros adicionales

        Returns:
            DataFrame con alertas y casos
        """
        return self.generate_alert_system(
            diseases=kwargs.get("diseases", ["J09", "A00", "B05"]),
            regions=kwargs.get("regions", 15),
            days=n,
            baseline_incidence=kwargs.get("baseline_incidence", None),
            outbreak_probability=kwargs.get("outbreak_probability", 0.02),
        )

    def generate_alert_system(
        self,
        diseases: List[str],
        regions: int = 15,
        days: int = 365,
        baseline_incidence: Dict[str, float] = None,
        outbreak_probability: float = 0.02,
    ) -> pd.DataFrame:
        """
        Genera sistema de alertas epidemiologicas (vectorizado)

        Args:
            diseases: Lista de codigos CIE-10 a vigilar
            regions: Numero de regiones
            days: Dias de simulacion
            baseline_incidence: Incidencia basal por enfermedad (por 100k)
            outbreak_probability: Probabilidad diaria de brote

        Returns:
            DataFrame con alertas y casos
        """
        self._validate_positive_int(days, "days")
        self._validate_positive_int(regions, "regions")
        self._validate_probability(outbreak_probability, "outbreak_probability")

        if baseline_incidence is None:
            baseline_incidence = {d: self.rng.uniform(0.5, 10.0) for d in diseases}

        n_diseases = len(diseases)
        total_records = days * regions * n_diseases

        # Create meshgrid indices
        day_idx = np.arange(days)
        region_idx = np.arange(1, regions + 1)
        disease_idx = np.arange(n_diseases)

        # Generate all combinations
        day_mesh, region_mesh, disease_mesh = np.meshgrid(
            day_idx, region_idx, disease_idx, indexing="ij"
        )
        day_flat = day_mesh.ravel()
        region_flat = region_mesh.ravel()
        disease_flat = disease_mesh.ravel()

        # Get disease codes and baselines
        disease_codes = np.array(diseases)[disease_flat]
        baselines = np.array([baseline_incidence.get(d, 1.0) for d in disease_codes])

        # Seasonal factor (respiratory diseases peak in winter)
        is_respiratory = np.char.startswith(disease_codes.astype(str), "J")
        seasonal_factor = np.where(
            is_respiratory,
            1 + 0.5 * np.sin(2 * np.pi * (day_flat - 180) / 365),
            1.0,
        )

        # Outbreak factor
        outbreak_mask = self.rng.random(total_records) < outbreak_probability
        outbreak_factor = np.where(
            outbreak_mask, self.rng.uniform(2.0, 5.0, total_records), 1.0
        )

        # Generate cases
        expected = baselines * seasonal_factor * outbreak_factor
        cases = self.rng.poisson(expected)

        # Calculate z-scores and alert levels
        zscore = np.where(baselines > 0, (cases - baselines) / np.sqrt(baselines), 0)
        alert_level = np.select(
            [zscore >= 3.0, zscore >= 2.0, zscore >= 1.5],
            ["RED", "ORANGE", "YELLOW"],
            default="GREEN",
        )

        # Generate dates
        start_date = datetime.now() - timedelta(days=days)
        dates = [
            (start_date + timedelta(days=int(d))).strftime("%Y-%m-%d")
            for d in day_flat
        ]
        epi_weeks = [
            (start_date + timedelta(days=int(d))).isocalendar()[1] for d in day_flat
        ]

        return pd.DataFrame(
            {
                "date": dates,
                "epi_week": epi_weeks,
                "region": [f"R{r:02d}" for r in region_flat],
                "disease_code": disease_codes,
                "cases": cases,
                "expected_cases": np.round(expected, 2),
                "zscore": np.round(zscore, 2),
                "alert_level": alert_level,
                "outbreak_flag": outbreak_mask,
            }
        )

    def _determine_alert(self, zscore: float) -> str:
        """Determina nivel de alerta basado en z-score"""
        if zscore >= 3.0:
            return "RED"
        elif zscore >= 2.0:
            return "ORANGE"
        elif zscore >= 1.5:
            return "YELLOW"
        return "GREEN"

    def generate_notifiable_diseases(
        self,
        n_notifications: int,
        date_range: Tuple[str, str] = ("2020-01-01", "2024-12-31"),
        diseases: List[tuple] = None,
    ) -> pd.DataFrame:
        """
        Genera notificaciones de enfermedades de declaracion obligatoria

        Args:
            n_notifications: Numero de notificaciones
            date_range: Rango de fechas
            diseases: Lista de enfermedades (default: ENO Chile)

        Returns:
            DataFrame con notificaciones
        """
        self._validate_positive_int(n_notifications, "n_notifications")

        if diseases is None:
            # Enfermedades de Notificacion Obligatoria (ENO) Chile
            diseases = [
                ("A00", "Colera", "inmediata"),
                ("A01", "Fiebre tifoidea", "diaria"),
                ("A90", "Dengue", "inmediata"),
                ("A91", "Dengue hemorragico", "inmediata"),
                ("B05", "Sarampion", "inmediata"),
                ("B06", "Rubeola", "inmediata"),
                ("B15", "Hepatitis A", "diaria"),
                ("B16", "Hepatitis B", "diaria"),
                ("B17", "Hepatitis C", "diaria"),
                ("A37", "Tos ferina", "diaria"),
                ("A39", "Meningococo", "inmediata"),
                ("J09", "Influenza", "semanal"),
                ("U07.1", "COVID-19", "diaria"),
            ]

        start = pd.Timestamp(date_range[0])
        end = pd.Timestamp(date_range[1])
        days_range = (end - start).days

        # Vectorized generation
        disease_indices = self.rng.integers(0, len(diseases), n_notifications)
        days_offset = self.rng.integers(0, days_range, n_notifications)
        onset_offset = self.rng.integers(1, 14, n_notifications)

        notif_dates = start + pd.to_timedelta(days_offset, unit="D")
        onset_dates = notif_dates - pd.to_timedelta(onset_offset, unit="D")

        notifications = []
        for i in range(n_notifications):
            disease = diseases[disease_indices[i]]
            code, name, urgency = disease

            notifications.append(
                {
                    "notification_id": f"NOT-{self.rng.integers(100000, 999999)}",
                    "notification_date": notif_dates[i].strftime("%Y-%m-%d"),
                    "onset_date": onset_dates[i].strftime("%Y-%m-%d"),
                    "disease_code": code,
                    "disease_name": name,
                    "urgency": urgency,
                    "patient_age": int(self.rng.integers(0, 95)),
                    "patient_sex": self.rng.choice(["M", "F"]),
                    "region": f"R{self.rng.integers(1, 17):02d}",
                    "comuna": f"C{self.rng.integers(1, 350):03d}",
                    "hospitalized": bool(self.rng.choice([True, False], p=[0.15, 0.85])),
                    "icu": bool(self.rng.choice([True, False], p=[0.03, 0.97])),
                    "deceased": bool(self.rng.choice([True, False], p=[0.02, 0.98])),
                    "lab_confirmed": bool(self.rng.choice([True, False], p=[0.7, 0.3])),
                    "travel_history": bool(self.rng.choice([True, False], p=[0.1, 0.9])),
                    "contact_traced": bool(self.rng.choice([True, False], p=[0.6, 0.4])),
                }
            )

        return pd.DataFrame(notifications)


class OutbreakGenerator(BaseGenerator):
    """Generador de datos de brotes epidemicos"""

    def __init__(self, seed: int = 42):
        super().__init__(seed)

    def generate(self, n: int, **kwargs) -> pd.DataFrame:
        """
        Genera brote epidemico.

        Args:
            n: Numero de casos
            **kwargs: Parametros adicionales

        Returns:
            DataFrame con casos del brote
        """
        return self.generate_outbreak(
            outbreak_type=kwargs.get("outbreak_type", "point_source"),
            n_cases=n,
            start_date=kwargs.get("start_date", "2024-01-15"),
            disease=kwargs.get("disease", "A02.0"),
        )

    def generate_outbreak(
        self,
        outbreak_type: str = "point_source",
        n_cases: int = 100,
        start_date: str = "2024-01-15",
        disease: str = "A02.0",
    ) -> pd.DataFrame:
        """
        Genera brote epidemico

        Args:
            outbreak_type: Tipo de brote (point_source, continuous, propagated)
            n_cases: Numero de casos
            start_date: Fecha inicio del brote
            disease: Codigo CIE-10

        Returns:
            DataFrame con casos del brote
        """
        self._validate_positive_int(n_cases, "n_cases")

        start = pd.Timestamp(start_date)

        if outbreak_type == "point_source":
            # Exposicion unica - curva log-normal
            delays = self.rng.lognormal(mean=1.5, sigma=0.5, size=n_cases)
        elif outbreak_type == "continuous":
            # Exposicion continua - distribucion uniforme extendida
            delays = self.rng.uniform(0, 30, size=n_cases)
        else:  # propagated
            # Transmision persona a persona - generaciones
            delays = self._generate_propagated_delays(n_cases)

        # Vectorized case generation
        onset_dates = start + pd.to_timedelta(delays, unit="D")
        notif_delays = self.rng.integers(1, 5, n_cases)
        notif_dates = onset_dates + pd.to_timedelta(notif_delays, unit="D")

        ages = self.rng.integers(1, 90, n_cases)
        sexes = self.rng.choice(["M", "F"], n_cases)
        hospitalized = self.rng.choice([True, False], n_cases, p=[0.2, 0.8])
        severities = self.rng.choice(
            ["mild", "moderate", "severe"], n_cases, p=[0.7, 0.2, 0.1]
        )

        generations = np.array(
            [self._assign_generation(d, outbreak_type) for d in delays]
        )
        secondary_cases = delays > 7 if outbreak_type == "propagated" else np.zeros(n_cases, dtype=bool)

        exposure_locations = np.where(
            outbreak_type == "point_source",
            [f"LOC-{self.rng.integers(1, 5):02d}" for _ in range(n_cases)],
            None,
        )

        return pd.DataFrame(
            {
                "case_id": [f"CASE-{i+1:05d}" for i in range(n_cases)],
                "onset_date": onset_dates.strftime("%Y-%m-%d"),
                "notification_date": notif_dates.strftime("%Y-%m-%d"),
                "disease_code": disease,
                "outbreak_type": outbreak_type,
                "generation": generations,
                "age": ages,
                "sex": sexes,
                "exposure_location": exposure_locations,
                "secondary_case": secondary_cases,
                "hospitalized": hospitalized,
                "severity": severities,
            }
        )

    def _generate_propagated_delays(self, n_cases: int) -> np.ndarray:
        """Genera delays para brote propagado (generaciones)"""
        serial_interval = 5  # dias promedio entre generaciones
        delays = []
        current_cases = [0]  # indice caso inicial

        generation = 0
        while len(delays) < n_cases:
            generation += 1
            new_cases = []

            for case in current_cases:
                # Cada caso genera 0-4 secundarios
                n_secondary = self.rng.poisson(2.5)
                for _ in range(n_secondary):
                    if len(delays) >= n_cases:
                        break
                    delay = case + self.rng.gamma(serial_interval, 1)
                    delays.append(delay)
                    new_cases.append(delay)

            current_cases = new_cases
            if not current_cases:
                break

        return np.array(delays[:n_cases])

    def _assign_generation(self, delay: float, outbreak_type: str) -> int:
        """Asigna generacion epidemiologica"""
        if outbreak_type != "propagated":
            return 0
        return int(delay // 5)  # Generacion cada 5 dias aprox


class TimeSeriesGenerator(BaseGenerator):
    """Generador de series temporales epidemiologicas"""

    def __init__(self, seed: int = 42):
        super().__init__(seed)

    def generate(self, n: int, **kwargs) -> pd.DataFrame:
        """
        Genera serie temporal de incidencia.

        Args:
            n: Numero de dias
            **kwargs: Parametros adicionales

        Returns:
            DataFrame con serie temporal
        """
        return self.generate_incidence_series(
            days=n,
            baseline=kwargs.get("baseline", 10.0),
            trend=kwargs.get("trend", 0.001),
            seasonality=kwargs.get("seasonality", True),
            noise_sd=kwargs.get("noise_sd", 2.0),
            outbreaks=kwargs.get("outbreaks", 3),
        )

    def generate_incidence_series(
        self,
        days: int = 730,
        baseline: float = 10.0,
        trend: float = 0.001,
        seasonality: bool = True,
        noise_sd: float = 2.0,
        outbreaks: int = 3,
    ) -> pd.DataFrame:
        """
        Genera serie temporal de incidencia

        Args:
            days: Numero de dias
            baseline: Incidencia basal diaria
            trend: Tendencia lineal
            seasonality: Incluir estacionalidad
            noise_sd: Desviacion estandar del ruido
            outbreaks: Numero de brotes a simular

        Returns:
            DataFrame con serie temporal
        """
        self._validate_positive_int(days, "days")
        self._validate_positive_float(baseline, "baseline")

        dates = pd.date_range(end=datetime.now(), periods=days, freq="D")

        # Componente tendencia
        trend_component = baseline + trend * np.arange(days)

        # Componente estacional
        if seasonality:
            seasonal_component = 0.3 * baseline * np.sin(2 * np.pi * np.arange(days) / 365)
        else:
            seasonal_component = np.zeros(days)

        # Ruido aleatorio
        noise = self.rng.normal(0, noise_sd, days)

        # Incidencia base
        incidence = trend_component + seasonal_component + noise

        # Agregar brotes
        if outbreaks > 0:
            outbreak_days = self.rng.choice(
                range(30, days - 30), min(outbreaks, days - 60), replace=False
            )
            for day in outbreak_days:
                outbreak_duration = int(self.rng.integers(7, 21))
                outbreak_magnitude = self.rng.uniform(2, 5) * baseline
                outbreak_shape = stats.norm.pdf(
                    np.arange(outbreak_duration),
                    outbreak_duration / 2,
                    outbreak_duration / 4,
                )
                outbreak_shape = outbreak_shape / outbreak_shape.max() * outbreak_magnitude

                end_day = min(day + outbreak_duration, days)
                incidence[day:end_day] += outbreak_shape[: end_day - day]

        # Asegurar valores no negativos
        incidence = np.maximum(incidence, 0)

        # Calcular estadisticas moviles
        df = pd.DataFrame(
            {
                "date": dates,
                "incidence": np.round(incidence, 1),
                "cases": self.rng.poisson(incidence).astype(int),
            }
        )

        # Medias moviles
        df["ma7"] = df["cases"].rolling(window=7, min_periods=1).mean().round(1)
        df["ma14"] = df["cases"].rolling(window=14, min_periods=1).mean().round(1)

        # Semana epidemiologica
        df["epi_week"] = df["date"].dt.isocalendar().week
        df["epi_year"] = df["date"].dt.isocalendar().year

        return df

    def generate_mortality_series(
        self,
        weeks: int = 104,
        population: int = 1_000_000,
        baseline_rate: float = 8.0,
        excess_events: List[Dict] = None,
    ) -> pd.DataFrame:
        """
        Genera serie temporal de mortalidad

        Args:
            weeks: Numero de semanas
            population: Poblacion de referencia
            baseline_rate: Tasa basal (muertes por 1000 por ano)
            excess_events: Lista de eventos de exceso de mortalidad

        Returns:
            DataFrame con serie de mortalidad
        """
        self._validate_positive_int(weeks, "weeks")
        self._validate_positive_int(population, "population")
        self._validate_positive_float(baseline_rate, "baseline_rate")

        weekly_rate = baseline_rate / 52
        expected_deaths = population * weekly_rate / 1000

        dates = pd.date_range(end=datetime.now(), periods=weeks, freq="W")

        # Mortalidad basal con estacionalidad (mayor en invierno)
        seasonal = 0.15 * np.sin(2 * np.pi * (np.arange(weeks) - 26) / 52)
        baseline = expected_deaths * (1 + seasonal)

        # Agregar eventos de exceso
        excess = np.zeros(weeks)
        if excess_events:
            for event in excess_events:
                start_week = event.get("start_week", 0)
                duration = event.get("duration", 10)
                magnitude = event.get("magnitude", 1.5)

                end_week = min(start_week + duration, weeks)
                excess[start_week:end_week] = (magnitude - 1) * baseline[start_week:end_week]

        # Generar muertes observadas
        observed = self.rng.poisson(baseline + excess)

        df = pd.DataFrame(
            {
                "date": dates,
                "epi_week": [d.isocalendar()[1] for d in dates],
                "epi_year": [d.isocalendar()[0] for d in dates],
                "observed_deaths": observed,
                "expected_deaths": np.round(baseline, 1),
                "excess_deaths": np.round(observed - baseline, 1),
                "p_score": np.round((observed - baseline) / baseline * 100, 1),
            }
        )

        return df
