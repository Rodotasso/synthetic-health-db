"""
Sistema de Identificadores Unicos de Pacientes

Genera IDs deterministicos y vinculables para analisis estadisticos.
Formato: SHDB-{birth_year}-{sex}-{region}-{hash6}
"""

from typing import Dict, List, Optional, Any
import hashlib
import uuid
import numpy as np
import pandas as pd
from datetime import date, datetime
from dataclasses import dataclass


@dataclass
class PatientRecord:
    """Registro de paciente con ID unico"""
    patient_id: str
    uuid: str
    birth_date: date
    sex: str
    region: str
    comuna: Optional[str] = None
    created_at: datetime = None

    def __post_init__(self):
        if self.created_at is None:
            self.created_at = datetime.now()


class PatientIDGenerator:
    """Generador de identificadores unicos de pacientes"""

    def __init__(self, seed: int = 42, prefix: str = "SHDB"):
        """
        Args:
            seed: Semilla para reproducibilidad
            prefix: Prefijo del ID (default: SHDB = Synthetic Health DB)
        """
        np.random.seed(seed)
        self.prefix = prefix
        self._counter = 0
        self._registry: Dict[str, PatientRecord] = {}

    def _generate_hash(self, birth_date: str, sex: str,
                       region: str, salt: str = "") -> str:
        """Genera hash de 6 caracteres deterministico"""
        data = f"{birth_date}{sex}{region}{salt}{self._counter}"
        hash_obj = hashlib.sha256(data.encode())
        return hash_obj.hexdigest()[:6].upper()

    def generate_patient(self,
                        birth_date: str,
                        sex: str,
                        region: str,
                        comuna: str = None) -> Dict[str, Any]:
        """
        Genera un paciente con ID unico

        Args:
            birth_date: Fecha nacimiento (YYYY-MM-DD)
            sex: Sexo (M/F)
            region: Codigo region (01-16)
            comuna: Codigo comuna (opcional)

        Returns:
            Dict con patient_id, uuid, y datos demograficos
        """
        self._counter += 1
        birth_year = birth_date[:4]

        hash_part = self._generate_hash(birth_date, sex, region)
        patient_id = f"{self.prefix}-{birth_year}-{sex}-{region}-{hash_part}"

        patient_uuid = str(uuid.uuid5(
            uuid.NAMESPACE_DNS,
            f"{patient_id}-{self._counter}"
        ))

        record = PatientRecord(
            patient_id=patient_id,
            uuid=patient_uuid,
            birth_date=datetime.strptime(birth_date, "%Y-%m-%d").date(),
            sex=sex,
            region=region,
            comuna=comuna
        )

        self._registry[patient_id] = record

        return {
            "patient_id": patient_id,
            "uuid": patient_uuid,
            "birth_date": birth_date,
            "sex": sex,
            "region": region,
            "comuna": comuna,
            "age": self._calculate_age(birth_date)
        }

    def _calculate_age(self, birth_date: str) -> int:
        """Calcula edad actual"""
        birth = datetime.strptime(birth_date, "%Y-%m-%d")
        today = datetime.now()
        return today.year - birth.year - (
            (today.month, today.day) < (birth.month, birth.day)
        )

    def generate_cohort(self,
                       n: int,
                       age_range: tuple = (18, 85),
                       sex_ratio: float = 0.5,
                       regions: List[str] = None,
                       with_encounters: bool = False,
                       encounters_per_patient: tuple = (1, 10)) -> pd.DataFrame:
        """
        Genera cohorte de pacientes con IDs unicos

        Args:
            n: Numero de pacientes
            age_range: Rango de edad (min, max)
            sex_ratio: Proporcion de mujeres (0-1)
            regions: Lista de regiones (default: 01-16)
            with_encounters: Incluir encuentros/visitas
            encounters_per_patient: Rango de encuentros por paciente

        Returns:
            DataFrame con cohorte de pacientes
        """
        if regions is None:
            regions = [f"{i:02d}" for i in range(1, 17)]

        patients = []

        for _ in range(n):
            # Generar datos demograficos
            age = np.random.randint(age_range[0], age_range[1] + 1)
            birth_year = datetime.now().year - age
            birth_month = np.random.randint(1, 13)
            birth_day = np.random.randint(1, 29)
            birth_date = f"{birth_year}-{birth_month:02d}-{birth_day:02d}"

            sex = "F" if np.random.random() < sex_ratio else "M"
            region = np.random.choice(regions)

            patient = self.generate_patient(birth_date, sex, region)
            patients.append(patient)

        df = pd.DataFrame(patients)

        if with_encounters:
            df = self._add_encounters(df, encounters_per_patient)

        return df

    def _add_encounters(self,
                       df: pd.DataFrame,
                       encounters_range: tuple) -> pd.DataFrame:
        """Agrega encuentros/visitas a cada paciente"""
        encounters = []

        for _, row in df.iterrows():
            n_enc = np.random.randint(
                encounters_range[0],
                encounters_range[1] + 1
            )

            for i in range(n_enc):
                enc_date = pd.Timestamp.now() - pd.Timedelta(
                    days=np.random.randint(0, 365 * 5)
                )

                encounters.append({
                    "patient_id": row["patient_id"],
                    "encounter_id": f"ENC-{row['patient_id'][-6:]}-{i+1:04d}",
                    "encounter_date": enc_date.strftime("%Y-%m-%d"),
                    "encounter_type": np.random.choice([
                        "ambulatory", "emergency", "inpatient", "telehealth"
                    ], p=[0.6, 0.15, 0.1, 0.15])
                })

        enc_df = pd.DataFrame(encounters)
        return df.merge(enc_df, on="patient_id", how="left")

    def link_datasets(self,
                     datasets: List[pd.DataFrame],
                     key: str = "patient_id") -> pd.DataFrame:
        """
        Vincula multiples datasets por patient_id

        Args:
            datasets: Lista de DataFrames a vincular
            key: Columna clave (default: patient_id)

        Returns:
            DataFrame vinculado
        """
        if not datasets:
            return pd.DataFrame()

        result = datasets[0]
        for df in datasets[1:]:
            result = result.merge(df, on=key, how="outer")

        return result

    def get_registry(self) -> pd.DataFrame:
        """Retorna registro completo de pacientes generados"""
        records = []
        for pid, record in self._registry.items():
            records.append({
                "patient_id": record.patient_id,
                "uuid": record.uuid,
                "birth_date": record.birth_date,
                "sex": record.sex,
                "region": record.region,
                "comuna": record.comuna,
                "created_at": record.created_at
            })
        return pd.DataFrame(records)


class EncounterGenerator:
    """Generador de encuentros clinicos vinculados a pacientes"""

    def __init__(self, seed: int = 42):
        np.random.seed(seed)
        self._counter = 0

    def generate_encounters(self,
                           patient_ids: List[str],
                           n_encounters: int,
                           date_range: tuple = ("2020-01-01", "2024-12-31"),
                           include_diagnoses: bool = True,
                           include_procedures: bool = False) -> pd.DataFrame:
        """
        Genera encuentros para lista de pacientes

        Args:
            patient_ids: Lista de patient_ids
            n_encounters: Numero total de encuentros
            date_range: Rango de fechas (inicio, fin)
            include_diagnoses: Incluir diagnosticos CIE-10
            include_procedures: Incluir procedimientos

        Returns:
            DataFrame con encuentros
        """
        start = pd.Timestamp(date_range[0])
        end = pd.Timestamp(date_range[1])
        date_range_days = (end - start).days

        encounters = []

        for _ in range(n_encounters):
            self._counter += 1
            patient_id = np.random.choice(patient_ids)
            enc_date = start + pd.Timedelta(
                days=np.random.randint(0, date_range_days)
            )

            enc = {
                "encounter_id": f"ENC-{self._counter:08d}",
                "patient_id": patient_id,
                "encounter_date": enc_date.strftime("%Y-%m-%d"),
                "encounter_type": np.random.choice([
                    "ambulatory", "emergency", "inpatient", "telehealth"
                ], p=[0.55, 0.2, 0.1, 0.15]),
                "facility_id": f"FAC-{np.random.randint(1, 100):03d}",
                "provider_id": f"PROV-{np.random.randint(1, 500):04d}"
            }

            if include_diagnoses:
                enc["primary_dx"] = self._random_cie10()
                enc["secondary_dx"] = self._random_cie10() if np.random.random() < 0.4 else None

            if include_procedures:
                enc["procedure_code"] = self._random_procedure() if np.random.random() < 0.3 else None

            encounters.append(enc)

        return pd.DataFrame(encounters)

    def _random_cie10(self) -> str:
        """Genera codigo CIE-10 aleatorio"""
        common_codes = [
            "I10", "E11.9", "J06.9", "M54.5", "K29.7",
            "F32.9", "J44.9", "I25.1", "E78.5", "N39.0",
            "R10.4", "J18.9", "K21.0", "G43.9", "L30.9"
        ]
        return np.random.choice(common_codes)

    def _random_procedure(self) -> str:
        """Genera codigo de procedimiento aleatorio"""
        procedures = [
            "99213", "99214", "99215", "36415", "80053",
            "85025", "81001", "71046", "93000", "90715"
        ]
        return np.random.choice(procedures)


class LaboratoryGenerator:
    """Generador de resultados de laboratorio vinculados"""

    def __init__(self, seed: int = 42):
        np.random.seed(seed)

    def generate_labs(self,
                     patient_ids: List[str],
                     n_results: int,
                     lab_panels: List[str] = None) -> pd.DataFrame:
        """
        Genera resultados de laboratorio

        Args:
            patient_ids: Lista de patient_ids
            n_results: Numero de resultados
            lab_panels: Paneles a incluir (default: todos)

        Returns:
            DataFrame con resultados
        """
        if lab_panels is None:
            lab_panels = ["chemistry", "hematology", "lipid"]

        lab_definitions = {
            "chemistry": [
                ("glucose", 70, 100, "mg/dL", 80, 200),
                ("creatinine", 0.7, 1.3, "mg/dL", 0.5, 5.0),
                ("bun", 7, 20, "mg/dL", 5, 50),
                ("sodium", 136, 145, "mEq/L", 130, 155),
                ("potassium", 3.5, 5.0, "mEq/L", 3.0, 6.5),
            ],
            "hematology": [
                ("hemoglobin", 12, 17, "g/dL", 8, 20),
                ("hematocrit", 36, 50, "%", 25, 55),
                ("wbc", 4.5, 11.0, "K/uL", 2.0, 25.0),
                ("platelets", 150, 400, "K/uL", 50, 600),
            ],
            "lipid": [
                ("total_cholesterol", 0, 200, "mg/dL", 100, 350),
                ("ldl", 0, 100, "mg/dL", 40, 250),
                ("hdl", 40, 60, "mg/dL", 20, 100),
                ("triglycerides", 0, 150, "mg/dL", 50, 500),
            ]
        }

        results = []

        for _ in range(n_results):
            patient_id = np.random.choice(patient_ids)
            panel = np.random.choice(lab_panels)

            for test in lab_definitions.get(panel, []):
                test_name, low_norm, high_norm, unit, low_range, high_range = test

                # 80% normal, 20% abnormal
                if np.random.random() < 0.8:
                    value = np.random.uniform(low_norm, high_norm)
                else:
                    if np.random.random() < 0.5:
                        value = np.random.uniform(low_range, low_norm)
                    else:
                        value = np.random.uniform(high_norm, high_range)

                results.append({
                    "patient_id": patient_id,
                    "test_date": (pd.Timestamp.now() - pd.Timedelta(
                        days=np.random.randint(0, 365 * 3)
                    )).strftime("%Y-%m-%d"),
                    "panel": panel,
                    "test_name": test_name,
                    "value": round(value, 2),
                    "unit": unit,
                    "low_normal": low_norm,
                    "high_normal": high_norm,
                    "abnormal_flag": "L" if value < low_norm else ("H" if value > high_norm else "N")
                })

        return pd.DataFrame(results)
