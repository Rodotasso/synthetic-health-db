"""
Presets de parametros epidemiologicos por enfermedad.

Basados en literatura cientifica. Usar con generadores:

    from app.disease_presets import EPIDEMIC_PRESETS, SURVIVAL_PRESETS
    from app.epidemic_generators import EpidemicGenerator

    gen = EpidemicGenerator(seed=42)
    data = gen.sir(n_days=365, **EPIDEMIC_PRESETS["influenza_seasonal"])
"""

from typing import Dict, Any


# =============================================================================
# PRESETS EPIDEMICOS (SIR/SEIR)
# =============================================================================

EPIDEMIC_PRESETS: Dict[str, Dict[str, Any]] = {
    # Respiratorias
    "influenza_seasonal": {
        "R0": 1.3,
        "gamma": 0.2,  # 5 dias infeccioso
        "population": 100000,
        "_source": "Biggerstaff 2014 BMC Inf Dis",
        "_description": "Influenza estacional tipica",
    },
    "influenza_pandemic_1918": {
        "R0": 2.5,
        "gamma": 0.2,
        "population": 100000,
        "_source": "Mills 2004 Nature",
        "_description": "Pandemia 1918 (gripe espanola)",
    },
    "covid19_original": {
        "R0": 2.5,
        "gamma": 0.1,  # 10 dias infeccioso
        "sigma": 0.19,  # 5.2 dias latencia (SEIR)
        "population": 100000,
        "_source": "Li 2020 NEJM",
        "_description": "COVID-19 cepa original Wuhan",
    },
    "covid19_delta": {
        "R0": 6.0,
        "gamma": 0.1,
        "sigma": 0.25,  # 4 dias latencia
        "population": 100000,
        "_source": "Liu & Rocklov 2021 J Travel Med",
        "_description": "COVID-19 variante Delta",
    },
    "covid19_omicron": {
        "R0": 10.0,
        "gamma": 0.143,  # 7 dias infeccioso
        "sigma": 0.33,  # 3 dias latencia
        "population": 100000,
        "_source": "Du 2022 Emerg Inf Dis",
        "_description": "COVID-19 variante Omicron",
    },
    "measles": {
        "R0": 15.0,
        "gamma": 0.125,  # 8 dias infeccioso
        "sigma": 0.1,  # 10 dias latencia
        "population": 100000,
        "_source": "Guerra 2017 Lancet Inf Dis",
        "_description": "Sarampion (altamente contagioso)",
    },
    "pertussis": {
        "R0": 14.0,
        "gamma": 0.048,  # 21 dias infeccioso
        "sigma": 0.1,
        "population": 100000,
        "_source": "Kretzschmar 2010 PLoS Med",
        "_description": "Tos ferina (coqueluche)",
    },
    "varicella": {
        "R0": 11.0,
        "gamma": 0.143,  # 7 dias infeccioso
        "sigma": 0.07,  # 14 dias latencia
        "population": 100000,
        "_source": "Fine 1993 Epidemiol Rev",
        "_description": "Varicela",
    },
    "rubella": {
        "R0": 6.0,
        "gamma": 0.143,
        "sigma": 0.06,  # 17 dias latencia
        "population": 100000,
        "_source": "Anderson & May 1991",
        "_description": "Rubeola",
    },
    "mumps": {
        "R0": 5.5,
        "gamma": 0.125,
        "sigma": 0.06,
        "population": 100000,
        "_source": "Anderson & May 1991",
        "_description": "Paperas",
    },

    # Gastrointestinales
    "norovirus": {
        "R0": 3.0,
        "gamma": 0.333,  # 3 dias infeccioso
        "population": 100000,
        "_source": "Gaythorpe 2018 Euro Surveill",
        "_description": "Norovirus (gastroenteritis viral)",
    },
    "rotavirus": {
        "R0": 5.0,
        "gamma": 0.125,  # 8 dias
        "population": 100000,
        "_source": "Pitzer 2009 PLoS Med",
        "_description": "Rotavirus (diarrea infantil)",
    },
    "cholera": {
        "R0": 2.5,
        "gamma": 0.2,  # 5 dias
        "population": 100000,
        "_source": "Hartley 2006 PLoS Med",
        "_description": "Colera",
    },
    "salmonellosis": {
        "R0": 1.5,
        "gamma": 0.2,
        "population": 100000,
        "_source": "Point-source estimate",
        "_description": "Salmonelosis (brote alimentario)",
    },
    "typhoid": {
        "R0": 3.0,
        "gamma": 0.048,  # 21 dias
        "population": 100000,
        "_source": "Crump & Mintz 2010 WHO Bull",
        "_description": "Fiebre tifoidea",
    },

    # Vectoriales
    "dengue": {
        "R0": 3.0,
        "gamma": 0.2,  # 5 dias
        "population": 100000,
        "_source": "Johansson 2011 PLoS NTD",
        "_description": "Dengue",
    },
    "zika": {
        "R0": 3.0,
        "gamma": 0.143,  # 7 dias
        "population": 100000,
        "_source": "Nishiura 2016 Sci Rep",
        "_description": "Zika",
    },

    # Otras
    "ebola": {
        "R0": 1.9,
        "gamma": 0.1,  # 10 dias
        "population": 100000,
        "_source": "WHO Ebola Response Team 2014",
        "_description": "Ebola",
    },
    "sars_2003": {
        "R0": 3.0,
        "gamma": 0.1,
        "sigma": 0.2,
        "population": 100000,
        "_source": "Lipsitch 2003 Science",
        "_description": "SARS 2003",
    },
}


# =============================================================================
# PRESETS SUPERVIVENCIA (Cox/Kaplan-Meier)
# =============================================================================

SURVIVAL_PRESETS: Dict[str, Dict[str, Any]] = {
    "breast_cancer": {
        "baseline_hazard": 0.02,
        "hazard_ratios": {
            "stage_II": 1.8,
            "stage_III": 2.5,
            "stage_IV": 4.0,
        },
        "censoring_rate": 0.25,
        "_5y_survival": 90.3,
        "_source": "SEER 2014-2020",
    },
    "lung_cancer_nsclc": {
        "baseline_hazard": 0.15,
        "hazard_ratios": {
            "stage_II": 1.5,
            "stage_III": 2.5,
            "stage_IV": 5.0,
        },
        "censoring_rate": 0.20,
        "_5y_survival": 25.0,
        "_source": "SEER 2014-2020",
    },
    "colorectal_cancer": {
        "baseline_hazard": 0.05,
        "hazard_ratios": {
            "stage_II": 1.5,
            "stage_III": 2.2,
            "stage_IV": 6.0,
        },
        "censoring_rate": 0.25,
        "_5y_survival": 65.0,
        "_source": "SEER 2014-2020",
    },
    "prostate_cancer": {
        "baseline_hazard": 0.005,
        "hazard_ratios": {
            "stage_II": 1.2,
            "stage_III": 1.5,
            "stage_IV": 10.0,
        },
        "censoring_rate": 0.30,
        "_5y_survival": 97.5,
        "_source": "SEER 2014-2020",
    },
    "pancreatic_cancer": {
        "baseline_hazard": 0.25,
        "hazard_ratios": {
            "stage_II": 1.3,
            "stage_III": 2.0,
            "stage_IV": 3.5,
        },
        "censoring_rate": 0.15,
        "_5y_survival": 11.0,
        "_source": "SEER 2014-2020",
    },
    "gastric_cancer": {
        "baseline_hazard": 0.12,
        "hazard_ratios": {
            "stage_II": 1.6,
            "stage_III": 3.0,
            "stage_IV": 5.5,
        },
        "censoring_rate": 0.20,
        "_5y_survival": 32.0,
        "_source": "SEER 2014-2020",
    },
    "melanoma": {
        "baseline_hazard": 0.015,
        "hazard_ratios": {
            "stage_II": 2.0,
            "stage_III": 4.0,
            "stage_IV": 8.0,
        },
        "censoring_rate": 0.25,
        "_5y_survival": 93.0,
        "_source": "SEER 2014-2020",
    },
    "cardiovascular_general": {
        "baseline_hazard": 0.03,
        "hazard_ratios": {
            "diabetes": 1.8,
            "hypertension": 1.5,
            "smoking": 2.0,
            "high_cholesterol": 1.3,
        },
        "censoring_rate": 0.30,
        "_source": "Framingham Heart Study",
    },
}


# =============================================================================
# PRESETS REGRESION LOGISTICA
# =============================================================================

LOGISTIC_PRESETS: Dict[str, Dict[str, Any]] = {
    "cardiovascular_framingham": {
        "coeffs": {
            "age": 0.05,
            "sex_M": 0.3,
            "bp": 0.02,
            "chol": 0.01,
            "smoking": 0.5,
            "diabetes": 0.4,
        },
        "intercept": -8.0,
        "_source": "Framingham Heart Study",
        "_description": "Riesgo cardiovascular a 10 anos",
    },
    "diabetes_risk": {
        "coeffs": {
            "age": 0.04,
            "bmi": 0.08,
            "family_history": 0.6,
            "hypertension": 0.3,
        },
        "intercept": -6.0,
        "_source": "Finnish Diabetes Risk Score adapted",
        "_description": "Riesgo de diabetes tipo 2",
    },
}


# =============================================================================
# HELPERS
# =============================================================================

def get_epidemic_preset(disease: str) -> Dict[str, Any]:
    """
    Obtiene preset epidemico sin metadatos internos.

    Args:
        disease: Nombre de enfermedad

    Returns:
        Dict con parametros listos para usar en generador
    """
    if disease not in EPIDEMIC_PRESETS:
        available = ", ".join(EPIDEMIC_PRESETS.keys())
        raise ValueError(f"Enfermedad '{disease}' no encontrada. Disponibles: {available}")

    preset = EPIDEMIC_PRESETS[disease].copy()
    # Remover metadatos
    return {k: v for k, v in preset.items() if not k.startswith("_")}


def get_survival_preset(cancer_type: str) -> Dict[str, Any]:
    """
    Obtiene preset de supervivencia sin metadatos internos.

    Args:
        cancer_type: Tipo de cancer

    Returns:
        Dict con parametros listos para usar
    """
    if cancer_type not in SURVIVAL_PRESETS:
        available = ", ".join(SURVIVAL_PRESETS.keys())
        raise ValueError(f"Tipo '{cancer_type}' no encontrado. Disponibles: {available}")

    preset = SURVIVAL_PRESETS[cancer_type].copy()
    return {k: v for k, v in preset.items() if not k.startswith("_")}


def list_epidemic_diseases() -> list:
    """Lista enfermedades con presets epidemicos"""
    return list(EPIDEMIC_PRESETS.keys())


def list_survival_types() -> list:
    """Lista tipos de cancer/condiciones con presets de supervivencia"""
    return list(SURVIVAL_PRESETS.keys())
