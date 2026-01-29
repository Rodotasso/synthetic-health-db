"""
Numero reproductivo basico (R0) por enfermedad.

R0 representa el numero promedio de infecciones secundarias causadas
por un individuo infectado en una poblacion completamente susceptible.

Fuentes principales:
- CDC Epidemic Parameters Quick Reference
- OMS Disease Outbreak News
- Guerra et al. (2017) Lancet Inf Dis - Measles
- Li et al. (2020) NEJM - COVID-19 Original
- Biggerstaff et al. (2014) BMC Inf Dis - Influenza
- Fine (1993) Epidemiol Rev - Historical diseases
"""

from dataclasses import dataclass
from typing import Dict, Optional, Tuple


@dataclass
class DiseaseR0:
    """Parametros epidemiologicos de referencia"""
    name: str
    r0_min: float
    r0_max: float
    r0_typical: float
    serial_interval_days: float  # Intervalo serial medio
    incubation_days: float       # Periodo incubacion medio
    infectious_days: float       # Periodo infeccioso medio
    gamma: float                 # Tasa de recuperacion (1/infectious_days)
    source: str


# R0 de referencia por enfermedad (CDC, OMS, literatura)
R0_REFERENCE: Dict[str, DiseaseR0] = {
    # Enfermedades respiratorias
    "influenza_seasonal": DiseaseR0(
        name="Influenza estacional",
        r0_min=1.2,
        r0_max=1.8,
        r0_typical=1.3,
        serial_interval_days=3.0,
        incubation_days=2.0,
        infectious_days=5.0,
        gamma=0.2,
        source="Biggerstaff et al. BMC Inf Dis 2014"
    ),
    "influenza_pandemic_1918": DiseaseR0(
        name="Influenza pandemica 1918",
        r0_min=2.0,
        r0_max=3.0,
        r0_typical=2.5,
        serial_interval_days=3.0,
        incubation_days=2.0,
        infectious_days=5.0,
        gamma=0.2,
        source="Mills et al. Nature 2004"
    ),
    "covid19_original": DiseaseR0(
        name="COVID-19 (cepa original)",
        r0_min=2.0,
        r0_max=3.5,
        r0_typical=2.5,
        serial_interval_days=5.0,
        incubation_days=5.2,
        infectious_days=10.0,
        gamma=0.1,
        source="Li et al. NEJM 2020"
    ),
    "covid19_delta": DiseaseR0(
        name="COVID-19 (Delta)",
        r0_min=5.0,
        r0_max=8.0,
        r0_typical=6.0,
        serial_interval_days=4.0,
        incubation_days=4.0,
        infectious_days=10.0,
        gamma=0.1,
        source="Liu & Rocklov. J Travel Med 2021"
    ),
    "covid19_omicron": DiseaseR0(
        name="COVID-19 (Omicron)",
        r0_min=8.0,
        r0_max=15.0,
        r0_typical=10.0,
        serial_interval_days=3.0,
        incubation_days=3.0,
        infectious_days=7.0,
        gamma=0.143,
        source="Du et al. Emerg Inf Dis 2022"
    ),
    "measles": DiseaseR0(
        name="Sarampion",
        r0_min=12.0,
        r0_max=18.0,
        r0_typical=15.0,
        serial_interval_days=11.0,
        incubation_days=10.0,
        infectious_days=8.0,
        gamma=0.125,
        source="Guerra et al. Lancet Inf Dis 2017"
    ),
    "rubella": DiseaseR0(
        name="Rubeola",
        r0_min=5.0,
        r0_max=7.0,
        r0_typical=6.0,
        serial_interval_days=18.0,
        incubation_days=17.0,
        infectious_days=7.0,
        gamma=0.143,
        source="Anderson & May 1991"
    ),
    "pertussis": DiseaseR0(
        name="Tos ferina",
        r0_min=12.0,
        r0_max=17.0,
        r0_typical=14.0,
        serial_interval_days=22.0,
        incubation_days=10.0,
        infectious_days=21.0,
        gamma=0.048,
        source="Kretzschmar et al. PLoS Med 2010"
    ),
    "mumps": DiseaseR0(
        name="Paperas",
        r0_min=4.0,
        r0_max=7.0,
        r0_typical=5.5,
        serial_interval_days=18.0,
        incubation_days=17.0,
        infectious_days=8.0,
        gamma=0.125,
        source="Anderson & May 1991"
    ),
    "varicella": DiseaseR0(
        name="Varicela",
        r0_min=10.0,
        r0_max=12.0,
        r0_typical=11.0,
        serial_interval_days=14.0,
        incubation_days=14.0,
        infectious_days=7.0,
        gamma=0.143,
        source="Fine 1993"
    ),
    "sars": DiseaseR0(
        name="SARS 2003",
        r0_min=2.0,
        r0_max=4.0,
        r0_typical=3.0,
        serial_interval_days=8.0,
        incubation_days=5.0,
        infectious_days=10.0,
        gamma=0.1,
        source="Lipsitch et al. Science 2003"
    ),
    "mers": DiseaseR0(
        name="MERS",
        r0_min=0.5,
        r0_max=1.3,
        r0_typical=0.9,
        serial_interval_days=8.0,
        incubation_days=5.5,
        infectious_days=10.0,
        gamma=0.1,
        source="Breban et al. Lancet 2013"
    ),

    # Enfermedades transmitidas por vector
    "dengue": DiseaseR0(
        name="Dengue",
        r0_min=1.5,
        r0_max=6.0,
        r0_typical=3.0,
        serial_interval_days=15.0,
        incubation_days=6.0,
        infectious_days=5.0,
        gamma=0.2,
        source="Johansson et al. PLoS NTD 2011"
    ),
    "zika": DiseaseR0(
        name="Zika",
        r0_min=2.0,
        r0_max=4.0,
        r0_typical=3.0,
        serial_interval_days=14.0,
        incubation_days=6.0,
        infectious_days=7.0,
        gamma=0.143,
        source="Nishiura et al. Sci Rep 2016"
    ),
    "chikungunya": DiseaseR0(
        name="Chikungunya",
        r0_min=2.0,
        r0_max=6.0,
        r0_typical=4.0,
        serial_interval_days=14.0,
        incubation_days=4.0,
        infectious_days=6.0,
        gamma=0.167,
        source="Yakob & Clements. Trans R Soc Trop Med 2013"
    ),
    "malaria": DiseaseR0(
        name="Malaria (P. falciparum)",
        r0_min=1.0,
        r0_max=100.0,
        r0_typical=10.0,  # Alta variabilidad geografica
        serial_interval_days=30.0,
        incubation_days=12.0,
        infectious_days=200.0,
        gamma=0.005,
        source="Smith et al. PLoS Med 2007"
    ),

    # Enfermedades gastrointestinales
    "cholera": DiseaseR0(
        name="Colera",
        r0_min=1.5,
        r0_max=5.0,
        r0_typical=2.5,
        serial_interval_days=5.0,
        incubation_days=2.0,
        infectious_days=5.0,
        gamma=0.2,
        source="Hartley et al. PLoS Med 2006"
    ),
    "norovirus": DiseaseR0(
        name="Norovirus",
        r0_min=2.0,
        r0_max=4.0,
        r0_typical=3.0,
        serial_interval_days=2.0,
        incubation_days=1.5,
        infectious_days=3.0,
        gamma=0.333,
        source="Gaythorpe et al. Euro Surveill 2018"
    ),
    "rotavirus": DiseaseR0(
        name="Rotavirus",
        r0_min=3.0,
        r0_max=8.0,
        r0_typical=5.0,
        serial_interval_days=3.0,
        incubation_days=2.0,
        infectious_days=8.0,
        gamma=0.125,
        source="Pitzer et al. PLoS Med 2009"
    ),
    "typhoid": DiseaseR0(
        name="Fiebre tifoidea",
        r0_min=2.0,
        r0_max=4.0,
        r0_typical=3.0,
        serial_interval_days=14.0,
        incubation_days=10.0,
        infectious_days=21.0,
        gamma=0.048,
        source="Crump & Mintz. WHO Bull 2010"
    ),
    "salmonellosis": DiseaseR0(
        name="Salmonelosis (brote)",
        r0_min=1.0,
        r0_max=3.0,
        r0_typical=1.5,
        serial_interval_days=3.0,
        incubation_days=1.0,
        infectious_days=5.0,
        gamma=0.2,
        source="Point-source estimate"
    ),

    # Enfermedades de transmision sexual
    "hiv": DiseaseR0(
        name="VIH",
        r0_min=2.0,
        r0_max=5.0,
        r0_typical=3.5,
        serial_interval_days=3650.0,  # 10 anos sin tratamiento
        incubation_days=21.0,
        infectious_days=3650.0,
        gamma=0.00027,
        source="Hollingsworth et al. J Inf Dis 2008"
    ),
    "syphilis": DiseaseR0(
        name="Sifilis",
        r0_min=1.5,
        r0_max=4.0,
        r0_typical=2.5,
        serial_interval_days=90.0,
        incubation_days=21.0,
        infectious_days=365.0,
        gamma=0.003,
        source="Garnett et al. Sex Trans Inf 1997"
    ),
    "gonorrhea": DiseaseR0(
        name="Gonorrea",
        r0_min=1.5,
        r0_max=3.0,
        r0_typical=2.0,
        serial_interval_days=30.0,
        incubation_days=5.0,
        infectious_days=180.0,
        gamma=0.0056,
        source="Garnett et al. Sex Trans Inf 1999"
    ),

    # Enfermedades historicas/erradicadas
    "smallpox": DiseaseR0(
        name="Viruela",
        r0_min=5.0,
        r0_max=7.0,
        r0_typical=6.0,
        serial_interval_days=17.0,
        incubation_days=12.0,
        infectious_days=14.0,
        gamma=0.071,
        source="Gani & Leach. Nature 2001"
    ),
    "polio": DiseaseR0(
        name="Poliomielitis",
        r0_min=5.0,
        r0_max=7.0,
        r0_typical=6.0,
        serial_interval_days=14.0,
        incubation_days=10.0,
        infectious_days=14.0,
        gamma=0.071,
        source="Fine 1993"
    ),
    "diphtheria": DiseaseR0(
        name="Difteria",
        r0_min=4.0,
        r0_max=6.0,
        r0_typical=5.0,
        serial_interval_days=5.0,
        incubation_days=3.0,
        infectious_days=14.0,
        gamma=0.071,
        source="Anderson & May 1991"
    ),

    # Ebola y otras fiebres hemorragicas
    "ebola": DiseaseR0(
        name="Ebola",
        r0_min=1.5,
        r0_max=2.5,
        r0_typical=1.9,
        serial_interval_days=15.0,
        incubation_days=10.0,
        infectious_days=10.0,
        gamma=0.1,
        source="WHO Ebola Response Team 2014"
    ),
}


def get_r0_range(disease: str) -> Optional[Tuple[float, float]]:
    """
    Obtiene rango R0 para enfermedad.

    Args:
        disease: Clave de enfermedad (ej: 'influenza_seasonal')

    Returns:
        Tupla (r0_min, r0_max) o None si no existe
    """
    if disease in R0_REFERENCE:
        ref = R0_REFERENCE[disease]
        return (ref.r0_min, ref.r0_max)
    return None


def get_disease_params(disease: str) -> Optional[DiseaseR0]:
    """
    Obtiene parametros epidemiologicos completos.

    Args:
        disease: Clave de enfermedad

    Returns:
        DiseaseR0 o None si no existe
    """
    return R0_REFERENCE.get(disease)


def validate_r0(disease: str, r0: float) -> Tuple[bool, str]:
    """
    Valida si R0 esta en rango esperado para enfermedad.

    Args:
        disease: Clave de enfermedad
        r0: Valor R0 a validar

    Returns:
        Tupla (es_valido, mensaje)
    """
    ref = R0_REFERENCE.get(disease)
    if ref is None:
        return True, f"Enfermedad '{disease}' no tiene referencia, R0={r0} aceptado"

    if ref.r0_min <= r0 <= ref.r0_max:
        return True, f"R0={r0} dentro de rango [{ref.r0_min}, {ref.r0_max}] para {ref.name}"

    return False, (
        f"R0={r0} fuera de rango esperado [{ref.r0_min}, {ref.r0_max}] "
        f"para {ref.name} ({ref.source})"
    )


def validate_gamma(disease: str, gamma: float, tolerance: float = 0.5) -> Tuple[bool, str]:
    """
    Valida si gamma (tasa recuperacion) es plausible.

    Args:
        disease: Clave de enfermedad
        gamma: Tasa de recuperacion (1/periodo_infeccioso)
        tolerance: Tolerancia relativa (default 50%)

    Returns:
        Tupla (es_valido, mensaje)
    """
    ref = R0_REFERENCE.get(disease)
    if ref is None:
        return True, f"Enfermedad '{disease}' no tiene referencia"

    expected_gamma = ref.gamma
    lower = expected_gamma * (1 - tolerance)
    upper = expected_gamma * (1 + tolerance)

    if lower <= gamma <= upper:
        return True, (
            f"gamma={gamma} plausible (esperado ~{expected_gamma:.3f}, "
            f"periodo infeccioso ~{1/gamma:.1f} dias)"
        )

    expected_days = 1 / expected_gamma if expected_gamma > 0 else float("inf")
    actual_days = 1 / gamma if gamma > 0 else float("inf")

    return False, (
        f"gamma={gamma} implausible. "
        f"Esperado ~{expected_gamma:.3f} ({expected_days:.1f} dias infeccioso), "
        f"recibido implica {actual_days:.1f} dias"
    )
