import click
from pathlib import Path
import yaml
from app.models import SchemaConfig


@click.group()
def cli():
    """Synthetic Health DB CLI"""
    pass


@cli.command()
@click.argument("schema_name")
@click.option("--rows", "-n", default=100000, help="Número de filas")
@click.option("--output", "-o", default=None, help="Archivo de salida")
def generate(schema_name: str, rows: int, output: str):
    """Genera base sintética desde schema"""
    from app.generators import CIE10Generator, DemographicsGenerator

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
    else:
        df = generator.generate(n_rows)

    if not output:
        output = f"data/output/{schema_name}.csv"

    output_path = Path(output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(output_path, index=False)

    click.echo(f"✓ Generado: {n_rows} filas en {output_path}")


if __name__ == "__main__":
    cli()
