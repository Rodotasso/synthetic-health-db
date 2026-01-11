import pytest
import pandas as pd
from app.generators import CIE10Generator, DemographicsGenerator


def test_cie10_generator():
    gen = CIE10Generator(seed=42)
    df = gen.generate(100)
    assert len(df) == 100
    assert "id" in df.columns
    assert "codigo" in df.columns


def test_cie10_with_errors():
    gen = CIE10Generator(seed=42)
    df = gen.generate(100, {"spaces": 0.5})
    assert len(df) == 100
    assert df["codigo"].str.contains(" ").any()


def test_demographics_generator():
    gen = DemographicsGenerator(seed=42)
    df = gen.generate(1000)
    assert len(df) == 1000
    assert "edad" in df.columns
    assert "genero" in df.columns
    assert df["edad"].between(5, 95).all()
