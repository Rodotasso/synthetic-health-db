import pytest
import pandas as pd
import numpy as np
from app.generators import CIE10Generator, DemographicsGenerator
from app.base_generator import BaseGenerator


class TestBaseGenerator:
    """Tests for BaseGenerator abstract class"""

    def test_rng_is_local(self):
        """Verify RNG is instance-specific, not global"""
        gen1 = CIE10Generator(seed=42)
        gen2 = CIE10Generator(seed=42)

        df1 = gen1.generate(10)
        df2 = gen2.generate(10)

        # Same seed should produce same results
        pd.testing.assert_frame_equal(df1, df2)

    def test_different_seeds_different_results(self):
        """Different seeds should produce different results"""
        gen1 = CIE10Generator(seed=42)
        gen2 = CIE10Generator(seed=123)

        df1 = gen1.generate(100)
        df2 = gen2.generate(100)

        # Results should differ
        assert not df1["codigo"].equals(df2["codigo"])


class TestCIE10Generator:
    """Tests for CIE10Generator"""

    def test_basic_generation(self):
        gen = CIE10Generator(seed=42)
        df = gen.generate(100)
        assert len(df) == 100
        assert "id" in df.columns
        assert "codigo" in df.columns

    def test_with_errors(self):
        gen = CIE10Generator(seed=42)
        df = gen.generate(100, {"spaces": 0.5})
        assert len(df) == 100
        assert df["codigo"].str.contains(" ").any()

    def test_reproducibility(self):
        """Same seed should produce identical results"""
        gen1 = CIE10Generator(seed=42)
        gen2 = CIE10Generator(seed=42)

        df1 = gen1.generate(50)
        df2 = gen2.generate(50)

        pd.testing.assert_frame_equal(df1, df2)

    def test_invalid_n(self):
        """Should raise error for invalid n"""
        gen = CIE10Generator(seed=42)
        with pytest.raises(ValueError):
            gen.generate(0)
        with pytest.raises(ValueError):
            gen.generate(-5)

    def test_n_equals_one(self):
        """Edge case: n=1"""
        gen = CIE10Generator(seed=42)
        df = gen.generate(1)
        assert len(df) == 1

    def test_large_n(self):
        """Large generation should work"""
        gen = CIE10Generator(seed=42)
        df = gen.generate(10000)
        assert len(df) == 10000


class TestDemographicsGenerator:
    """Tests for DemographicsGenerator"""

    def test_basic_generation(self):
        gen = DemographicsGenerator(seed=42)
        df = gen.generate(1000)
        assert len(df) == 1000
        assert "edad" in df.columns
        assert "genero" in df.columns
        assert "region" in df.columns

    def test_age_range(self):
        """Ages should be within expected range"""
        gen = DemographicsGenerator(seed=42)
        df = gen.generate(1000)
        assert df["edad"].min() >= 5
        assert df["edad"].max() <= 95

    def test_gender_distribution(self):
        """Gender should be roughly 50/50"""
        gen = DemographicsGenerator(seed=42)
        df = gen.generate(10000)
        male_pct = (df["genero"] == "M").mean()
        assert 0.45 < male_pct < 0.55

    def test_reproducibility(self):
        """Same seed should produce identical results"""
        gen1 = DemographicsGenerator(seed=42)
        gen2 = DemographicsGenerator(seed=42)

        df1 = gen1.generate(100)
        df2 = gen2.generate(100)

        pd.testing.assert_frame_equal(df1, df2)

    def test_invalid_n(self):
        """Should raise error for invalid n"""
        gen = DemographicsGenerator(seed=42)
        with pytest.raises(ValueError):
            gen.generate(0)

    def test_regions(self):
        """Should have valid region codes"""
        gen = DemographicsGenerator(seed=42)
        df = gen.generate(1000)
        valid_regions = {f"R{i:02d}" for i in range(1, 16)}
        assert set(df["region"].unique()).issubset(valid_regions)
