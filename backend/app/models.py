from typing import List, Optional
from pydantic import BaseModel, Field
from enum import Enum


class ErrorType(str, Enum):
    SPACES = "spaces"
    LOWERCASE = "lowercase"
    TRUNCATED = "truncated"
    INVALID = "invalid"
    PREFIX_SUFFIX = "prefix_suffix"


class ColumnConfig(BaseModel):
    name: str
    type: str
    distribution: Optional[str] = None
    range: Optional[List[int]] = None
    categories: Optional[str] = None
    error_types: Optional[dict] = None


class CorrelationConfig(BaseModel):
    columns: List[str]
    method: str = "deterministic"
    strength: float = 0.3


class SchemaConfig(BaseModel):
    name: str
    description: str
    n_rows: int = 100000
    columns: List[ColumnConfig]
    correlations: Optional[List[CorrelationConfig]] = []
    seed: int = 42


class GenerationRequest(BaseModel):
    schema_name: str = Field(..., description="Nombre del schema YAML")
    rows: Optional[int] = None
    output_format: str = "csv"
    seed: Optional[int] = None


class GenerationResponse(BaseModel):
    job_id: str
    status: str
    message: str
