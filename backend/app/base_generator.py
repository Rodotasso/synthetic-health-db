"""
Clase base para generadores de datos sinteticos.

Provee:
- RNG local thread-safe (np.random.default_rng)
- Validadores comunes
- Interfaz abstracta
"""

from abc import ABC, abstractmethod
from typing import Any
import numpy as np
import pandas as pd


class BaseGenerator(ABC):
    """Clase base abstracta para todos los generadores"""

    def __init__(self, seed: int = 42):
        """
        Inicializa generador con RNG local.

        Args:
            seed: Semilla para reproducibilidad
        """
        self.rng = np.random.default_rng(seed)
        self.seed = seed

    def _validate_positive_int(self, value: int, name: str) -> None:
        """Valida que valor sea entero positivo"""
        if not isinstance(value, int) or value <= 0:
            raise ValueError(f"{name} debe ser entero positivo, recibido: {value}")

    def _validate_probability(self, value: float, name: str) -> None:
        """Valida que valor sea probabilidad valida [0, 1]"""
        if not isinstance(value, (int, float)) or not 0 <= value <= 1:
            raise ValueError(f"{name} debe estar en [0, 1], recibido: {value}")

    def _validate_positive_float(self, value: float, name: str) -> None:
        """Valida que valor sea float positivo"""
        if not isinstance(value, (int, float)) or value <= 0:
            raise ValueError(f"{name} debe ser positivo, recibido: {value}")

    def _validate_range(self, value: tuple, name: str) -> None:
        """Valida que tupla sea rango valido (min, max)"""
        if not isinstance(value, tuple) or len(value) != 2:
            raise ValueError(f"{name} debe ser tupla (min, max)")
        if value[0] > value[1]:
            raise ValueError(f"{name} min > max: {value}")

    @abstractmethod
    def generate(self, n: int, **kwargs) -> pd.DataFrame:
        """
        Genera n registros.

        Args:
            n: Numero de registros a generar
            **kwargs: Parametros adicionales

        Returns:
            DataFrame con datos generados
        """
        pass
