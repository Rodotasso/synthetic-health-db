"""
Tests para validadores de plausibilidad.
"""

import numpy as np
import pandas as pd
import pytest

from validation import (
    EpidemicValidator,
    SurvivalValidator,
    DemographicValidator,
    ValidationResult,
    ValidationSeverity,
)
from validation.reference_data.r0_by_disease import (
    R0_REFERENCE,
    get_r0_range,
    validate_r0,
    validate_gamma,
)
from validation.reference_data.prevalence_chile import (
    PREVALENCE_ENS,
    get_prevalence,
    validate_prevalence,
)
from validation.reference_data.survival_benchmarks import (
    SURVIVAL_BENCHMARKS,
    get_survival_benchmark,
    validate_survival_rate,
)


class TestReferenceDataR0:
    """Tests para datos de referencia R0"""

    def test_r0_reference_has_diseases(self):
        """R0_REFERENCE debe tener enfermedades comunes"""
        assert "influenza_seasonal" in R0_REFERENCE
        assert "covid19_original" in R0_REFERENCE
        assert "measles" in R0_REFERENCE

    def test_get_r0_range_influenza(self):
        """get_r0_range retorna rango correcto para influenza"""
        r0_range = get_r0_range("influenza_seasonal")
        assert r0_range is not None
        assert r0_range[0] == 1.2
        assert r0_range[1] == 1.8

    def test_get_r0_range_unknown(self):
        """get_r0_range retorna None para enfermedad desconocida"""
        r0_range = get_r0_range("unknown_disease")
        assert r0_range is None

    def test_validate_r0_in_range(self):
        """validate_r0 pasa para R0 en rango"""
        is_valid, message = validate_r0("influenza_seasonal", 1.5)
        assert is_valid is True

    def test_validate_r0_out_of_range(self):
        """validate_r0 falla para R0 fuera de rango"""
        is_valid, message = validate_r0("influenza_seasonal", 5.0)
        assert is_valid is False
        assert "fuera de rango" in message.lower()

    def test_validate_gamma_plausible(self):
        """validate_gamma pasa para gamma plausible"""
        is_valid, message = validate_gamma("influenza_seasonal", 0.2)
        assert is_valid is True

    def test_validate_gamma_implausible(self):
        """validate_gamma falla para gamma muy diferente"""
        is_valid, message = validate_gamma("influenza_seasonal", 0.01)
        assert is_valid is False


class TestReferenceDataPrevalence:
    """Tests para datos de prevalencia ENS"""

    def test_prevalence_has_common_conditions(self):
        """PREVALENCE_ENS tiene condiciones comunes"""
        assert "hypertension" in PREVALENCE_ENS
        assert "diabetes_type2" in PREVALENCE_ENS
        assert "obesity" in PREVALENCE_ENS

    def test_get_prevalence_diabetes(self):
        """get_prevalence retorna datos de diabetes"""
        data = get_prevalence("diabetes_type2")
        assert data is not None
        assert data.prevalence_percent == 12.3

    def test_validate_prevalence_in_range(self):
        """validate_prevalence pasa para prevalencia similar"""
        is_valid, message = validate_prevalence("hypertension", 27.0)
        assert is_valid is True

    def test_validate_prevalence_out_of_range(self):
        """validate_prevalence falla para prevalencia muy diferente"""
        is_valid, message = validate_prevalence("hypertension", 5.0)
        assert is_valid is False


class TestReferenceDataSurvival:
    """Tests para benchmarks de supervivencia"""

    def test_survival_has_cancer_types(self):
        """SURVIVAL_BENCHMARKS tiene tipos de cancer"""
        assert "breast_cancer" in SURVIVAL_BENCHMARKS
        assert "lung_cancer_nsclc" in SURVIVAL_BENCHMARKS
        assert "colorectal_cancer" in SURVIVAL_BENCHMARKS

    def test_get_survival_benchmark(self):
        """get_survival_benchmark retorna datos"""
        data = get_survival_benchmark("breast_cancer")
        assert data is not None
        assert data.survival_5y == 90.3

    def test_validate_survival_rate_in_range(self):
        """validate_survival_rate pasa para supervivencia similar"""
        is_valid, message = validate_survival_rate("breast_cancer", 88.0)
        assert is_valid is True

    def test_validate_survival_rate_out_of_range(self):
        """validate_survival_rate falla para supervivencia muy diferente"""
        is_valid, message = validate_survival_rate("breast_cancer", 50.0)
        assert is_valid is False


class TestEpidemicValidator:
    """Tests para EpidemicValidator"""

    @pytest.fixture
    def sir_data(self):
        """Genera datos SIR de prueba"""
        n_days = 100
        population = 10000
        S = np.ones(n_days) * population
        I = np.ones(n_days) * 10
        R = np.zeros(n_days)

        # Simular dinamica SIR simple
        R0 = 2.5
        gamma = 0.1
        beta = R0 * gamma

        for i in range(1, n_days):
            new_infected = beta * S[i-1] * I[i-1] / population
            new_recovered = gamma * I[i-1]
            S[i] = S[i-1] - new_infected
            I[i] = I[i-1] + new_infected - new_recovered
            R[i] = R[i-1] + new_recovered

        return pd.DataFrame({
            "day": range(n_days),
            "susceptible": S,
            "infected": I,
            "recovered": R,
        })

    def test_validate_sir_structure(self, sir_data):
        """Valida estructura de datos SIR"""
        validator = EpidemicValidator()
        report = validator.validate(sir_data, model="sir")
        assert report.total_checks > 0

        # Debe pasar estructura
        structure_result = next(
            (r for r in report.results if r.check_name == "structure_check"),
            None
        )
        assert structure_result is not None
        assert structure_result.passed is True

    def test_validate_sir_with_disease(self, sir_data):
        """Valida SIR con referencia de enfermedad"""
        validator = EpidemicValidator()
        report = validator.validate(
            sir_data,
            disease="influenza_seasonal",
            R0=1.5,
            gamma=0.2,
            model="sir"
        )

        # R0 debe pasar (1.5 esta en rango [1.2, 1.8])
        r0_result = next(
            (r for r in report.results if r.check_name == "r0_range"),
            None
        )
        assert r0_result is not None
        assert r0_result.passed is True

    def test_validate_sir_r0_out_of_range(self, sir_data):
        """Valida que R0 fuera de rango genera error"""
        validator = EpidemicValidator()
        report = validator.validate(
            sir_data,
            disease="influenza_seasonal",
            R0=5.0,  # Muy alto para influenza
            gamma=0.2,
            model="sir"
        )

        r0_result = next(
            (r for r in report.results if r.check_name == "r0_range"),
            None
        )
        assert r0_result is not None
        assert r0_result.passed is False
        assert r0_result.severity == ValidationSeverity.ERROR

    def test_validate_population_conservation(self, sir_data):
        """Valida conservacion de poblacion"""
        validator = EpidemicValidator()
        report = validator.validate(sir_data, model="sir")

        conservation_result = next(
            (r for r in report.results if r.check_name == "population_conservation"),
            None
        )
        assert conservation_result is not None
        assert bool(conservation_result.passed) is True

    def test_list_diseases(self):
        """list_diseases retorna lista no vacia"""
        diseases = EpidemicValidator.list_diseases()
        assert len(diseases) > 0
        assert "influenza_seasonal" in diseases


class TestSurvivalValidator:
    """Tests para SurvivalValidator"""

    @pytest.fixture
    def survival_data(self):
        """Genera datos de supervivencia de prueba"""
        np.random.seed(42)
        n = 200
        return pd.DataFrame({
            "subject_id": range(1, n + 1),
            "age": np.random.normal(60, 10, n).astype(int).clip(35, 85),
            "sex": np.random.choice(["M", "F"], n),
            "stage": np.random.choice(["I", "II", "III", "IV"], n, p=[0.3, 0.25, 0.2, 0.25]),
            "followup_days": np.random.exponential(500, n).clip(30, 2000),
            "event": np.random.binomial(1, 0.15, n),
        })

    def test_validate_structure(self, survival_data):
        """Valida estructura de datos de supervivencia"""
        validator = SurvivalValidator()
        report = validator.validate(survival_data)

        structure_result = next(
            (r for r in report.results if r.check_name == "structure_check"),
            None
        )
        assert structure_result is not None
        assert structure_result.passed is True

    def test_validate_event_rate(self, survival_data):
        """Valida tasa de eventos"""
        validator = SurvivalValidator()
        report = validator.validate(
            survival_data,
            expected_event_rate=0.15
        )

        event_rate_result = next(
            (r for r in report.results if "event_rate" in r.check_name),
            None
        )
        assert event_rate_result is not None

    def test_validate_censoring(self, survival_data):
        """Valida tasa de censura"""
        validator = SurvivalValidator()
        report = validator.validate(survival_data)

        censoring_result = next(
            (r for r in report.results if r.check_name == "censoring_rate"),
            None
        )
        assert censoring_result is not None
        assert censoring_result.passed is True

    def test_validate_with_cancer_type(self, survival_data):
        """Valida con tipo de cancer"""
        validator = SurvivalValidator()
        report = validator.validate(
            survival_data,
            cancer_type="breast_cancer"
        )

        assert report.total_checks > 0

    def test_validate_hazard_ratios(self):
        """Valida hazard ratios"""
        validator = SurvivalValidator()
        hazard_ratios = {
            "stage_II": 1.8,
            "stage_III": 2.5,
            "stage_IV": 4.0,
        }
        report = validator.validate_cox_hazard_ratios(
            hazard_ratios,
            context="cancer_general"
        )

        assert report.total_checks == 3

    def test_list_cancer_types(self):
        """list_cancer_types retorna lista"""
        cancer_types = SurvivalValidator.list_cancer_types()
        assert len(cancer_types) > 0
        assert "breast_cancer" in cancer_types


class TestDemographicValidator:
    """Tests para DemographicValidator"""

    @pytest.fixture
    def demographic_data(self):
        """Genera datos demograficos de prueba"""
        np.random.seed(42)
        n = 500
        return pd.DataFrame({
            "patient_id": range(1, n + 1),
            "age": np.random.choice(
                [10, 25, 50, 70],
                n,
                p=[0.18, 0.32, 0.33, 0.17]
            ) + np.random.randint(-5, 5, n),
            "sex": np.random.choice(["M", "F"], n, p=[0.49, 0.51]),
        })

    def test_validate_structure(self, demographic_data):
        """Valida estructura"""
        validator = DemographicValidator()
        report = validator.validate(demographic_data)

        structure_result = next(
            (r for r in report.results if r.check_name == "structure_check"),
            None
        )
        assert structure_result is not None
        assert structure_result.passed is True

    def test_validate_age_distribution(self, demographic_data):
        """Valida distribucion de edad"""
        validator = DemographicValidator()
        report = validator.validate(demographic_data, population="general")

        age_result = next(
            (r for r in report.results if r.check_name == "age_validity"),
            None
        )
        assert age_result is not None
        assert age_result.passed is True

    def test_validate_sex_distribution(self, demographic_data):
        """Valida distribucion de sexo"""
        validator = DemographicValidator()
        report = validator.validate(demographic_data)

        sex_result = next(
            (r for r in report.results if r.check_name == "sex_validity"),
            None
        )
        assert sex_result is not None
        assert sex_result.passed is True

    def test_validate_invalid_ages(self):
        """Detecta edades invalidas"""
        data = pd.DataFrame({
            "age": [-5, 150, 30, 40, 50],
            "sex": ["M", "F", "M", "F", "M"],
        })
        validator = DemographicValidator()
        report = validator.validate(data)

        age_result = next(
            (r for r in report.results if r.check_name == "age_validity"),
            None
        )
        assert age_result is not None
        assert age_result.passed is False

    def test_validate_chile_population(self, demographic_data):
        """Valida poblacion Chile"""
        validator = DemographicValidator()
        report = validator.validate_chile_population(demographic_data)

        assert report.total_checks > 0

    def test_list_conditions(self):
        """list_conditions retorna lista"""
        conditions = DemographicValidator.list_conditions()
        assert len(conditions) > 0
        assert "hypertension" in conditions


class TestValidationReport:
    """Tests para ValidationReport"""

    def test_report_str(self):
        """Report se puede convertir a string"""
        validator = EpidemicValidator()
        n_days = 50
        data = pd.DataFrame({
            "day": range(n_days),
            "susceptible": np.ones(n_days) * 10000,
            "infected": np.ones(n_days) * 10,
            "recovered": np.zeros(n_days),
        })
        report = validator.validate(data, model="sir")

        report_str = str(report)
        assert "EpidemicValidator" in report_str
        assert "Checks:" in report_str

    def test_report_to_dict(self):
        """Report se puede convertir a dict"""
        validator = DemographicValidator()
        data = pd.DataFrame({
            "age": [30, 40, 50, 60],
            "sex": ["M", "F", "M", "F"],
        })
        report = validator.validate(data)

        report_dict = report.to_dict()
        assert "validator" in report_dict
        assert "total_checks" in report_dict
        assert "results" in report_dict


class TestIntegrationWithGenerators:
    """Tests de integracion con generadores"""

    def test_validate_epidemic_generator(self):
        """Valida output de EpidemicGenerator"""
        # Importar generador
        import sys
        sys.path.insert(0, str("D:/01_PROYECTOS/PROY_BBDD_SINTETICAS/synthetic-health-db/backend"))

        try:
            from app.epidemic_generators import EpidemicGenerator

            gen = EpidemicGenerator(seed=42)
            data = gen.sir(n_days=365, population=100000, R0=2.5, gamma=0.1)

            validator = EpidemicValidator()
            report = validator.validate(
                data,
                disease="covid19_original",
                R0=2.5,
                gamma=0.1,
                model="sir"
            )

            # Debe pasar la mayoria de checks
            assert report.pass_rate >= 50.0, f"Pass rate: {report.pass_rate}%"

        except ImportError:
            pytest.skip("EpidemicGenerator no disponible")

    def test_validate_survival_generator(self):
        """Valida output de SurvivalGenerator"""
        import sys
        sys.path.insert(0, str("D:/01_PROYECTOS/PROY_BBDD_SINTETICAS/synthetic-health-db/backend"))

        try:
            from app.epidemic_generators import SurvivalGenerator

            gen = SurvivalGenerator(seed=42)
            data = gen.kaplan_meier(n_subjects=500, followup_days=1095, event_rate=0.15)

            validator = SurvivalValidator()
            report = validator.validate(
                data,
                expected_event_rate=0.15,
                followup_days=1095
            )

            assert report.pass_rate >= 50.0

        except ImportError:
            pytest.skip("SurvivalGenerator no disponible")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
