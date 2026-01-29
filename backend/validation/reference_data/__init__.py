"""
Datos de referencia de literatura epidemiologica.

Fuentes:
- OMS/CDC: R0 por enfermedad
- DEIS Chile: Mortalidad general, infantil, materna
- ENS 2016-2017: Prevalencias HTA, DM, obesidad
- SEER/GLOBOCAN: Supervivencia cancer
- INE 2023: Piramide poblacional Chile
- Framingham/SCORE2: Coeficientes riesgo CV
"""

from .r0_by_disease import R0_REFERENCE, get_r0_range
from .mortality_rates import MORTALITY_RATES, get_mortality_rate
from .prevalence_chile import PREVALENCE_ENS, get_prevalence
from .survival_benchmarks import SURVIVAL_BENCHMARKS, get_survival_benchmark

__all__ = [
    "R0_REFERENCE",
    "get_r0_range",
    "MORTALITY_RATES",
    "get_mortality_rate",
    "PREVALENCE_ENS",
    "get_prevalence",
    "SURVIVAL_BENCHMARKS",
    "get_survival_benchmark",
]
