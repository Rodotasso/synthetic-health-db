from typing import List
import numpy as np
import pandas as pd
from app.models import SchemaConfig, ErrorType


class CIE10Generator:
    """Generador CIE-10 determinístico"""

    def __init__(self, seed: int = 42):
        np.random.seed(seed)
        self.valid_codes = self._load_codes()

    def _load_codes(self) -> List[str]:
        """Carga códigos válidos CIE-10"""
        # Versión simplificada - en prod cargar desde archivo/DB
        return [
            "A00.0",
            "A01.0",
            "A15.0",
            "I21.0",
            "I25.1",
            "I50.9",
            "E11.0",
            "E11.9",
            "J44.9",
            "G20",
            "G30.9",
            "C50.9",
            "N18.9",
            "M54.5",
            "F32.9",
            "R10.4",
            "S06.0",
        ]

    def generate(self, n: int, error_types: dict = None) -> pd.DataFrame:
        """Genera base sintética CIE-10"""
        ids = np.arange(1, n + 1)
        codes = np.random.choice(self.valid_codes, n)

        df = pd.DataFrame({"id": ids, "codigo": codes})

        if error_types:
            df = self._apply_errors(df, error_types)

        return df

    def _apply_errors(self, df: pd.DataFrame, errors: dict = None) -> pd.DataFrame:
        """Aplica errores según configuración"""
        if not errors:
            return df
        for error_type, prob in errors.items():
            if prob <= 0:
                continue

            mask = np.random.random(len(df)) < prob
            if not mask.any():
                continue

            if error_type == ErrorType.SPACES:
                df.loc[mask, "codigo"] = df.loc[mask, "codigo"].str.replace(
                    r"(.)(.)", r"\1 \2", n=1, regex=True
                )
            elif error_type == ErrorType.LOWERCASE:
                df.loc[mask, "codigo"] = df.loc[mask, "codigo"].str.lower()
            elif error_type == ErrorType.TRUNCATED:
                df.loc[mask, "codigo"] = df.loc[mask, "codigo"].str.split(".").str[0]

        return df


class DemographicsGenerator:
    """Generador demográfico poblacional"""

    def __init__(self, seed: int = 42):
        np.random.seed(seed)

    def generate(self, n: int, age_dist: str = "chile") -> pd.DataFrame:
        """Genera datos demográficos"""
        ids = np.arange(1, n + 1)

        # Distribución edad (chilena promedio)
        age = np.random.beta(2, 5, n) * 90 + 5
        age = age.astype(int)

        # Género (50/50)
        gender = np.random.choice(["M", "F"], n)

        # Región (15 regiones)
        regions = [f"R{i:02d}" for i in range(1, 16)]
        region = np.random.choice(regions, n)

        return pd.DataFrame(
            {"id": ids, "edad": age, "genero": gender, "region": region}
        )
