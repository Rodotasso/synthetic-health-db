"""
Tasas de mortalidad de referencia.

Fuentes:
- DEIS Chile: Estadisticas vitales
- OMS: Global Health Observatory
- INE Chile: Anuario de estadisticas vitales
- MINSAL: Indicadores de salud
"""

from dataclasses import dataclass
from typing import Dict, Optional, Tuple


@dataclass
class MortalityRate:
    """Tasa de mortalidad de referencia"""
    name: str
    rate: float          # Tasa por 1000 habitantes/ano (o por 100k para especificas)
    unit: str            # "per_1000" o "per_100k"
    year: int            # Ano de referencia
    population: str      # Poblacion de referencia
    source: str


# Tasas de mortalidad Chile (DEIS 2022)
MORTALITY_RATES: Dict[str, MortalityRate] = {
    # Mortalidad general
    "general_chile": MortalityRate(
        name="Mortalidad general Chile",
        rate=6.5,
        unit="per_1000",
        year=2022,
        population="Poblacion general",
        source="DEIS Chile 2022"
    ),
    "general_oms_world": MortalityRate(
        name="Mortalidad general mundial",
        rate=7.4,
        unit="per_1000",
        year=2021,
        population="Poblacion mundial",
        source="OMS GHO 2021"
    ),

    # Mortalidad infantil
    "infant_chile": MortalityRate(
        name="Mortalidad infantil Chile",
        rate=6.5,
        unit="per_1000",  # Por 1000 nacidos vivos
        year=2022,
        population="Menores de 1 ano",
        source="DEIS Chile 2022"
    ),
    "infant_oms_world": MortalityRate(
        name="Mortalidad infantil mundial",
        rate=28.0,
        unit="per_1000",
        year=2021,
        population="Menores de 1 ano",
        source="OMS GHO 2021"
    ),
    "neonatal_chile": MortalityRate(
        name="Mortalidad neonatal Chile",
        rate=4.8,
        unit="per_1000",
        year=2022,
        population="Menores de 28 dias",
        source="DEIS Chile 2022"
    ),

    # Mortalidad materna
    "maternal_chile": MortalityRate(
        name="Mortalidad materna Chile",
        rate=17.5,
        unit="per_100k",  # Por 100k nacidos vivos
        year=2022,
        population="Mujeres embarazadas",
        source="DEIS Chile 2022"
    ),
    "maternal_oms_world": MortalityRate(
        name="Mortalidad materna mundial",
        rate=223.0,
        unit="per_100k",
        year=2020,
        population="Mujeres embarazadas",
        source="OMS GHO 2020"
    ),

    # Mortalidad por causa - Chile
    "cardiovascular_chile": MortalityRate(
        name="Mortalidad cardiovascular Chile",
        rate=140.0,
        unit="per_100k",
        year=2022,
        population="Poblacion general",
        source="DEIS Chile 2022"
    ),
    "cancer_chile": MortalityRate(
        name="Mortalidad por cancer Chile",
        rate=135.0,
        unit="per_100k",
        year=2022,
        population="Poblacion general",
        source="DEIS Chile 2022"
    ),
    "respiratory_chile": MortalityRate(
        name="Mortalidad respiratoria Chile",
        rate=45.0,
        unit="per_100k",
        year=2022,
        population="Poblacion general",
        source="DEIS Chile 2022"
    ),
    "diabetes_chile": MortalityRate(
        name="Mortalidad por diabetes Chile",
        rate=25.0,
        unit="per_100k",
        year=2022,
        population="Poblacion general",
        source="DEIS Chile 2022"
    ),
    "external_causes_chile": MortalityRate(
        name="Mortalidad causas externas Chile",
        rate=50.0,
        unit="per_100k",
        year=2022,
        population="Poblacion general",
        source="DEIS Chile 2022"
    ),

    # Mortalidad por grupo etario - Chile
    "age_0_4_chile": MortalityRate(
        name="Mortalidad 0-4 anos Chile",
        rate=1.8,
        unit="per_1000",
        year=2022,
        population="0-4 anos",
        source="DEIS Chile 2022"
    ),
    "age_5_14_chile": MortalityRate(
        name="Mortalidad 5-14 anos Chile",
        rate=0.15,
        unit="per_1000",
        year=2022,
        population="5-14 anos",
        source="DEIS Chile 2022"
    ),
    "age_15_44_chile": MortalityRate(
        name="Mortalidad 15-44 anos Chile",
        rate=1.2,
        unit="per_1000",
        year=2022,
        population="15-44 anos",
        source="DEIS Chile 2022"
    ),
    "age_45_64_chile": MortalityRate(
        name="Mortalidad 45-64 anos Chile",
        rate=6.0,
        unit="per_1000",
        year=2022,
        population="45-64 anos",
        source="DEIS Chile 2022"
    ),
    "age_65_plus_chile": MortalityRate(
        name="Mortalidad 65+ anos Chile",
        rate=40.0,
        unit="per_1000",
        year=2022,
        population="65+ anos",
        source="DEIS Chile 2022"
    ),

    # Case Fatality Rates (CFR) para enfermedades
    "cfr_covid19_chile": MortalityRate(
        name="CFR COVID-19 Chile (acumulado)",
        rate=1.8,
        unit="percent",
        year=2023,
        population="Casos confirmados",
        source="MINSAL Chile 2023"
    ),
    "cfr_influenza": MortalityRate(
        name="CFR Influenza estacional",
        rate=0.1,
        unit="percent",
        year=2022,
        population="Casos confirmados",
        source="CDC 2022"
    ),
    "cfr_sarampion": MortalityRate(
        name="CFR Sarampion",
        rate=0.2,
        unit="percent",
        year=2022,
        population="Casos confirmados (paises desarrollados)",
        source="OMS 2022"
    ),
    "cfr_ebola": MortalityRate(
        name="CFR Ebola (brote 2014-2016)",
        rate=40.0,
        unit="percent",
        year=2016,
        population="Casos confirmados",
        source="OMS 2016"
    ),
    "cfr_cholera_tratado": MortalityRate(
        name="CFR Colera (con tratamiento)",
        rate=1.0,
        unit="percent",
        year=2022,
        population="Casos tratados",
        source="OMS 2022"
    ),
    "cfr_cholera_no_tratado": MortalityRate(
        name="CFR Colera (sin tratamiento)",
        rate=50.0,
        unit="percent",
        year=2022,
        population="Casos no tratados",
        source="OMS 2022"
    ),
}


def get_mortality_rate(key: str) -> Optional[MortalityRate]:
    """
    Obtiene tasa de mortalidad por clave.

    Args:
        key: Clave de mortalidad (ej: 'general_chile')

    Returns:
        MortalityRate o None
    """
    return MORTALITY_RATES.get(key)


def validate_mortality_rate(
    observed_rate: float,
    reference_key: str,
    tolerance: float = 0.3
) -> Tuple[bool, str]:
    """
    Valida si tasa observada esta en rango plausible.

    Args:
        observed_rate: Tasa observada
        reference_key: Clave de referencia
        tolerance: Tolerancia relativa (default 30%)

    Returns:
        Tupla (es_valido, mensaje)
    """
    ref = MORTALITY_RATES.get(reference_key)
    if ref is None:
        return True, f"Referencia '{reference_key}' no encontrada"

    lower = ref.rate * (1 - tolerance)
    upper = ref.rate * (1 + tolerance)

    if lower <= observed_rate <= upper:
        return True, (
            f"Tasa {observed_rate:.2f} {ref.unit} plausible "
            f"(referencia: {ref.rate:.2f}, {ref.name})"
        )

    return False, (
        f"Tasa {observed_rate:.2f} {ref.unit} fuera de rango. "
        f"Esperado: {ref.rate:.2f} +/- {tolerance*100:.0f}% "
        f"({ref.name}, {ref.source})"
    )


def get_age_specific_mortality(age_group: str) -> Optional[float]:
    """
    Obtiene mortalidad por grupo etario Chile.

    Args:
        age_group: Grupo etario ('0-4', '5-14', '15-44', '45-64', '65+')

    Returns:
        Tasa por 1000 o None
    """
    mapping = {
        "0-4": "age_0_4_chile",
        "5-14": "age_5_14_chile",
        "15-44": "age_15_44_chile",
        "45-64": "age_45_64_chile",
        "65+": "age_65_plus_chile",
    }
    key = mapping.get(age_group)
    if key:
        rate = MORTALITY_RATES.get(key)
        return rate.rate if rate else None
    return None
