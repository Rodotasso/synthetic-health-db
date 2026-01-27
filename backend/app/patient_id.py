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
from .base_generator import BaseGenerator


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


class PatientIDGenerator(BaseGenerator):
    """Generador de identificadores unicos de pacientes"""

    def __init__(self, seed: int = 42, prefix: str = "SHDB"):
        """
        Args:
            seed: Semilla para reproducibilidad
            prefix: Prefijo del ID (default: SHDB = Synthetic Health DB)
        """
        super().__init__(seed)
        self.prefix = prefix
        self._counter = 0
        self._registry: Dict[str, PatientRecord] = {}

    def generate(self, n: int, **kwargs) -> pd.DataFrame:
        """
        Genera cohorte de n pacientes.

        Args:
            n: Numero de pacientes
            **kwargs: Parametros adicionales

        Returns:
            DataFrame con cohorte de pacientes
        """
        return self.generate_cohort(
            n=n,
            age_range=kwargs.get("age_range", (18, 85)),
            sex_ratio=kwargs.get("sex_ratio", 0.5),
            regions=kwargs.get("regions", None),
            with_encounters=kwargs.get("with_encounters", False),
            encounters_per_patient=kwargs.get("encounters_per_patient", (1, 10)),
        )

    def _generate_hash(
        self, birth_date: str, sex: str, region: str, salt: str = ""
    ) -> str:
        """Genera hash de 6 caracteres deterministico"""
        data = f"{birth_date}{sex}{region}{salt}{self._counter}"
        hash_obj = hashlib.sha256(data.encode())
        return hash_obj.hexdigest()[:6].upper()

    def generate_patient(
        self, birth_date: str, sex: str, region: str, comuna: str = None
    ) -> Dict[str, Any]:
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

        patient_uuid = str(
            uuid.uuid5(uuid.NAMESPACE_DNS, f"{patient_id}-{self._counter}")
        )

        record = PatientRecord(
            patient_id=patient_id,
            uuid=patient_uuid,
            birth_date=datetime.strptime(birth_date, "%Y-%m-%d").date(),
            sex=sex,
            region=region,
            comuna=comuna,
        )

        self._registry[patient_id] = record

        return {
            "patient_id": patient_id,
            "uuid": patient_uuid,
            "birth_date": birth_date,
            "sex": sex,
            "region": region,
            "comuna": comuna,
            "age": self._calculate_age(birth_date),
        }

    def _calculate_age(self, birth_date: str) -> int:
        """Calcula edad actual"""
        birth = datetime.strptime(birth_date, "%Y-%m-%d")
        today = datetime.now()
        return today.year - birth.year - (
            (today.month, today.day) < (birth.month, birth.day)
        )

    def generate_cohort(
        self,
        n: int,
        age_range: tuple = (18, 85),
        sex_ratio: float = 0.5,
        regions: List[str] = None,
        with_encounters: bool = False,
        encounters_per_patient: tuple = (1, 10),
    ) -> pd.DataFrame:
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
        self._validate_positive_int(n, "n")
        self._validate_range(age_range, "age_range")
        self._validate_probability(sex_ratio, "sex_ratio")

        if regions is None:
            regions = [f"{i:02d}" for i in range(1, 17)]

        # Vectorized generation
        ages = self.rng.integers(age_range[0], age_range[1] + 1, size=n)
        current_year = datetime.now().year
        birth_years = current_year - ages
        birth_months = self.rng.integers(1, 13, size=n)
        birth_days = self.rng.integers(1, 29, size=n)

        sexes = np.where(self.rng.random(n) < sex_ratio, "F", "M")
        region_choices = self.rng.choice(regions, n)

        patients = []
        for i in range(n):
            birth_date = f"{birth_years[i]}-{birth_months[i]:02d}-{birth_days[i]:02d}"
            patient = self.generate_patient(birth_date, sexes[i], region_choices[i])
            patients.append(patient)

        df = pd.DataFrame(patients)

        if with_encounters:
            df = self._add_encounters(df, encounters_per_patient)

        return df

    def _add_encounters(
        self, df: pd.DataFrame, encounters_range: tuple
    ) -> pd.DataFrame:
        """Agrega encuentros/visitas a cada paciente (vectorizado)"""
        n_patients = len(df)
        n_encounters_per_patient = self.rng.integers(
            encounters_range[0], encounters_range[1] + 1, size=n_patients
        )
        total_encounters = n_encounters_per_patient.sum()

        # Pre-allocate arrays
        patient_indices = np.repeat(np.arange(n_patients), n_encounters_per_patient)
        encounter_nums = np.concatenate(
            [np.arange(1, n + 1) for n in n_encounters_per_patient]
        )

        # Generate all random values at once
        days_ago = self.rng.integers(0, 365 * 5, size=total_encounters)
        encounter_types = self.rng.choice(
            ["ambulatory", "emergency", "inpatient", "telehealth"],
            size=total_encounters,
            p=[0.6, 0.15, 0.1, 0.15],
        )

        # Build encounters DataFrame
        patient_ids = df["patient_id"].values[patient_indices]
        hash_parts = np.array([pid[-6:] for pid in patient_ids])

        enc_dates = pd.Timestamp.now() - pd.to_timedelta(days_ago, unit="D")

        encounters_df = pd.DataFrame(
            {
                "patient_id": patient_ids,
                "encounter_id": [
                    f"ENC-{hash_parts[i]}-{encounter_nums[i]:04d}"
                    for i in range(total_encounters)
                ],
                "encounter_date": enc_dates.strftime("%Y-%m-%d"),
                "encounter_type": encounter_types,
            }
        )

        return df.merge(encounters_df, on="patient_id", how="left")

    def link_datasets(
        self, datasets: List[pd.DataFrame], key: str = "patient_id"
    ) -> pd.DataFrame:
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
            records.append(
                {
                    "patient_id": record.patient_id,
                    "uuid": record.uuid,
                    "birth_date": record.birth_date,
                    "sex": record.sex,
                    "region": record.region,
                    "comuna": record.comuna,
                    "created_at": record.created_at,
                }
            )
        return pd.DataFrame(records)


class EncounterGenerator(BaseGenerator):
    """Generador de encuentros clinicos vinculados a pacientes"""

    def __init__(self, seed: int = 42):
        super().__init__(seed)
        self._counter = 0

    def generate(self, n: int, **kwargs) -> pd.DataFrame:
        """
        Genera n encuentros.

        Args:
            n: Numero de encuentros
            **kwargs: Parametros adicionales

        Returns:
            DataFrame con encuentros
        """
        patient_ids = kwargs.get("patient_ids", [f"PAT-{i:06d}" for i in range(100)])
        return self.generate_encounters(
            patient_ids=patient_ids,
            n_encounters=n,
            date_range=kwargs.get("date_range", ("2020-01-01", "2024-12-31")),
            include_diagnoses=kwargs.get("include_diagnoses", True),
            include_procedures=kwargs.get("include_procedures", False),
        )

    def generate_encounters(
        self,
        patient_ids: List[str],
        n_encounters: int,
        date_range: tuple = ("2020-01-01", "2024-12-31"),
        include_diagnoses: bool = True,
        include_procedures: bool = False,
    ) -> pd.DataFrame:
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
        self._validate_positive_int(n_encounters, "n_encounters")

        start = pd.Timestamp(date_range[0])
        end = pd.Timestamp(date_range[1])
        date_range_days = (end - start).days

        # Vectorized generation
        patient_choices = self.rng.choice(patient_ids, n_encounters)
        days_offset = self.rng.integers(0, date_range_days, n_encounters)
        enc_dates = start + pd.to_timedelta(days_offset, unit="D")
        encounter_types = self.rng.choice(
            ["ambulatory", "emergency", "inpatient", "telehealth"],
            n_encounters,
            p=[0.55, 0.2, 0.1, 0.15],
        )
        facility_ids = [
            f"FAC-{i:03d}" for i in self.rng.integers(1, 100, n_encounters)
        ]
        provider_ids = [
            f"PROV-{i:04d}" for i in self.rng.integers(1, 500, n_encounters)
        ]

        encounters = []
        for i in range(n_encounters):
            self._counter += 1
            enc = {
                "encounter_id": f"ENC-{self._counter:08d}",
                "patient_id": patient_choices[i],
                "encounter_date": enc_dates[i].strftime("%Y-%m-%d"),
                "encounter_type": encounter_types[i],
                "facility_id": facility_ids[i],
                "provider_id": provider_ids[i],
            }

            if include_diagnoses:
                enc["primary_dx"] = self._random_cie10()
                enc["secondary_dx"] = (
                    self._random_cie10() if self.rng.random() < 0.4 else None
                )

            if include_procedures:
                enc["procedure_code"] = (
                    self._random_procedure() if self.rng.random() < 0.3 else None
                )

            encounters.append(enc)

        return pd.DataFrame(encounters)

    def _random_cie10(self) -> str:
        """Genera codigo CIE-10 aleatorio"""
        common_codes = [
            "I10",
            "E11.9",
            "J06.9",
            "M54.5",
            "K29.7",
            "F32.9",
            "J44.9",
            "I25.1",
            "E78.5",
            "N39.0",
            "R10.4",
            "J18.9",
            "K21.0",
            "G43.9",
            "L30.9",
        ]
        return self.rng.choice(common_codes)

    def _random_procedure(self) -> str:
        """Genera codigo de procedimiento aleatorio"""
        procedures = [
            "99213",
            "99214",
            "99215",
            "36415",
            "80053",
            "85025",
            "81001",
            "71046",
            "93000",
            "90715",
        ]
        return self.rng.choice(procedures)


class LaboratoryGenerator(BaseGenerator):
    """Generador de resultados de laboratorio vinculados"""

    def __init__(self, seed: int = 42):
        super().__init__(seed)

    def generate(self, n: int, **kwargs) -> pd.DataFrame:
        """
        Genera n resultados de laboratorio.

        Args:
            n: Numero de resultados
            **kwargs: Parametros adicionales

        Returns:
            DataFrame con resultados
        """
        patient_ids = kwargs.get("patient_ids", [f"PAT-{i:06d}" for i in range(100)])
        return self.generate_labs(
            patient_ids=patient_ids,
            n_results=n,
            lab_panels=kwargs.get("lab_panels", None),
        )

    def generate_labs(
        self,
        patient_ids: List[str],
        n_results: int,
        lab_panels: List[str] = None,
    ) -> pd.DataFrame:
        """
        Genera resultados de laboratorio

        Args:
            patient_ids: Lista de patient_ids
            n_results: Numero de resultados
            lab_panels: Paneles a incluir (default: todos)

        Returns:
            DataFrame con resultados
        """
        self._validate_positive_int(n_results, "n_results")

        if lab_panels is None:
            lab_panels = ["chemistry", "hematology", "lipid"]

        lab_definitions = {
            "chemistry": [
                ("glucose", 70, 100, "mg/dL", 50, 200),
                ("creatinine", 0.7, 1.3, "mg/dL", 0.3, 5.0),
                ("bun", 7, 20, "mg/dL", 3, 50),
                ("sodium", 136, 145, "mEq/L", 130, 155),
                ("potassium", 3.5, 5.0, "mEq/L", 2.5, 6.5),
            ],
            "hematology": [
                ("hemoglobin", 12, 17, "g/dL", 8, 20),
                ("hematocrit", 36, 50, "%", 25, 55),
                ("wbc", 4.5, 11.0, "K/uL", 2.0, 25.0),
                ("platelets", 150, 400, "K/uL", 50, 600),
            ],
            "lipid": [
                ("total_cholesterol", 150, 200, "mg/dL", 100, 350),
                ("ldl", 70, 100, "mg/dL", 40, 250),
                ("hdl", 40, 60, "mg/dL", 20, 100),
                ("triglycerides", 50, 150, "mg/dL", 30, 500),
            ],
        }

        results = []

        for _ in range(n_results):
            patient_id = self.rng.choice(patient_ids)
            panel = self.rng.choice(lab_panels)

            for test in lab_definitions.get(panel, []):
                test_name, low_norm, high_norm, unit, low_range, high_range = test

                # 80% normal, 20% abnormal
                if self.rng.random() < 0.8:
                    value = self.rng.uniform(low_norm, high_norm)
                else:
                    if self.rng.random() < 0.5:
                        value = self.rng.uniform(low_range, low_norm)
                    else:
                        value = self.rng.uniform(high_norm, high_range)

                results.append(
                    {
                        "patient_id": patient_id,
                        "test_date": (
                            pd.Timestamp.now()
                            - pd.Timedelta(days=int(self.rng.integers(0, 365 * 3)))
                        ).strftime("%Y-%m-%d"),
                        "panel": panel,
                        "test_name": test_name,
                        "value": round(value, 2),
                        "unit": unit,
                        "low_normal": low_norm,
                        "high_normal": high_norm,
                        "abnormal_flag": (
                            "L" if value < low_norm else ("H" if value > high_norm else "N")
                        ),
                    }
                )

        return pd.DataFrame(results)
