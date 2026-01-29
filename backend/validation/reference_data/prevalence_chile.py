"""
Prevalencias de enfermedades en Chile.

Fuente principal: Encuesta Nacional de Salud (ENS) 2016-2017
Otras fuentes: DEIS, estudios nacionales

ENS 2016-2017:
- Muestra representativa nacional
- n = 6,233 personas >= 15 anos
- Metodologia OMS STEPwise
"""

from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple


@dataclass
class PrevalenceData:
    """Datos de prevalencia"""
    name: str
    cie10_codes: List[str]
    prevalence_percent: float      # Prevalencia %
    prevalence_per_100k: float     # Prevalencia por 100k
    age_range: Tuple[int, int]     # Rango edad poblacion
    male_percent: Optional[float]  # Prevalencia en hombres
    female_percent: Optional[float]  # Prevalencia en mujeres
    year: int
    source: str
    notes: str = ""


# Prevalencias ENS Chile 2016-2017
PREVALENCE_ENS: Dict[str, PrevalenceData] = {
    # Enfermedades cronicas no transmisibles
    "hypertension": PrevalenceData(
        name="Hipertension arterial",
        cie10_codes=["I10"],
        prevalence_percent=27.6,
        prevalence_per_100k=27600,
        age_range=(15, 99),
        male_percent=28.1,
        female_percent=27.2,
        year=2017,
        source="ENS 2016-2017",
        notes="Incluye HTA conocida y no conocida"
    ),
    "diabetes_type2": PrevalenceData(
        name="Diabetes mellitus tipo 2",
        cie10_codes=["E11"],
        prevalence_percent=12.3,
        prevalence_per_100k=12300,
        age_range=(15, 99),
        male_percent=12.2,
        female_percent=12.4,
        year=2017,
        source="ENS 2016-2017",
        notes="Criterio: glicemia >= 126 mg/dL o diagnostico previo"
    ),
    "prediabetes": PrevalenceData(
        name="Prediabetes (intolerancia glucosa)",
        cie10_codes=["R73.0"],
        prevalence_percent=13.4,
        prevalence_per_100k=13400,
        age_range=(15, 99),
        male_percent=12.0,
        female_percent=14.6,
        year=2017,
        source="ENS 2016-2017"
    ),
    "obesity": PrevalenceData(
        name="Obesidad (IMC >= 30)",
        cie10_codes=["E66"],
        prevalence_percent=31.2,
        prevalence_per_100k=31200,
        age_range=(15, 99),
        male_percent=28.6,
        female_percent=33.7,
        year=2017,
        source="ENS 2016-2017"
    ),
    "overweight": PrevalenceData(
        name="Sobrepeso (IMC 25-29.9)",
        cie10_codes=["E66"],
        prevalence_percent=39.8,
        prevalence_per_100k=39800,
        age_range=(15, 99),
        male_percent=43.2,
        female_percent=36.7,
        year=2017,
        source="ENS 2016-2017"
    ),
    "dyslipidemia": PrevalenceData(
        name="Dislipidemia (colesterol total elevado)",
        cie10_codes=["E78"],
        prevalence_percent=27.8,
        prevalence_per_100k=27800,
        age_range=(15, 99),
        male_percent=25.1,
        female_percent=30.3,
        year=2017,
        source="ENS 2016-2017",
        notes="Colesterol total >= 200 mg/dL"
    ),
    "metabolic_syndrome": PrevalenceData(
        name="Sindrome metabolico",
        cie10_codes=["E88.81"],
        prevalence_percent=40.1,
        prevalence_per_100k=40100,
        age_range=(15, 99),
        male_percent=38.2,
        female_percent=41.9,
        year=2017,
        source="ENS 2016-2017",
        notes="Criterios ATP III modificados"
    ),

    # Enfermedades respiratorias
    "copd": PrevalenceData(
        name="Enfermedad pulmonar obstructiva cronica",
        cie10_codes=["J44"],
        prevalence_percent=3.9,
        prevalence_per_100k=3900,
        age_range=(40, 99),
        male_percent=4.5,
        female_percent=3.4,
        year=2017,
        source="ENS 2016-2017",
        notes="Espirometria post-broncodilatador"
    ),
    "asthma": PrevalenceData(
        name="Asma bronquial",
        cie10_codes=["J45"],
        prevalence_percent=5.4,
        prevalence_per_100k=5400,
        age_range=(15, 99),
        male_percent=4.2,
        female_percent=6.5,
        year=2017,
        source="ENS 2016-2017"
    ),

    # Salud mental
    "depression": PrevalenceData(
        name="Depresion (ultimo ano)",
        cie10_codes=["F32", "F33"],
        prevalence_percent=15.8,
        prevalence_per_100k=15800,
        age_range=(15, 99),
        male_percent=8.5,
        female_percent=22.4,
        year=2017,
        source="ENS 2016-2017",
        notes="CIDI-SF, episodio depresivo ultimo ano"
    ),
    "anxiety": PrevalenceData(
        name="Sintomas ansiosos (ultimo mes)",
        cie10_codes=["F41"],
        prevalence_percent=6.5,
        prevalence_per_100k=6500,
        age_range=(15, 99),
        male_percent=4.0,
        female_percent=8.8,
        year=2017,
        source="ENS 2016-2017"
    ),

    # Enfermedades renales
    "chronic_kidney_disease": PrevalenceData(
        name="Enfermedad renal cronica",
        cie10_codes=["N18"],
        prevalence_percent=2.7,
        prevalence_per_100k=2700,
        age_range=(15, 99),
        male_percent=2.3,
        female_percent=3.0,
        year=2017,
        source="ENS 2016-2017",
        notes="eGFR < 60 mL/min/1.73m2"
    ),

    # Factores de riesgo
    "smoking_current": PrevalenceData(
        name="Tabaquismo actual",
        cie10_codes=["F17"],
        prevalence_percent=33.3,
        prevalence_per_100k=33300,
        age_range=(15, 99),
        male_percent=37.8,
        female_percent=29.1,
        year=2017,
        source="ENS 2016-2017"
    ),
    "alcohol_risk": PrevalenceData(
        name="Consumo riesgoso de alcohol",
        cie10_codes=["F10"],
        prevalence_percent=11.7,
        prevalence_per_100k=11700,
        age_range=(15, 99),
        male_percent=17.0,
        female_percent=6.8,
        year=2017,
        source="ENS 2016-2017",
        notes="AUDIT >= 8"
    ),
    "sedentary": PrevalenceData(
        name="Sedentarismo (inactivo en tiempo libre)",
        cie10_codes=["Z72.3"],
        prevalence_percent=86.7,
        prevalence_per_100k=86700,
        age_range=(15, 99),
        male_percent=84.0,
        female_percent=89.2,
        year=2017,
        source="ENS 2016-2017"
    ),

    # Cardiovascular
    "ischemic_heart_disease": PrevalenceData(
        name="Enfermedad cardiaca isquemica (autoreporte)",
        cie10_codes=["I20", "I21", "I22", "I23", "I24", "I25"],
        prevalence_percent=3.3,
        prevalence_per_100k=3300,
        age_range=(15, 99),
        male_percent=3.8,
        female_percent=2.8,
        year=2017,
        source="ENS 2016-2017"
    ),
    "stroke": PrevalenceData(
        name="Accidente cerebrovascular (autoreporte)",
        cie10_codes=["I60", "I61", "I62", "I63", "I64"],
        prevalence_percent=2.2,
        prevalence_per_100k=2200,
        age_range=(15, 99),
        male_percent=2.5,
        female_percent=1.9,
        year=2017,
        source="ENS 2016-2017"
    ),

    # Problemas osteomusculares
    "osteoarthritis": PrevalenceData(
        name="Artrosis (autoreporte)",
        cie10_codes=["M15", "M16", "M17", "M18", "M19"],
        prevalence_percent=14.4,
        prevalence_per_100k=14400,
        age_range=(15, 99),
        male_percent=9.5,
        female_percent=18.9,
        year=2017,
        source="ENS 2016-2017"
    ),
    "low_back_pain": PrevalenceData(
        name="Dolor lumbar cronico",
        cie10_codes=["M54.5"],
        prevalence_percent=28.6,
        prevalence_per_100k=28600,
        age_range=(15, 99),
        male_percent=24.5,
        female_percent=32.4,
        year=2017,
        source="ENS 2016-2017"
    ),

    # Cancer (incidencias GLOBOCAN Chile 2020)
    "cancer_breast": PrevalenceData(
        name="Cancer de mama (incidencia)",
        cie10_codes=["C50"],
        prevalence_percent=0.0,  # Incidencia, no prevalencia
        prevalence_per_100k=50.5,  # Tasa incidencia por 100k
        age_range=(15, 99),
        male_percent=0.0,
        female_percent=50.5,
        year=2020,
        source="GLOBOCAN 2020",
        notes="Tasa de incidencia ajustada por edad (ASR)"
    ),
    "cancer_prostate": PrevalenceData(
        name="Cancer de prostata (incidencia)",
        cie10_codes=["C61"],
        prevalence_percent=0.0,
        prevalence_per_100k=50.5,
        age_range=(50, 99),
        male_percent=50.5,
        female_percent=0.0,
        year=2020,
        source="GLOBOCAN 2020"
    ),
    "cancer_colorectal": PrevalenceData(
        name="Cancer colorrectal (incidencia)",
        cie10_codes=["C18", "C19", "C20"],
        prevalence_percent=0.0,
        prevalence_per_100k=20.5,
        age_range=(40, 99),
        male_percent=24.0,
        female_percent=17.0,
        year=2020,
        source="GLOBOCAN 2020"
    ),
    "cancer_lung": PrevalenceData(
        name="Cancer de pulmon (incidencia)",
        cie10_codes=["C34"],
        prevalence_percent=0.0,
        prevalence_per_100k=12.5,
        age_range=(40, 99),
        male_percent=16.0,
        female_percent=9.5,
        year=2020,
        source="GLOBOCAN 2020"
    ),
    "cancer_gastric": PrevalenceData(
        name="Cancer gastrico (incidencia)",
        cie10_codes=["C16"],
        prevalence_percent=0.0,
        prevalence_per_100k=15.5,
        age_range=(40, 99),
        male_percent=22.0,
        female_percent=10.0,
        year=2020,
        source="GLOBOCAN 2020"
    ),
}


def get_prevalence(condition: str) -> Optional[PrevalenceData]:
    """
    Obtiene datos de prevalencia por condicion.

    Args:
        condition: Clave de condicion (ej: 'diabetes_type2')

    Returns:
        PrevalenceData o None
    """
    return PREVALENCE_ENS.get(condition)


def validate_prevalence(
    condition: str,
    observed_percent: float,
    tolerance: float = 0.3
) -> Tuple[bool, str]:
    """
    Valida si prevalencia observada esta en rango plausible.

    Args:
        condition: Clave de condicion
        observed_percent: Prevalencia observada (%)
        tolerance: Tolerancia relativa

    Returns:
        Tupla (es_valido, mensaje)
    """
    ref = PREVALENCE_ENS.get(condition)
    if ref is None:
        return True, f"Condicion '{condition}' no tiene referencia"

    expected = ref.prevalence_percent
    lower = expected * (1 - tolerance)
    upper = expected * (1 + tolerance)

    if lower <= observed_percent <= upper:
        return True, (
            f"Prevalencia {observed_percent:.1f}% plausible "
            f"(referencia: {expected:.1f}%, {ref.name})"
        )

    return False, (
        f"Prevalencia {observed_percent:.1f}% fuera de rango. "
        f"Esperado: {expected:.1f}% +/- {tolerance*100:.0f}% "
        f"({ref.name}, {ref.source})"
    )


def get_sex_ratio(condition: str) -> Optional[Tuple[float, float]]:
    """
    Obtiene ratio por sexo.

    Args:
        condition: Clave de condicion

    Returns:
        Tupla (male_percent, female_percent) o None
    """
    ref = PREVALENCE_ENS.get(condition)
    if ref and ref.male_percent is not None and ref.female_percent is not None:
        return (ref.male_percent, ref.female_percent)
    return None


def list_conditions_by_prevalence(min_prevalence: float = 5.0) -> List[str]:
    """
    Lista condiciones ordenadas por prevalencia.

    Args:
        min_prevalence: Prevalencia minima % para incluir

    Returns:
        Lista de claves ordenadas por prevalencia descendente
    """
    filtered = [
        (k, v.prevalence_percent)
        for k, v in PREVALENCE_ENS.items()
        if v.prevalence_percent >= min_prevalence
    ]
    return [k for k, _ in sorted(filtered, key=lambda x: x[1], reverse=True)]
