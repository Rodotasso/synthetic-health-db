import pytest
import pandas as pd
import numpy as np
from app.epidemic_generators import EpidemicGenerator, SurvivalGenerator


class TestEpidemicGenerator:
    """Tests for EpidemicGenerator (SIR/SEIR models)"""

    def test_sir_basic(self):
        """Basic SIR model generation"""
        gen = EpidemicGenerator(seed=42)
        df = gen.sir(n_days=100, population=10000, R0=2.5, gamma=0.1)

        assert len(df) == 100
        assert "day" in df.columns
        assert "susceptible" in df.columns
        assert "infected" in df.columns
        assert "recovered" in df.columns

    def test_sir_conservation(self):
        """Total population should be conserved in SIR"""
        gen = EpidemicGenerator(seed=42)
        population = 10000
        df = gen.sir(n_days=100, population=population, R0=2.5, gamma=0.1)

        total = df["susceptible"] + df["infected"] + df["recovered"]
        # Initial state has population S + 10 initial I, so total is population + 10
        assert np.allclose(total, population + 10, atol=1)

    def test_seir_basic(self):
        """Basic SEIR model generation"""
        gen = EpidemicGenerator(seed=42)
        df = gen.seir(
            n_days=100,
            population=10000,
            R0=3.0,
            sigma=0.2,
            gamma=0.1,
            latent_period=5,
        )

        assert len(df) == 100
        assert "exposed" in df.columns

    def test_seir_conservation(self):
        """Total population should be conserved in SEIR"""
        gen = EpidemicGenerator(seed=42)
        population = 10000
        df = gen.seir(
            n_days=100,
            population=population,
            R0=3.0,
            sigma=0.2,
            gamma=0.1,
            latent_period=5,
        )

        total = (
            df["susceptible"] + df["exposed"] + df["infected"] + df["recovered"]
        )
        # Initial state has population S + 10 initial I, so total is population + 10
        assert np.allclose(total, population + 10, atol=1)

    def test_generate_method(self):
        """Test the unified generate method"""
        gen = EpidemicGenerator(seed=42)

        df_sir = gen.generate(100, model="sir", population=10000)
        assert len(df_sir) == 100
        assert "infected" in df_sir.columns

        df_seir = gen.generate(100, model="seir", population=10000)
        assert "exposed" in df_seir.columns

    def test_invalid_model(self):
        """Should raise error for unknown model"""
        gen = EpidemicGenerator(seed=42)
        with pytest.raises(ValueError):
            gen.generate(100, model="unknown")

    def test_invalid_parameters(self):
        """Should validate parameters"""
        gen = EpidemicGenerator(seed=42)
        with pytest.raises(ValueError):
            gen.sir(n_days=-1, population=10000, R0=2.5, gamma=0.1)
        with pytest.raises(ValueError):
            gen.sir(n_days=100, population=0, R0=2.5, gamma=0.1)

    def test_reproducibility(self):
        """Same seed should produce identical results"""
        gen1 = EpidemicGenerator(seed=42)
        gen2 = EpidemicGenerator(seed=42)

        df1 = gen1.sir(n_days=50, population=10000, R0=2.5, gamma=0.1)
        df2 = gen2.sir(n_days=50, population=10000, R0=2.5, gamma=0.1)

        pd.testing.assert_frame_equal(df1, df2)


class TestSurvivalGenerator:
    """Tests for SurvivalGenerator"""

    def test_basic_generation(self):
        """Basic Kaplan-Meier data generation"""
        gen = SurvivalGenerator(seed=42)
        df = gen.kaplan_meier(n_subjects=100, followup_days=365, event_rate=0.2)

        assert len(df) == 100
        assert "subject_id" in df.columns
        assert "event" in df.columns
        assert "censored" in df.columns
        assert "followup_days" in df.columns

    def test_event_rate(self):
        """Event rate should be approximately as specified"""
        gen = SurvivalGenerator(seed=42)
        df = gen.kaplan_meier(n_subjects=10000, followup_days=365, event_rate=0.3)

        actual_rate = df["event"].mean()
        assert 0.25 < actual_rate < 0.35

    def test_censored_complement(self):
        """Censored should be complement of event"""
        gen = SurvivalGenerator(seed=42)
        df = gen.kaplan_meier(n_subjects=100, followup_days=365, event_rate=0.2)

        assert (df["event"] + df["censored"] == 1).all()

    def test_age_range(self):
        """Ages should be within expected range"""
        gen = SurvivalGenerator(seed=42)
        df = gen.kaplan_meier(n_subjects=1000, followup_days=365, event_rate=0.2)

        assert df["age"].min() >= 18
        assert df["age"].max() <= 85

    def test_invalid_event_rate(self):
        """Should validate event rate is in [0, 1]"""
        gen = SurvivalGenerator(seed=42)
        with pytest.raises(ValueError):
            gen.kaplan_meier(n_subjects=100, followup_days=365, event_rate=1.5)
        with pytest.raises(ValueError):
            gen.kaplan_meier(n_subjects=100, followup_days=365, event_rate=-0.1)

    def test_reproducibility(self):
        """Same seed should produce identical results"""
        gen1 = SurvivalGenerator(seed=42)
        gen2 = SurvivalGenerator(seed=42)

        df1 = gen1.kaplan_meier(n_subjects=50, followup_days=365, event_rate=0.2)
        df2 = gen2.kaplan_meier(n_subjects=50, followup_days=365, event_rate=0.2)

        pd.testing.assert_frame_equal(df1, df2)
