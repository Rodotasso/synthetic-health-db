import pytest
import pandas as pd
import numpy as np
from app.patient_id import PatientIDGenerator, EncounterGenerator, LaboratoryGenerator


class TestPatientIDGenerator:
    """Tests for PatientIDGenerator"""

    def test_single_patient(self):
        """Generate a single patient"""
        gen = PatientIDGenerator(seed=42)
        patient = gen.generate_patient("1990-05-15", "M", "13")

        assert "patient_id" in patient
        assert "uuid" in patient
        assert patient["patient_id"].startswith("SHDB-1990-M-13-")
        # SHDB-YYYY-S-RR-HHHHHH = 4+1+4+1+1+1+2+1+6 = 21 chars
        assert len(patient["patient_id"]) == 21

    def test_cohort_generation(self):
        """Generate a cohort of patients"""
        gen = PatientIDGenerator(seed=42)
        df = gen.generate_cohort(n=100)

        assert len(df) == 100
        assert "patient_id" in df.columns
        assert "uuid" in df.columns
        assert "sex" in df.columns
        assert "region" in df.columns
        assert "age" in df.columns

    def test_unique_ids(self):
        """All patient IDs should be unique"""
        gen = PatientIDGenerator(seed=42)
        df = gen.generate_cohort(n=1000)

        assert df["patient_id"].nunique() == 1000
        assert df["uuid"].nunique() == 1000

    def test_with_encounters(self):
        """Generate cohort with encounters"""
        gen = PatientIDGenerator(seed=42)
        df = gen.generate_cohort(n=10, with_encounters=True)

        assert "encounter_id" in df.columns
        assert "encounter_date" in df.columns
        assert "encounter_type" in df.columns
        assert len(df) >= 10  # At least one encounter per patient

    def test_age_range_validation(self):
        """Should respect age range parameter (with +/-1 year tolerance for date calculation)"""
        gen = PatientIDGenerator(seed=42)
        df = gen.generate_cohort(n=1000, age_range=(30, 50))

        # Allow +/-1 year tolerance due to birth date calculation
        assert df["age"].min() >= 29
        assert df["age"].max() <= 51

    def test_sex_ratio(self):
        """Should respect sex ratio parameter"""
        gen = PatientIDGenerator(seed=42)
        df = gen.generate_cohort(n=10000, sex_ratio=0.7)

        female_pct = (df["sex"] == "F").mean()
        assert 0.65 < female_pct < 0.75

    def test_custom_regions(self):
        """Should use custom regions when provided"""
        gen = PatientIDGenerator(seed=42)
        custom_regions = ["01", "05", "13"]
        df = gen.generate_cohort(n=100, regions=custom_regions)

        assert set(df["region"].unique()).issubset(set(custom_regions))

    def test_invalid_n(self):
        """Should raise error for invalid n"""
        gen = PatientIDGenerator(seed=42)
        with pytest.raises(ValueError):
            gen.generate_cohort(n=0)

    def test_invalid_sex_ratio(self):
        """Should validate sex ratio"""
        gen = PatientIDGenerator(seed=42)
        with pytest.raises(ValueError):
            gen.generate_cohort(n=100, sex_ratio=1.5)

    def test_reproducibility(self):
        """Same seed should produce identical results"""
        gen1 = PatientIDGenerator(seed=42)
        gen2 = PatientIDGenerator(seed=42)

        df1 = gen1.generate_cohort(n=50)
        df2 = gen2.generate_cohort(n=50)

        pd.testing.assert_frame_equal(df1, df2)

    def test_registry(self):
        """Registry should track all generated patients"""
        gen = PatientIDGenerator(seed=42)
        gen.generate_cohort(n=50)

        registry = gen.get_registry()
        assert len(registry) == 50


class TestEncounterGenerator:
    """Tests for EncounterGenerator"""

    def test_basic_generation(self):
        """Generate encounters for patients"""
        gen = EncounterGenerator(seed=42)
        patient_ids = [f"PAT-{i:06d}" for i in range(10)]
        df = gen.generate_encounters(patient_ids, n_encounters=100)

        assert len(df) == 100
        assert "encounter_id" in df.columns
        assert "patient_id" in df.columns
        assert "encounter_date" in df.columns

    def test_with_diagnoses(self):
        """Should include diagnoses when requested"""
        gen = EncounterGenerator(seed=42)
        patient_ids = [f"PAT-{i:06d}" for i in range(10)]
        df = gen.generate_encounters(
            patient_ids, n_encounters=100, include_diagnoses=True
        )

        assert "primary_dx" in df.columns

    def test_unique_encounter_ids(self):
        """Encounter IDs should be unique"""
        gen = EncounterGenerator(seed=42)
        patient_ids = [f"PAT-{i:06d}" for i in range(10)]
        df = gen.generate_encounters(patient_ids, n_encounters=1000)

        assert df["encounter_id"].nunique() == 1000

    def test_reproducibility(self):
        """Same seed should produce identical results"""
        gen1 = EncounterGenerator(seed=42)
        gen2 = EncounterGenerator(seed=42)

        patient_ids = [f"PAT-{i:06d}" for i in range(10)]
        df1 = gen1.generate_encounters(patient_ids, n_encounters=50)
        df2 = gen2.generate_encounters(patient_ids, n_encounters=50)

        pd.testing.assert_frame_equal(df1, df2)


class TestLaboratoryGenerator:
    """Tests for LaboratoryGenerator"""

    def test_basic_generation(self):
        """Generate lab results"""
        gen = LaboratoryGenerator(seed=42)
        patient_ids = [f"PAT-{i:06d}" for i in range(10)]
        df = gen.generate_labs(patient_ids, n_results=100)

        assert "patient_id" in df.columns
        assert "test_name" in df.columns
        assert "value" in df.columns
        assert "unit" in df.columns
        assert "abnormal_flag" in df.columns

    def test_abnormal_flags(self):
        """Should have valid abnormal flags"""
        gen = LaboratoryGenerator(seed=42)
        patient_ids = [f"PAT-{i:06d}" for i in range(10)]
        df = gen.generate_labs(patient_ids, n_results=1000)

        valid_flags = {"L", "H", "N"}
        assert set(df["abnormal_flag"].unique()).issubset(valid_flags)

    def test_value_consistency(self):
        """Abnormal flag should match value vs normal range"""
        gen = LaboratoryGenerator(seed=42)
        patient_ids = [f"PAT-{i:06d}" for i in range(10)]
        df = gen.generate_labs(patient_ids, n_results=1000)

        for _, row in df.iterrows():
            if row["abnormal_flag"] == "L":
                assert row["value"] < row["low_normal"]
            elif row["abnormal_flag"] == "H":
                assert row["value"] > row["high_normal"]
            else:
                assert row["low_normal"] <= row["value"] <= row["high_normal"]

    def test_reproducibility(self):
        """Same seed should produce identical results"""
        gen1 = LaboratoryGenerator(seed=42)
        gen2 = LaboratoryGenerator(seed=42)

        patient_ids = [f"PAT-{i:06d}" for i in range(10)]
        df1 = gen1.generate_labs(patient_ids, n_results=50)
        df2 = gen2.generate_labs(patient_ids, n_results=50)

        pd.testing.assert_frame_equal(df1, df2)
