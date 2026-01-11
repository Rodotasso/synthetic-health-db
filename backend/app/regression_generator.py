from typing import List, Dict, Tuple
import numpy as np
import pandas as pd


class RegressionGenerator:
    """Generador completo de regresiones estadísticas"""
    
    def __init__(self, seed: int = 42):
        np.random.seed(seed)
    
    def _linear(self, n: int, coeffs: List[float], 
                intercept: float, noise: float) -> pd.DataFrame:
        """Regresión lineal: Y = βX + ε"""
        k = len(coeffs)
        X = np.random.normal(0, 1, (n, k))
        beta = np.array(coeffs)
        y_true = X @ beta + intercept
        y = y_true + np.random.normal(0, noise, n)
        df = pd.DataFrame(X, columns=[f"x{i+1}" for i in range(k)])
        df["y"] = y
        return df
    
    def _logistic(self, n: int, coeffs: Dict, 
                intercept: float) -> pd.DataFrame:
        """Regresión logística: P(Y=1) = 1/(1+exp(-βX))"""
        ages = np.random.poisson(45, n)
        ages = np.clip(ages, 18, 85).astype(int)
        
        sex = np.random.choice(["M", "F"], n, p=[0.5, 0.5])
        sex_M = (sex == "M").astype(int)
        
        bp = np.random.normal(130, 15, n)
        chol = np.random.normal(220, 30, n)
        
        disease_prob = 1 / (1 + np.exp(-(intercept + coeffs.get("age",0)*ages + coeffs.get("sex_M",0)*sex_M + coeffs.get("bp",0)*bp + coeffs.get("chol",0)*chol)))
        disease = np.random.binomial(1, disease_prob, n)
        
        return pd.DataFrame({
            "age": ages,
            "sex": sex,
            "blood_pressure": bp,
            "cholesterol": chol,
            "disease": disease
        })
    
    def _poisson(self, n: int, rate_lambda: float, 
               overdispersion: float, offset: float = 0.0) -> pd.DataFrame:
        """Regresión de Poisson (conteo de eventos)"""
        exposure = np.random.poisson(rate_lambda, n)
        radiation = np.random.exponential(1/rate_lambda if rate_lambda > 0 else 1, n)
        
        smoking = np.random.binomial(1, 0.35, n)
        cancer = np.random.negative_binomial(exposure, 0.0008, n) + exposure
        
        return pd.DataFrame({
            "exposure_years": exposure,
            "radiation": radiation,
            "smoking_status": smoking,
            "cancer_incidence": cancer
        })
    
    def _cox_ph(self, n: int, hazard_ratios: Dict, 
               baseline_hazard: float, durations: List[float] = None,
               censoring_rate: float = 0.3) -> pd.DataFrame:
        """Regresión de Cox: Hazard proporcional"""
        if durations is None:
            durations = [30, 90, 182.5, 365, 730, 1095, 1825]
        
        ages = np.random.normal(60, 10, n).astype(int)
        ages = np.clip(ages, 35, 85)
        
        sex = np.random.choice(["M", "F"], n, p=[0.5, 0.5])
        sex_M = (sex == "M").astype(int)
        
        stage = np.random.choice(["I", "II", "III", "IV"], n, 
                         p=[0.3, 0.25, 0.2, 0.25])
        stage_hazard = {
            "I": hazard_ratios.get("I", 1.0),
            "II": hazard_ratios.get("II", 1.8),
            "III": hazard_ratios.get("III", 2.5),
            "IV": hazard_ratios.get("IV", 3.2)
        }[stage]
        
        treatment = np.random.choice(["A", "B"], n, p=[0.5, 0.5])
        treatment_B = (treatment == "B").astype(int)
        
        tx_hazard = 1.0 if treatment_B else 0.75
        
        base_hazard = baseline_hazard * np.exp(np.log(2)/10 * (ages-60)/10)
        stage_hazard_mod = base_hazard * stage_hazard
        tx_hazard_mod = base_hazard * (1 + tx_hazard)
        
        cumulative_hazard = stage_hazard_mod + tx_hazard_mod
        event_prob = 1 - np.exp(-cumulative_hazard * 30 / 365)
        events = np.random.binomial(1, event_prob, n)
        censored = np.random.binomial(1, censoring_rate, n) - events
        
        followup = np.array(durations)[np.arange(n)]
        actual_followup = followup * np.random.uniform(0.8, 1.2, n)
        actual_followup = np.minimum(actual_followup, np.array(durations)[np.arange(n)])
        
        return pd.DataFrame({
            "subject_id": range(1, n+1),
            "age": ages,
            "sex": sex,
            "treatment": treatment,
            "stage": stage,
            "followup_days": actual_followup,
            "event": events,
            "censored": censored
        })
    
    def _multiple(self, n: int, coeffs: Dict, 
               include_interactions: bool = True, 
               intercept: float) -> pd.DataFrame:
        """Regresión múltiple con interacciones"""
        x1 = np.random.normal(0, 1, n)
        x2 = np.random.normal(5, 1, n)
        x3 = np.random.binomial(1, 0.7, n).astype(float)
        
        y_true = coeffs.get("x1", 3.2)*x1 + coeffs.get("x2", 1.5)*x2 + coeffs.get("x3", 0.8)*x3 + intercept
        y_true += coeffs.get("x1_x2", 0.9)*x1*x2
        y_true += coeffs.get("x1_x3", -1.2)*x1*x3
        
        y = y_true + np.random.normal(0, 0.1, n)
        
        df = pd.DataFrame({"x1": x1, "x2": x2, "x3": x3, "y": y})
        
        if include_interactions:
            df["x1_x2"] = x1 * x2
            df["x1_x3"] = x1 * x3
        
        return df
