from fastapi import APIRouter, HTTPException
from typing import Optional
import yaml
from pathlib import Path

from .models import GenerationRequest, GenerationResponse, SchemaConfig
from .generators import CIE10Generator, DemographicsGenerator

router = APIRouter()
SCHEMAS_DIR = Path("schemas")

GENERATORS = {"cie10": CIE10Generator, "demographics": DemographicsGenerator}


@router.get("/schemas")
async def list_schemas():
    """Lista schemas disponibles"""
    schemas = []
    for yaml_file in SCHEMAS_DIR.glob("*.yaml"):
        with open(yaml_file) as f:
            config = yaml.safe_load(f)
            schemas.append({"name": yaml_file.stem, "config": config})
    return schemas


@router.post("/generate")
async def generate_data(request: GenerationRequest):
    """Genera base sintética"""
    schema_path = SCHEMAS_DIR / f"{request.schema_name}.yaml"

    if not schema_path.exists():
        raise HTTPException(status_code=404, detail="Schema no encontrado")

    with open(schema_path) as f:
        config_data = yaml.safe_load(f)
        config = SchemaConfig(**config_data)

    n_rows = request.rows or config.n_rows
    seed = request.seed or config.seed

    generator_class = GENERATORS.get(request.schema_name)
    if not generator_class:
        raise HTTPException(status_code=400, detail="Schema no soportado")

    generator = generator_class(seed=seed)

    if request.schema_name == "cie10":
        df = generator.generate(n_rows, config.columns[0].error_types)
    else:
        df = generator.generate(n_rows)

    output_path = f"data/output/{request.schema_name}.csv"
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(output_path, index=False)

    return GenerationResponse(
        job_id=f"{request.schema_name}_{n_rows}_{seed}",
        status="completed",
        message=f"Generado {n_rows} filas en {output_path}",
    )
