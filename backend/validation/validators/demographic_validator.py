"""
Validador de datos demograficos.

Valida:
- Distribucion de edad vs piramide INE Chile
- Distribucion de sexo
- Prevalencias vs ENS Chile
- Consistencia de patologias
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
from ..reference_data.prevalence_chile import (
    PREVALENCE_ENS,
    get_prevalence,
    validate_prevalence,
    get_sex_ratio,
)


# Piramide poblacional Chile (INE 2023, simplificada)
CHILE_AGE_DISTRIBUTION = {
    "0-14": 0.18,     # Pediatricos
    "15-39": 0.32,    # Adultos jovenes
    "40-64": 0.33,    # Adultos medios
    "65+": 0.17,      # Adultos mayores
}

CHILE_SEX_RATIO = {
    "male": 0.49,
    "female": 0.51,
}


class DemographicValidator(BaseValidator):
    """Validador de plausibilidad para datos demograficos"""

    @property
    def name(self) -> str:
        return "DemographicValidator"

    def validate(
        self,
        data: pd.DataFrame,
        population: str = "general",
        region: Optional[str] = None,
        **kwargs,
    ) -> ValidationReport:
        """
        Valida datos demograficos.

        Args:
            data: DataFrame con columnas 'age' y 'sex'
            population: Tipo de poblacion ('general', 'oncology', 'pediatric', etc.)
            region: Region de Chile (opcional)

        Returns:
            ValidationReport
        """
        self._reset_results()
        description = f"Datos demograficos ({population})"

        # Validar estructura
        self._validate_structure(data)

        # Validar distribucion de edad
        if "age" in data.columns:
            self._validate_age_distribution(data, population)

        # Validar distribucion de sexo
        if "sex" in data.columns:
            self._validate_sex_distribution(data, population)

        # Validar prevalencias si hay columnas de patologias
        pathology_cols = self._detect_pathology_columns(data)
        if pathology_cols:
            self._validate_prevalences(data, pathology_cols)

        # Validar consistencia edad-patologia
        if "age" in data.columns and pathology_cols:
            self._validate_age_pathology_consistency(data, pathology_cols)

        return self._create_report(description)

    def _validate_structure(self, data: pd.DataFrame) -> None:
        """Valida estructura basica"""
        has_age = "age" in data.columns
        has_sex = "sex" in data.columns

        if not has_age and not has_sex:
            self._add_result(ValidationResult(
                check_name="structure_check",
                passed=False,
                severity=ValidationSeverity.ERROR,
                message="DataFrame no tiene columnas 'age' ni 'sex'",
            ))
        else:
            cols_present = []
            if has_age:
                cols_present.append("age")
            if has_sex:
                cols_present.append("sex")
            self._add_result(ValidationResult(
                check_name="structure_check",
                passed=True,
                severity=ValidationSeverity.INFO,
                message=f"Columnas presentes: {cols_present}",
            ))

    def _validate_age_distribution(
        self, data: pd.DataFrame, population: str
    ) -> None:
        """Valida distribucion de edad"""
        ages = data["age"].values

        # Estadisticas basicas
        mean_age = np.mean(ages)
        std_age = np.std(ages)
        min_age = np.min(ages)
        max_age = np.max(ages)

        # Validar valores validos
        invalid_count = np.sum((ages < 0) | (ages > 120))
        if invalid_count > 0:
            self._add_result(ValidationResult(
                check_name="age_validity",
                passed=False,
                severity=ValidationSeverity.ERROR,
                message=f"{invalid_count} edades invalidas (< 0 o > 120)",
            ))
        else:
            self._add_result(ValidationResult(
                check_name="age_validity",
                passed=True,
                severity=ValidationSeverity.INFO,
                message="Todas las edades en rango valido [0, 120]",
            ))

        # Calcular distribucion por grupos
        age_groups = self._categorize_ages(ages)
        n_total = len(ages)
        observed_props = {
            group: count / n_total
            for group, count in age_groups.items()
        }

        # Distribucion esperada segun tipo de poblacion
        if population == "pediatric":
            expected_props = {"0-14": 1.0, "15-39": 0.0, "40-64": 0.0, "65+": 0.0}
            tolerance = 0.1
        elif population == "oncology":
            # Oncologia: mas adultos mayores
            expected_props = {"0-14": 0.02, "15-39": 0.15, "40-64": 0.45, "65+": 0.38}
            tolerance = 0.3
        elif population == "geriatric":
            expected_props = {"0-14": 0.0, "15-39": 0.0, "40-64": 0.0, "65+": 1.0}
            tolerance = 0.1
        else:  # general
            expected_props = CHILE_AGE_DISTRIBUTION
            tolerance = 0.25

        # Comparar distribuciones
        self._check_distribution(
            check_name="age_distribution_ine",
            observed_counts={k: int(v * n_total) for k, v in observed_props.items()},
            expected_proportions=expected_props,
            reference=f"INE Chile 2023 (poblacion {population})",
        )

        # Informar estadisticas
        self._add_result(ValidationResult(
            check_name="age_statistics",
            passed=True,
            severity=ValidationSeverity.INFO,
            message=(
                f"Edad: media={mean_age:.1f}, DE={std_age:.1f}, "
                f"rango=[{min_age}, {max_age}]"
            ),
            metadata={
                "mean": float(mean_age),
                "std": float(std_age),
                "min": int(min_age),
                "max": int(max_age),
                "distribution": observed_props,
            },
        ))

    def _categorize_ages(self, ages: np.ndarray) -> Dict[str, int]:
        """Categoriza edades en grupos"""
        return {
            "0-14": int(np.sum((ages >= 0) & (ages <= 14))),
            "15-39": int(np.sum((ages >= 15) & (ages <= 39))),
            "40-64": int(np.sum((ages >= 40) & (ages <= 64))),
            "65+": int(np.sum(ages >= 65)),
        }

    def _validate_sex_distribution(
        self, data: pd.DataFrame, population: str
    ) -> None:
        """Valida distribucion de sexo"""
        sex = data["sex"].values

        # Normalizar valores
        sex_normalized = []
        for s in sex:
            s_str = str(s).upper()
            if s_str in ["M", "MALE", "MASCULINO", "1"]:
                sex_normalized.append("M")
            elif s_str in ["F", "FEMALE", "FEMENINO", "2"]:
                sex_normalized.append("F")
            else:
                sex_normalized.append("OTHER")

        sex_normalized = np.array(sex_normalized)

        n_total = len(sex)
        n_male = np.sum(sex_normalized == "M")
        n_female = np.sum(sex_normalized == "F")
        n_other = np.sum(sex_normalized == "OTHER")

        male_prop = n_male / n_total if n_total > 0 else 0
        female_prop = n_female / n_total if n_total > 0 else 0

        # Validar valores no reconocidos
        if n_other > n_total * 0.05:
            self._add_result(ValidationResult(
                check_name="sex_validity",
                passed=False,
                severity=ValidationSeverity.WARNING,
                message=f"{n_other} valores de sexo no reconocidos ({n_other/n_total*100:.1f}%)",
            ))
        else:
            self._add_result(ValidationResult(
                check_name="sex_validity",
                passed=True,
                severity=ValidationSeverity.INFO,
                message="Valores de sexo validos",
            ))

        # Proporciones esperadas
        if population == "maternal":
            expected_male = 0.0
            expected_female = 1.0
        elif population == "prostate":
            expected_male = 1.0
            expected_female = 0.0
        else:
            expected_male = CHILE_SEX_RATIO["male"]
            expected_female = CHILE_SEX_RATIO["female"]

        # Comparar
        self._check_distribution(
            check_name="sex_distribution",
            observed_counts={"M": n_male, "F": n_female},
            expected_proportions={"M": expected_male, "F": expected_female},
            reference="INE Chile 2023",
        )

        self._add_result(ValidationResult(
            check_name="sex_statistics",
            passed=True,
            severity=ValidationSeverity.INFO,
            message=f"Sexo: M={male_prop*100:.1f}%, F={female_prop*100:.1f}%",
            metadata={
                "male": float(male_prop),
                "female": float(female_prop),
                "n_male": int(n_male),
                "n_female": int(n_female),
            },
        ))

    def _detect_pathology_columns(self, data: pd.DataFrame) -> List[str]:
        """Detecta columnas de patologias conocidas"""
        known_pathologies = list(PREVALENCE_ENS.keys())
        pathology_cols = []

        for col in data.columns:
            col_lower = col.lower()
            for pathology in known_pathologies:
                if pathology in col_lower or col_lower in pathology:
                    pathology_cols.append(col)
                    break

        # Tambien buscar columnas binarias con nombres comunes
        common_names = [
            "diabetes", "hypertension", "hta", "obesity", "depression",
            "asthma", "copd", "ckd", "stroke", "ami", "cancer"
        ]
        for col in data.columns:
            col_lower = col.lower()
            if any(name in col_lower for name in common_names):
                if col not in pathology_cols:
                    pathology_cols.append(col)

        return pathology_cols

    def _validate_prevalences(
        self, data: pd.DataFrame, pathology_cols: List[str]
    ) -> None:
        """Valida prevalencias de patologias vs ENS"""
        n_total = len(data)

        for col in pathology_cols:
            # Calcular prevalencia observada
            if data[col].dtype in [bool, np.bool_]:
                n_cases = data[col].sum()
            elif data[col].dtype in [int, np.int64, np.int32]:
                n_cases = (data[col] == 1).sum()
            else:
                continue

            observed_prev = n_cases / n_total * 100 if n_total > 0 else 0

            # Buscar referencia ENS
            col_lower = col.lower()
            ref_key = None
            for key in PREVALENCE_ENS:
                if key in col_lower or col_lower in key:
                    ref_key = key
                    break

            if ref_key:
                is_valid, message = validate_prevalence(
                    ref_key, observed_prev, tolerance=0.4
                )
                ref = PREVALENCE_ENS[ref_key]

                self._add_result(ValidationResult(
                    check_name=f"prevalence_{col}",
                    passed=is_valid,
                    severity=ValidationSeverity.INFO if is_valid else ValidationSeverity.WARNING,
                    message=message,
                    observed_value=observed_prev,
                    expected_value=ref.prevalence_percent,
                    reference=ref.source,
                ))
            else:
                self._add_result(ValidationResult(
                    check_name=f"prevalence_{col}",
                    passed=True,
                    severity=ValidationSeverity.INFO,
                    message=f"{col}: {observed_prev:.1f}% (sin referencia ENS)",
                    observed_value=observed_prev,
                ))

    def _validate_age_pathology_consistency(
        self, data: pd.DataFrame, pathology_cols: List[str]
    ) -> None:
        """Valida consistencia edad-patologia"""
        ages = data["age"].values

        for col in pathology_cols:
            if data[col].dtype not in [bool, np.bool_, int, np.int64, np.int32]:
                continue

            # Casos positivos
            if data[col].dtype in [bool, np.bool_]:
                mask = data[col]
            else:
                mask = data[col] == 1

            if mask.sum() == 0:
                continue

            mean_age_cases = ages[mask].mean()
            mean_age_controls = ages[~mask].mean() if (~mask).sum() > 0 else 0

            # Verificar que enfermedades cronicas tengan casos mayores
            chronic_conditions = [
                "diabetes", "hypertension", "copd", "ckd", "cancer",
                "stroke", "heart", "arthrosis"
            ]

            col_lower = col.lower()
            if any(cond in col_lower for cond in chronic_conditions):
                # Casos deben ser mayores en promedio
                if mean_age_cases < mean_age_controls - 5:
                    self._add_result(ValidationResult(
                        check_name=f"age_consistency_{col}",
                        passed=False,
                        severity=ValidationSeverity.WARNING,
                        message=(
                            f"{col}: casos mas jovenes ({mean_age_cases:.0f}) "
                            f"que controles ({mean_age_controls:.0f}) - inusual"
                        ),
                    ))
                else:
                    self._add_result(ValidationResult(
                        check_name=f"age_consistency_{col}",
                        passed=True,
                        severity=ValidationSeverity.INFO,
                        message=(
                            f"{col}: edad casos={mean_age_cases:.0f}, "
                            f"controles={mean_age_controls:.0f}"
                        ),
                    ))

    def validate_chile_population(
        self, data: pd.DataFrame
    ) -> ValidationReport:
        """Atajo para validar datos representativos de Chile"""
        return self.validate(data, population="general", region="national")

    def validate_pathology_prevalence(
        self,
        condition: str,
        observed_count: int,
        total_population: int,
    ) -> ValidationReport:
        """
        Valida prevalencia de una condicion especifica.

        Args:
            condition: Clave de condicion (ej: 'diabetes_type2')
            observed_count: Numero de casos observados
            total_population: Poblacion total

        Returns:
            ValidationReport
        """
        self._reset_results()

        observed_prev = observed_count / total_population * 100 if total_population > 0 else 0
        is_valid, message = validate_prevalence(condition, observed_prev)

        ref = PREVALENCE_ENS.get(condition)
        expected = ref.prevalence_percent if ref else None

        self._add_result(ValidationResult(
            check_name=f"prevalence_{condition}",
            passed=is_valid,
            severity=ValidationSeverity.INFO if is_valid else ValidationSeverity.WARNING,
            message=message,
            observed_value=observed_prev,
            expected_value=expected,
            reference=ref.source if ref else None,
        ))

        return self._create_report(f"Prevalencia {condition}")

    @staticmethod
    def list_conditions() -> list:
        """Lista condiciones con referencias ENS"""
        return list(PREVALENCE_ENS.keys())

    @staticmethod
    def get_condition_info(condition: str) -> Optional[dict]:
        """Obtiene info de condicion"""
        if condition in PREVALENCE_ENS:
            ref = PREVALENCE_ENS[condition]
            return {
                "name": ref.name,
                "prevalence_percent": ref.prevalence_percent,
                "prevalence_per_100k": ref.prevalence_per_100k,
                "male_percent": ref.male_percent,
                "female_percent": ref.female_percent,
                "age_range": ref.age_range,
                "source": ref.source,
            }
        return None
