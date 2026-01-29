"""
Modulo de validacion de plausibilidad para datos sinteticos.

Provee:
- Datos de referencia de literatura (R0, mortalidad, prevalencias)
- Validadores para comparar datos generados vs referencias
- Reports de discrepancias
"""

from .validators.base_validator import BaseValidator, ValidationResult, ValidationSeverity
from .validators.epidemic_validator import EpidemicValidator
from .validators.survival_validator import SurvivalValidator
from .validators.demographic_validator import DemographicValidator

__all__ = [
    "BaseValidator",
    "ValidationResult",
    "ValidationSeverity",
    "EpidemicValidator",
    "SurvivalValidator",
    "DemographicValidator",
]
