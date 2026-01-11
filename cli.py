import click
from pathlib import Path
import yaml
import sys

sys.path.insert(0, str(Path(__file__).parent / "backend"))
from app.models import SchemaConfig
from app.generators import (
    CIE10Generator,
    DemographicsGenerator,
    EpidemicGenerator,
    SurvivalGenerator,
    RegressionGenerator
)
    """Synthetic Health DB CLI"""
    pass


@cli.command()
@click.argument("schema_name")
@click.option("--rows", "-n", default=100000, help="Número de filas")
@click.option("--output", "-o", default=None, help="Archivo de salida")
def generate(schema_name: str, rows: int, output: str):
    """Genera base sintética desde schema"""
    from app.generators import (
        CIE10Generator,
        DemographicsGenerator,
        EpidemicGenerator,
        SurvivalGenerator,
    )

    schema_path = Path(f"schemas/{schema_name}.yaml")
    if not schema_path.exists():
        click.echo(f"✗ Schema no encontrado: {schema_path}")
        return

    with open(schema_path) as f:
        config_data = yaml.safe_load(f)
        config = SchemaConfig(**config_data)

    n_rows = rows or config.n_rows
    seed = config.seed

    generators = {"cie10": CIE10Generator, "demographics": DemographicsGenerator}

    generator_class = generators.get(schema_name)
    if not generator_class:
        click.echo(f"✗ Schema no soportado: {schema_name}")
        return

    generator = generator_class(seed=seed)

    if schema_name == "cie10":
        df = generator.generate(n_rows, config.columns[0].error_types)
    elif schema_name.startswith("epidemic"):
        model_type = schema_name.split("_")[1]
        params = config.get("parameters", {})
        if model_type == "sir":
            df = generator.sir(
                n_days=n_rows,
                population=params.get("population", 100000),
                R0=params.get("R0", 2.5),
                gamma=params.get("gamma", 0.1),
            )
        elif model_type == "seir":
            df = generator.seir(
                n_days=n_days,
                population=params.get("population", 100000),
                R0=params.get("R0", 3.0),
                sigma=params.get("sigma", 0.2),
                gamma=params.get("gamma", 0.1),
                latent_period=params.get("latent_period", 5),
            )
    elif schema_name == "survival":
        params = config.get("parameters", {})
        df = generator.kaplan_meier(
            n_subjects=n_rows,
            followup_days=params.get("max_followup", 1095),
            event_rate=params.get("event_rate", 0.15),
        )
    else:
        df = generator.generate(n_rows)

    if not output:
        output = f"data/output/{schema_name}.csv"

    output_path = Path(output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(output_path, index=False)

    click.echo(f"[OK] Generado: {n_rows} filas en {output_path}")


if __name__ == "__main__":
    cli()
