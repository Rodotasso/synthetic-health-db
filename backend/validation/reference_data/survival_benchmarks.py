"""
Datos de supervivencia de referencia.

Fuentes:
- SEER (Surveillance, Epidemiology, and End Results) - NCI USA
- GLOBOCAN/IARC - International Agency for Research on Cancer
- Registros nacionales de cancer
- Literatura medica (meta-analisis)
"""

from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple


@dataclass
class SurvivalData:
    """Datos de supervivencia de referencia"""
    name: str
    cie10_codes: List[str]
    survival_1y: float           # Supervivencia a 1 ano (%)
    survival_3y: float           # Supervivencia a 3 anos (%)
    survival_5y: float           # Supervivencia a 5 anos (%)
    survival_10y: Optional[float]  # Supervivencia a 10 anos (%)
    median_survival_months: Optional[float]  # Mediana supervivencia
    stage_specific: Dict[str, float]  # Supervivencia 5y por estadio
    source: str
    year: int
    notes: str = ""


@dataclass
class HazardRatioReference:
    """Hazard Ratios de referencia para Cox"""
    name: str
    exposure: str
    hr: float                    # Hazard Ratio
    ci_lower: float              # IC 95% inferior
    ci_upper: float              # IC 95% superior
    source: str


# Supervivencia por tipo de cancer (SEER 2014-2020)
SURVIVAL_BENCHMARKS: Dict[str, SurvivalData] = {
    # Canceres solidos
    "breast_cancer": SurvivalData(
        name="Cancer de mama",
        cie10_codes=["C50"],
        survival_1y=96.8,
        survival_3y=92.1,
        survival_5y=90.3,
        survival_10y=83.0,
        median_survival_months=None,  # Alta supervivencia
        stage_specific={
            "I": 99.0,
            "II": 93.0,
            "III": 72.0,
            "IV": 29.0,
        },
        source="SEER 2014-2020",
        year=2023,
        notes="Mujeres, todos los tipos histologicos"
    ),
    "prostate_cancer": SurvivalData(
        name="Cancer de prostata",
        cie10_codes=["C61"],
        survival_1y=99.2,
        survival_3y=98.5,
        survival_5y=97.5,
        survival_10y=95.0,
        median_survival_months=None,
        stage_specific={
            "I": 99.0,
            "II": 99.0,
            "III": 99.0,
            "IV": 32.0,
        },
        source="SEER 2014-2020",
        year=2023
    ),
    "lung_cancer_nsclc": SurvivalData(
        name="Cancer pulmon (no micocitico)",
        cie10_codes=["C34"],
        survival_1y=55.0,
        survival_3y=32.0,
        survival_5y=25.0,
        survival_10y=15.0,
        median_survival_months=14.0,
        stage_specific={
            "I": 68.0,
            "II": 50.0,
            "III": 25.0,
            "IV": 7.0,
        },
        source="SEER 2014-2020",
        year=2023
    ),
    "lung_cancer_sclc": SurvivalData(
        name="Cancer pulmon (microcitico)",
        cie10_codes=["C34"],
        survival_1y=38.0,
        survival_3y=12.0,
        survival_5y=7.0,
        survival_10y=3.0,
        median_survival_months=8.0,
        stage_specific={
            "limited": 15.0,
            "extensive": 3.0,
        },
        source="SEER 2014-2020",
        year=2023
    ),
    "colorectal_cancer": SurvivalData(
        name="Cancer colorrectal",
        cie10_codes=["C18", "C19", "C20"],
        survival_1y=83.0,
        survival_3y=72.0,
        survival_5y=65.0,
        survival_10y=58.0,
        median_survival_months=None,
        stage_specific={
            "I": 91.0,
            "II": 82.0,
            "III": 72.0,
            "IV": 14.0,
        },
        source="SEER 2014-2020",
        year=2023
    ),
    "gastric_cancer": SurvivalData(
        name="Cancer gastrico",
        cie10_codes=["C16"],
        survival_1y=55.0,
        survival_3y=35.0,
        survival_5y=32.0,
        survival_10y=25.0,
        median_survival_months=12.0,
        stage_specific={
            "I": 70.0,
            "II": 45.0,
            "III": 20.0,
            "IV": 6.0,
        },
        source="SEER 2014-2020",
        year=2023
    ),
    "pancreatic_cancer": SurvivalData(
        name="Cancer de pancreas",
        cie10_codes=["C25"],
        survival_1y=28.0,
        survival_3y=12.0,
        survival_5y=11.0,
        survival_10y=7.0,
        median_survival_months=6.0,
        stage_specific={
            "I": 42.0,
            "II": 33.0,
            "III": 14.0,
            "IV": 3.0,
        },
        source="SEER 2014-2020",
        year=2023
    ),
    "melanoma": SurvivalData(
        name="Melanoma cutaneo",
        cie10_codes=["C43"],
        survival_1y=97.0,
        survival_3y=94.0,
        survival_5y=93.0,
        survival_10y=89.0,
        median_survival_months=None,
        stage_specific={
            "I": 99.0,
            "II": 90.0,
            "III": 68.0,
            "IV": 30.0,
        },
        source="SEER 2014-2020",
        year=2023
    ),
    "ovarian_cancer": SurvivalData(
        name="Cancer de ovario",
        cie10_codes=["C56"],
        survival_1y=78.0,
        survival_3y=58.0,
        survival_5y=50.0,
        survival_10y=40.0,
        median_survival_months=45.0,
        stage_specific={
            "I": 92.0,
            "II": 75.0,
            "III": 42.0,
            "IV": 26.0,
        },
        source="SEER 2014-2020",
        year=2023
    ),
    "cervical_cancer": SurvivalData(
        name="Cancer cervicouterino",
        cie10_codes=["C53"],
        survival_1y=88.0,
        survival_3y=72.0,
        survival_5y=66.0,
        survival_10y=60.0,
        median_survival_months=None,
        stage_specific={
            "I": 92.0,
            "II": 60.0,
            "III": 45.0,
            "IV": 17.0,
        },
        source="SEER 2014-2020",
        year=2023
    ),

    # Canceres hematologicos
    "aml": SurvivalData(
        name="Leucemia mieloide aguda",
        cie10_codes=["C92.0"],
        survival_1y=45.0,
        survival_3y=30.0,
        survival_5y=29.0,
        survival_10y=22.0,
        median_survival_months=10.0,
        stage_specific={},  # No aplica estadificacion TNM
        source="SEER 2014-2020",
        year=2023
    ),
    "all": SurvivalData(
        name="Leucemia linfoblastica aguda",
        cie10_codes=["C91.0"],
        survival_1y=75.0,
        survival_3y=55.0,
        survival_5y=40.0,
        survival_10y=35.0,
        median_survival_months=None,
        stage_specific={},
        source="SEER 2014-2020",
        year=2023,
        notes="Adultos; ninos tienen supervivencia mucho mayor (~90%)"
    ),
    "cll": SurvivalData(
        name="Leucemia linfocitica cronica",
        cie10_codes=["C91.1"],
        survival_1y=95.0,
        survival_3y=88.0,
        survival_5y=83.0,
        survival_10y=65.0,
        median_survival_months=120.0,
        stage_specific={
            "Rai 0": 93.0,
            "Rai I-II": 80.0,
            "Rai III-IV": 50.0,
        },
        source="SEER 2014-2020",
        year=2023
    ),
    "hodgkin_lymphoma": SurvivalData(
        name="Linfoma de Hodgkin",
        cie10_codes=["C81"],
        survival_1y=95.0,
        survival_3y=90.0,
        survival_5y=88.0,
        survival_10y=82.0,
        median_survival_months=None,
        stage_specific={
            "I": 93.0,
            "II": 92.0,
            "III": 82.0,
            "IV": 75.0,
        },
        source="SEER 2014-2020",
        year=2023
    ),
    "nhl": SurvivalData(
        name="Linfoma no Hodgkin",
        cie10_codes=["C82", "C83", "C84", "C85"],
        survival_1y=82.0,
        survival_3y=72.0,
        survival_5y=70.0,
        survival_10y=60.0,
        median_survival_months=None,
        stage_specific={
            "I": 86.0,
            "II": 78.0,
            "III": 70.0,
            "IV": 64.0,
        },
        source="SEER 2014-2020",
        year=2023
    ),
    "multiple_myeloma": SurvivalData(
        name="Mieloma multiple",
        cie10_codes=["C90.0"],
        survival_1y=82.0,
        survival_3y=62.0,
        survival_5y=55.0,
        survival_10y=35.0,
        median_survival_months=60.0,
        stage_specific={
            "I": 75.0,
            "II": 55.0,
            "III": 40.0,
        },
        source="SEER 2014-2020",
        year=2023
    ),
}


# Hazard Ratios de referencia (para validacion de Cox)
HR_REFERENCE: Dict[str, List[HazardRatioReference]] = {
    "cancer_general": [
        HazardRatioReference(
            name="Estadio II vs I",
            exposure="stage_II",
            hr=1.8,
            ci_lower=1.5,
            ci_upper=2.2,
            source="SEER meta-analysis"
        ),
        HazardRatioReference(
            name="Estadio III vs I",
            exposure="stage_III",
            hr=2.5,
            ci_lower=2.1,
            ci_upper=3.0,
            source="SEER meta-analysis"
        ),
        HazardRatioReference(
            name="Estadio IV vs I",
            exposure="stage_IV",
            hr=4.0,
            ci_lower=3.5,
            ci_upper=4.8,
            source="SEER meta-analysis"
        ),
        HazardRatioReference(
            name="Edad +10 anos",
            exposure="age_10y",
            hr=1.3,
            ci_lower=1.2,
            ci_upper=1.4,
            source="General oncology literature"
        ),
    ],
    "cardiovascular": [
        HazardRatioReference(
            name="Diabetes",
            exposure="diabetes",
            hr=1.8,
            ci_lower=1.5,
            ci_upper=2.2,
            source="Framingham Heart Study"
        ),
        HazardRatioReference(
            name="Hipertension",
            exposure="hypertension",
            hr=1.5,
            ci_lower=1.3,
            ci_upper=1.8,
            source="Framingham Heart Study"
        ),
        HazardRatioReference(
            name="Tabaquismo activo",
            exposure="smoking",
            hr=2.0,
            ci_lower=1.7,
            ci_upper=2.4,
            source="Framingham Heart Study"
        ),
        HazardRatioReference(
            name="Colesterol alto",
            exposure="high_cholesterol",
            hr=1.3,
            ci_lower=1.1,
            ci_upper=1.5,
            source="Framingham Heart Study"
        ),
    ],
}


def get_survival_benchmark(cancer_type: str) -> Optional[SurvivalData]:
    """
    Obtiene benchmark de supervivencia.

    Args:
        cancer_type: Clave de cancer (ej: 'breast_cancer')

    Returns:
        SurvivalData o None
    """
    return SURVIVAL_BENCHMARKS.get(cancer_type)


def validate_survival_rate(
    cancer_type: str,
    observed_5y: float,
    stage: Optional[str] = None,
    tolerance: float = 0.15
) -> Tuple[bool, str]:
    """
    Valida supervivencia a 5 anos vs referencia.

    Args:
        cancer_type: Tipo de cancer
        observed_5y: Supervivencia 5 anos observada (%)
        stage: Estadio especifico (opcional)
        tolerance: Tolerancia relativa

    Returns:
        Tupla (es_valido, mensaje)
    """
    ref = SURVIVAL_BENCHMARKS.get(cancer_type)
    if ref is None:
        return True, f"Cancer '{cancer_type}' no tiene referencia"

    if stage and stage in ref.stage_specific:
        expected = ref.stage_specific[stage]
        context = f"estadio {stage}"
    else:
        expected = ref.survival_5y
        context = "todos los estadios"

    lower = expected * (1 - tolerance)
    upper = expected * (1 + tolerance)

    if lower <= observed_5y <= upper:
        return True, (
            f"Supervivencia 5 anos {observed_5y:.1f}% plausible "
            f"(referencia: {expected:.1f}%, {ref.name}, {context})"
        )

    return False, (
        f"Supervivencia 5 anos {observed_5y:.1f}% fuera de rango. "
        f"Esperado: {expected:.1f}% +/- {tolerance*100:.0f}% "
        f"({ref.name}, {context}, {ref.source})"
    )


def validate_hazard_ratio(
    context: str,
    exposure: str,
    observed_hr: float,
    tolerance: float = 0.5
) -> Tuple[bool, str]:
    """
    Valida hazard ratio vs referencia.

    Args:
        context: Contexto ('cancer_general', 'cardiovascular')
        exposure: Variable de exposicion
        observed_hr: HR observado
        tolerance: Tolerancia relativa

    Returns:
        Tupla (es_valido, mensaje)
    """
    refs = HR_REFERENCE.get(context, [])
    ref = next((r for r in refs if r.exposure == exposure), None)

    if ref is None:
        return True, f"Exposicion '{exposure}' no tiene referencia en {context}"

    lower = ref.hr * (1 - tolerance)
    upper = ref.hr * (1 + tolerance)

    if lower <= observed_hr <= upper:
        return True, (
            f"HR={observed_hr:.2f} plausible "
            f"(referencia: {ref.hr:.2f} [{ref.ci_lower:.2f}-{ref.ci_upper:.2f}])"
        )

    return False, (
        f"HR={observed_hr:.2f} fuera de rango. "
        f"Esperado: {ref.hr:.2f} +/- {tolerance*100:.0f}% "
        f"(IC 95%: {ref.ci_lower:.2f}-{ref.ci_upper:.2f}, {ref.source})"
    )


def get_stage_survival(cancer_type: str, stage: str) -> Optional[float]:
    """
    Obtiene supervivencia 5 anos por estadio.

    Args:
        cancer_type: Tipo de cancer
        stage: Estadio (I, II, III, IV)

    Returns:
        Supervivencia 5 anos (%) o None
    """
    ref = SURVIVAL_BENCHMARKS.get(cancer_type)
    if ref and stage in ref.stage_specific:
        return ref.stage_specific[stage]
    return None
