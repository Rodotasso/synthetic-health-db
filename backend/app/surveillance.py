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


@dataclass
class AlertThreshold:
    """Umbral de alerta epidemiologica"""
    disease_code: str
    warning_level: float  # Desviaciones std para warning
    alert_level: float    # Desviaciones std para alerta
    baseline: float       # Incidencia basal por 100k
    seasonal: bool        # Tiene patron estacional


class SurveillanceGenerator:
    """Generador de datos de vigilancia epidemiologica"""

    def __init__(self, seed: int = 42):
        np.random.seed(seed)
        self._alert_counter = 0

    def generate_alert_system(self,
                             diseases: List[str],
                             regions: int = 15,
                             days: int = 365,
                             baseline_incidence: Dict[str, float] = None,
                             outbreak_probability: float = 0.02) -> pd.DataFrame:
        """
        Genera sistema de alertas epidemiologicas

        Args:
            diseases: Lista de codigos CIE-10 a vigilar
            regions: Numero de regiones
            days: Dias de simulacion
            baseline_incidence: Incidencia basal por enfermedad (por 100k)
            outbreak_probability: Probabilidad diaria de brote

        Returns:
            DataFrame con alertas y casos
        """
        if baseline_incidence is None:
            baseline_incidence = {d: np.random.uniform(0.5, 10.0) for d in diseases}

        records = []
        start_date = datetime.now() - timedelta(days=days)

        for day in range(days):
            current_date = start_date + timedelta(days=day)

            for region in range(1, regions + 1):
                for disease in diseases:
                    base = baseline_incidence.get(disease, 1.0)

                    # Patron estacional (mayor en invierno para respiratorias)
                    if disease.startswith("J"):  # Respiratorias
                        seasonal_factor = 1 + 0.5 * np.sin(2 * np.pi * (day - 180) / 365)
                    else:
                        seasonal_factor = 1.0

                    # Brote aleatorio
                    if np.random.random() < outbreak_probability:
                        outbreak_factor = np.random.uniform(2.0, 5.0)
                    else:
                        outbreak_factor = 1.0

                    # Generar casos
                    expected = base * seasonal_factor * outbreak_factor
                    cases = np.random.poisson(expected)

                    # Calcular alertas
                    zscore = (cases - base) / np.sqrt(base) if base > 0 else 0
                    alert_level = self._determine_alert(zscore)

                    records.append({
                        "date": current_date.strftime("%Y-%m-%d"),
                        "epi_week": current_date.isocalendar()[1],
                        "region": f"R{region:02d}",
                        "disease_code": disease,
                        "cases": cases,
                        "expected_cases": round(expected, 2),
                        "zscore": round(zscore, 2),
                        "alert_level": alert_level,
                        "outbreak_flag": outbreak_factor > 1.0
                    })

        return pd.DataFrame(records)

    def _determine_alert(self, zscore: float) -> str:
        """Determina nivel de alerta basado en z-score"""
        if zscore >= 3.0:
            return "RED"
        elif zscore >= 2.0:
            return "ORANGE"
        elif zscore >= 1.5:
            return "YELLOW"
        return "GREEN"

    def generate_notifiable_diseases(self,
                                    n_notifications: int,
                                    date_range: Tuple[str, str] = ("2020-01-01", "2024-12-31"),
                                    diseases: List[str] = None) -> pd.DataFrame:
        """
        Genera notificaciones de enfermedades de declaracion obligatoria

        Args:
            n_notifications: Numero de notificaciones
            date_range: Rango de fechas
            diseases: Lista de enfermedades (default: ENO Chile)

        Returns:
            DataFrame con notificaciones
        """
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

        notifications = []

        for _ in range(n_notifications):
            disease = diseases[np.random.randint(0, len(diseases))]
            code, name, urgency = disease

            notif_date = start + timedelta(days=np.random.randint(0, days_range))
            onset_date = notif_date - timedelta(days=np.random.randint(1, 14))

            notifications.append({
                "notification_id": f"NOT-{np.random.randint(100000, 999999)}",
                "notification_date": notif_date.strftime("%Y-%m-%d"),
                "onset_date": onset_date.strftime("%Y-%m-%d"),
                "disease_code": code,
                "disease_name": name,
                "urgency": urgency,
                "patient_age": np.random.randint(0, 95),
                "patient_sex": np.random.choice(["M", "F"]),
                "region": f"R{np.random.randint(1, 17):02d}",
                "comuna": f"C{np.random.randint(1, 350):03d}",
                "hospitalized": np.random.choice([True, False], p=[0.15, 0.85]),
                "icu": np.random.choice([True, False], p=[0.03, 0.97]),
                "deceased": np.random.choice([True, False], p=[0.02, 0.98]),
                "lab_confirmed": np.random.choice([True, False], p=[0.7, 0.3]),
                "travel_history": np.random.choice([True, False], p=[0.1, 0.9]),
                "contact_traced": np.random.choice([True, False], p=[0.6, 0.4])
            })

        return pd.DataFrame(notifications)


class OutbreakGenerator:
    """Generador de datos de brotes epidemicos"""

    def __init__(self, seed: int = 42):
        np.random.seed(seed)

    def generate_outbreak(self,
                         outbreak_type: str = "point_source",
                         n_cases: int = 100,
                         start_date: str = "2024-01-15",
                         disease: str = "A02.0") -> pd.DataFrame:
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
        start = pd.Timestamp(start_date)

        if outbreak_type == "point_source":
            # Exposicion unica - curva log-normal
            delays = np.random.lognormal(mean=1.5, sigma=0.5, size=n_cases)
        elif outbreak_type == "continuous":
            # Exposicion continua - distribucion uniforme extendida
            delays = np.random.uniform(0, 30, size=n_cases)
        else:  # propagated
            # Transmision persona a persona - generaciones
            delays = self._generate_propagated_delays(n_cases)

        cases = []
        for i, delay in enumerate(delays):
            onset = start + timedelta(days=float(delay))

            cases.append({
                "case_id": f"CASE-{i+1:05d}",
                "onset_date": onset.strftime("%Y-%m-%d"),
                "notification_date": (onset + timedelta(days=np.random.randint(1, 5))).strftime("%Y-%m-%d"),
                "disease_code": disease,
                "outbreak_type": outbreak_type,
                "generation": self._assign_generation(delay, outbreak_type),
                "age": np.random.randint(1, 90),
                "sex": np.random.choice(["M", "F"]),
                "exposure_location": f"LOC-{np.random.randint(1, 5):02d}" if outbreak_type == "point_source" else None,
                "secondary_case": delay > 7 if outbreak_type == "propagated" else False,
                "hospitalized": np.random.choice([True, False], p=[0.2, 0.8]),
                "severity": np.random.choice(["mild", "moderate", "severe"], p=[0.7, 0.2, 0.1])
            })

        return pd.DataFrame(cases)

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
                n_secondary = np.random.poisson(2.5)
                for _ in range(n_secondary):
                    if len(delays) >= n_cases:
                        break
                    delay = case + np.random.gamma(serial_interval, 1)
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


class TimeSeriesGenerator:
    """Generador de series temporales epidemiologicas"""

    def __init__(self, seed: int = 42):
        np.random.seed(seed)

    def generate_incidence_series(self,
                                  days: int = 730,
                                  baseline: float = 10.0,
                                  trend: float = 0.001,
                                  seasonality: bool = True,
                                  noise_sd: float = 2.0,
                                  outbreaks: int = 3) -> pd.DataFrame:
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
        dates = pd.date_range(end=datetime.now(), periods=days, freq='D')

        # Componente tendencia
        trend_component = baseline + trend * np.arange(days)

        # Componente estacional
        if seasonality:
            seasonal_component = 0.3 * baseline * np.sin(2 * np.pi * np.arange(days) / 365)
        else:
            seasonal_component = np.zeros(days)

        # Ruido aleatorio
        noise = np.random.normal(0, noise_sd, days)

        # Incidencia base
        incidence = trend_component + seasonal_component + noise

        # Agregar brotes
        if outbreaks > 0:
            outbreak_days = np.random.choice(range(30, days - 30), outbreaks, replace=False)
            for day in outbreak_days:
                outbreak_duration = np.random.randint(7, 21)
                outbreak_magnitude = np.random.uniform(2, 5) * baseline
                outbreak_shape = stats.norm.pdf(np.arange(outbreak_duration), outbreak_duration/2, outbreak_duration/4)
                outbreak_shape = outbreak_shape / outbreak_shape.max() * outbreak_magnitude

                end_day = min(day + outbreak_duration, days)
                incidence[day:end_day] += outbreak_shape[:end_day-day]

        # Asegurar valores no negativos
        incidence = np.maximum(incidence, 0)

        # Calcular estadisticas moviles
        df = pd.DataFrame({
            "date": dates,
            "incidence": np.round(incidence, 1),
            "cases": np.random.poisson(incidence).astype(int)
        })

        # Medias moviles
        df["ma7"] = df["cases"].rolling(window=7, min_periods=1).mean().round(1)
        df["ma14"] = df["cases"].rolling(window=14, min_periods=1).mean().round(1)

        # Semana epidemiologica
        df["epi_week"] = df["date"].dt.isocalendar().week
        df["epi_year"] = df["date"].dt.isocalendar().year

        return df

    def generate_mortality_series(self,
                                  weeks: int = 104,
                                  population: int = 1_000_000,
                                  baseline_rate: float = 8.0,
                                  excess_events: List[Dict] = None) -> pd.DataFrame:
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
        weekly_rate = baseline_rate / 52
        expected_deaths = population * weekly_rate / 1000

        dates = pd.date_range(end=datetime.now(), periods=weeks, freq='W')

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
        observed = np.random.poisson(baseline + excess)

        df = pd.DataFrame({
            "date": dates,
            "epi_week": [d.isocalendar()[1] for d in dates],
            "epi_year": [d.isocalendar()[0] for d in dates],
            "observed_deaths": observed,
            "expected_deaths": np.round(baseline, 1),
            "excess_deaths": np.round(observed - baseline, 1),
            "p_score": np.round((observed - baseline) / baseline * 100, 1)
        })

        return df
