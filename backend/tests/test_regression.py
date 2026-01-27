import pytest
import pandas as pd
import numpy as np
from app.regression_generator import RegressionGenerator


class TestRegressionGenerator:
    """Tests for RegressionGenerator"""

    def test_linear_regression(self):
        """Test linear regression data generation"""
        gen = RegressionGenerator(seed=42)
        df = gen._linear(n=100, coeffs=[1.5, -2.0], intercept=0.5, noise=0.1)

        assert len(df) == 100
        assert "x1" in df.columns
        assert "x2" in df.columns
        assert "y" in df.columns

    def test_logistic_regression(self):
        """Test logistic regression data generation"""
        gen = RegressionGenerator(seed=42)
        df = gen._logistic(
            n=1000,
            coeffs={"age": 0.05, "sex_M": 0.3, "bp": 0.02, "chol": 0.01},
            intercept=-8.0,
        )

        assert len(df) == 1000
        assert "age" in df.columns
        assert "sex" in df.columns
        assert "disease" in df.columns
        assert set(df["disease"].unique()).issubset({0, 1})

    def test_poisson_regression(self):
        """Test Poisson regression data generation"""
        gen = RegressionGenerator(seed=42)
        df = gen._poisson(n=100, rate_lambda=5.0, overdispersion=1.0)

        assert len(df) == 100
        assert "exposure_years" in df.columns
        assert "cancer_incidence" in df.columns
        assert (df["cancer_incidence"] >= 0).all()  # Count data

    def test_cox_regression(self):
        """Test Cox proportional hazards data generation"""
        gen = RegressionGenerator(seed=42)
        df = gen._cox_ph(
            n=100, hazard_ratios={}, baseline_hazard=0.01, censoring_rate=0.3
        )

        assert len(df) == 100
        assert "subject_id" in df.columns
        assert "age" in df.columns
        assert "treatment" in df.columns
        assert "stage" in df.columns
        assert "event" in df.columns

    def test_multiple_regression(self):
        """Test multiple regression with interactions"""
        gen = RegressionGenerator(seed=42)
        df = gen._multiple(n=100, coeffs={}, include_interactions=True, intercept=5.0)

        assert len(df) == 100
        assert "x1" in df.columns
        assert "x1_x2" in df.columns  # Interaction term
        assert "y" in df.columns

    def test_generate_method(self):
        """Test unified generate method"""
        gen = RegressionGenerator(seed=42)

        df_log = gen.generate(100, model="logistic")
        assert "disease" in df_log.columns

        df_cox = gen.generate(100, model="cox")
        assert "event" in df_cox.columns

    def test_invalid_model(self):
        """Should raise error for unknown model"""
        gen = RegressionGenerator(seed=42)
        with pytest.raises(ValueError):
            gen.generate(100, model="unknown_model")

    def test_invalid_n(self):
        """Should validate n parameter"""
        gen = RegressionGenerator(seed=42)
        with pytest.raises(ValueError):
            gen.generate(0, model="logistic")

    def test_reproducibility(self):
        """Same seed should produce identical results"""
        gen1 = RegressionGenerator(seed=42)
        gen2 = RegressionGenerator(seed=42)

        df1 = gen1.generate(50, model="logistic")
        df2 = gen2.generate(50, model="logistic")

        pd.testing.assert_frame_equal(df1, df2)

    def test_stage_distribution(self):
        """Cox model should have valid stage values"""
        gen = RegressionGenerator(seed=42)
        df = gen._cox_ph(
            n=1000, hazard_ratios={}, baseline_hazard=0.01, censoring_rate=0.3
        )

        valid_stages = {"I", "II", "III", "IV"}
        assert set(df["stage"].unique()).issubset(valid_stages)

    def test_treatment_groups(self):
        """Cox model should have balanced treatment groups"""
        gen = RegressionGenerator(seed=42)
        df = gen._cox_ph(
            n=10000, hazard_ratios={}, baseline_hazard=0.01, censoring_rate=0.3
        )

        treatment_a_pct = (df["treatment"] == "A").mean()
        assert 0.45 < treatment_a_pct < 0.55
