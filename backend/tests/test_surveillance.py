import pytest
import pandas as pd
import numpy as np
from app.surveillance import (
    SurveillanceGenerator,
    OutbreakGenerator,
    TimeSeriesGenerator,
)


class TestSurveillanceGenerator:
    """Tests for SurveillanceGenerator"""

    def test_alert_system_basic(self):
        """Basic alert system generation"""
        gen = SurveillanceGenerator(seed=42)
        df = gen.generate_alert_system(diseases=["J09", "A00"], regions=5, days=30)

        assert "date" in df.columns
        assert "disease_code" in df.columns
        assert "cases" in df.columns
        assert "alert_level" in df.columns
        assert len(df) == 30 * 5 * 2  # days * regions * diseases

    def test_alert_levels(self):
        """Alert levels should be valid"""
        gen = SurveillanceGenerator(seed=42)
        df = gen.generate_alert_system(diseases=["J09"], regions=5, days=100)

        valid_levels = {"GREEN", "YELLOW", "ORANGE", "RED"}
        assert set(df["alert_level"].unique()).issubset(valid_levels)

    def test_outbreak_flag(self):
        """Outbreak flag should be boolean"""
        gen = SurveillanceGenerator(seed=42)
        df = gen.generate_alert_system(
            diseases=["J09"], regions=5, days=100, outbreak_probability=0.1
        )

        assert df["outbreak_flag"].dtype == bool
        # With 10% probability, we should see some outbreaks
        assert df["outbreak_flag"].sum() > 0

    def test_notifiable_diseases(self):
        """Generate notifiable disease notifications"""
        gen = SurveillanceGenerator(seed=42)
        df = gen.generate_notifiable_diseases(n_notifications=100)

        assert len(df) == 100
        assert "notification_id" in df.columns
        assert "disease_code" in df.columns
        assert "urgency" in df.columns

    def test_invalid_parameters(self):
        """Should validate parameters"""
        gen = SurveillanceGenerator(seed=42)
        with pytest.raises(ValueError):
            gen.generate_alert_system(diseases=["J09"], regions=0, days=30)
        with pytest.raises(ValueError):
            gen.generate_alert_system(
                diseases=["J09"], regions=5, days=30, outbreak_probability=2.0
            )

    def test_reproducibility(self):
        """Same seed should produce identical results"""
        gen1 = SurveillanceGenerator(seed=42)
        gen2 = SurveillanceGenerator(seed=42)

        df1 = gen1.generate_alert_system(diseases=["J09"], regions=5, days=30)
        df2 = gen2.generate_alert_system(diseases=["J09"], regions=5, days=30)

        pd.testing.assert_frame_equal(df1, df2)


class TestOutbreakGenerator:
    """Tests for OutbreakGenerator"""

    def test_point_source(self):
        """Point source outbreak generation"""
        gen = OutbreakGenerator(seed=42)
        df = gen.generate_outbreak(outbreak_type="point_source", n_cases=100)

        assert len(df) == 100
        assert "case_id" in df.columns
        assert "onset_date" in df.columns
        assert (df["outbreak_type"] == "point_source").all()

    def test_continuous(self):
        """Continuous outbreak generation"""
        gen = OutbreakGenerator(seed=42)
        df = gen.generate_outbreak(outbreak_type="continuous", n_cases=100)

        assert len(df) == 100
        assert (df["outbreak_type"] == "continuous").all()

    def test_propagated(self):
        """Propagated outbreak generation"""
        gen = OutbreakGenerator(seed=42)
        df = gen.generate_outbreak(outbreak_type="propagated", n_cases=100)

        assert len(df) == 100
        assert (df["outbreak_type"] == "propagated").all()
        # Propagated outbreaks should have generations
        assert df["generation"].max() > 0

    def test_severity_distribution(self):
        """Severity should have expected distribution"""
        gen = OutbreakGenerator(seed=42)
        df = gen.generate_outbreak(n_cases=10000)

        mild_pct = (df["severity"] == "mild").mean()
        assert 0.65 < mild_pct < 0.75  # ~70% mild

    def test_invalid_n(self):
        """Should validate n_cases"""
        gen = OutbreakGenerator(seed=42)
        with pytest.raises(ValueError):
            gen.generate_outbreak(n_cases=0)

    def test_reproducibility(self):
        """Same seed should produce identical results"""
        gen1 = OutbreakGenerator(seed=42)
        gen2 = OutbreakGenerator(seed=42)

        df1 = gen1.generate_outbreak(n_cases=50)
        df2 = gen2.generate_outbreak(n_cases=50)

        pd.testing.assert_frame_equal(df1, df2)


class TestTimeSeriesGenerator:
    """Tests for TimeSeriesGenerator"""

    def test_incidence_series(self):
        """Generate incidence time series"""
        gen = TimeSeriesGenerator(seed=42)
        df = gen.generate_incidence_series(days=100)

        assert len(df) == 100
        assert "date" in df.columns
        assert "incidence" in df.columns
        assert "cases" in df.columns
        assert "ma7" in df.columns
        assert "epi_week" in df.columns

    def test_non_negative_incidence(self):
        """Incidence should be non-negative"""
        gen = TimeSeriesGenerator(seed=42)
        df = gen.generate_incidence_series(days=365)

        assert (df["incidence"] >= 0).all()
        assert (df["cases"] >= 0).all()

    def test_with_outbreaks(self):
        """Should include outbreak spikes"""
        gen = TimeSeriesGenerator(seed=42)
        df = gen.generate_incidence_series(days=365, baseline=10.0, outbreaks=5)

        # Max incidence should be notably higher than baseline
        assert df["incidence"].max() > 15

    def test_no_outbreaks(self):
        """Should work without outbreaks"""
        gen = TimeSeriesGenerator(seed=42)
        df = gen.generate_incidence_series(days=365, baseline=10.0, outbreaks=0)

        # Max should be closer to baseline (with noise)
        assert df["incidence"].max() < 25

    def test_mortality_series(self):
        """Generate mortality time series"""
        gen = TimeSeriesGenerator(seed=42)
        df = gen.generate_mortality_series(weeks=52)

        assert len(df) == 52
        assert "observed_deaths" in df.columns
        assert "expected_deaths" in df.columns
        assert "excess_deaths" in df.columns
        assert "p_score" in df.columns

    def test_mortality_with_excess(self):
        """Mortality series with excess events"""
        gen = TimeSeriesGenerator(seed=42)
        excess_events = [{"start_week": 10, "duration": 10, "magnitude": 2.0}]
        df = gen.generate_mortality_series(weeks=52, excess_events=excess_events)

        # Excess deaths should be higher in the affected period
        affected = df[(df.index >= 10) & (df.index < 20)]
        unaffected = df[(df.index < 10) | (df.index >= 20)]
        assert affected["excess_deaths"].mean() > unaffected["excess_deaths"].mean()

    def test_invalid_parameters(self):
        """Should validate parameters"""
        gen = TimeSeriesGenerator(seed=42)
        with pytest.raises(ValueError):
            gen.generate_incidence_series(days=0)
        with pytest.raises(ValueError):
            gen.generate_incidence_series(days=100, baseline=-5)

    def test_reproducibility(self):
        """Same seed should produce identical results"""
        gen1 = TimeSeriesGenerator(seed=42)
        gen2 = TimeSeriesGenerator(seed=42)

        # Use days > 60 to allow for outbreak generation
        df1 = gen1.generate_incidence_series(days=100)
        df2 = gen2.generate_incidence_series(days=100)

        # Compare numeric columns only (date differs by milliseconds due to datetime.now())
        numeric_cols = ["incidence", "cases", "ma7", "ma14", "epi_week", "epi_year"]
        pd.testing.assert_frame_equal(df1[numeric_cols], df2[numeric_cols])
