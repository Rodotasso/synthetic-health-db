# Auditoria de Plausibilidad - Generadores Sinteticos

## Resumen Ejecutivo

Auditoria de los generadores de datos sinteticos vs literatura epidemiologica.

**Estado**: Completado
**Fecha**: 2026-01-28
**Modulos auditados**: 4

---

## 1. EpidemicGenerator (epidemic_generators.py)

### 1.1 Modelo SIR

| Parametro | Valor Default | Referencia Literatura | Estado |
|-----------|---------------|----------------------|--------|
| R0 | 2.5 | Influenza: 1.2-1.8, COVID: 2.0-3.5 | OK (rango general) |
| gamma | 0.1 | 1/periodo_infeccioso = 1/10 dias | OK |

**Observaciones**:
- R0=2.5 es plausible para COVID-19 cepa original (Li et al. NEJM 2020: 2.0-3.5)
- gamma=0.1 implica periodo infeccioso de 10 dias (consistente con COVID)
- Para influenza estacional, usar R0=1.3, gamma=0.2 (5 dias infeccioso)

**Recomendacion**: Agregar presets por enfermedad.

### 1.2 Modelo SEIR

| Parametro | Valor Default | Referencia Literatura | Estado |
|-----------|---------------|----------------------|--------|
| R0 | 3.0 | COVID Delta: 5-8, Omicron: 8-15 | BAJO |
| sigma | 0.2 | 1/latencia = 1/5 dias | OK |
| gamma | 0.1 | 1/periodo_infeccioso | OK |
| latent_period | 5 | COVID: 5.2 dias, Influenza: 2 dias | OK |

**Observaciones**:
- sigma=0.2 implica latencia de 5 dias (OK para COVID)
- Parametro `latent_period` no usado en calculo (solo documentacion)

---

## 2. RegressionGenerator (regression_generator.py)

### 2.1 Regresion Logistica

| Parametro | Valor Default | Referencia Framingham | Estado |
|-----------|---------------|----------------------|--------|
| coef_age | 0.05 | ~0.05 por ano | OK |
| coef_sex_M | 0.3 | ~0.3-0.5 | OK |
| coef_bp | 0.02 | ~0.02-0.03 por mmHg | OK |
| coef_chol | 0.01 | ~0.01-0.02 por mg/dL | OK |
| intercept | -8.0 | Depende de prevalencia | OK |

**Observaciones**:
- Coeficientes consistentes con Framingham Heart Study
- Edad distribuida Poisson(45) con rango [18, 85] es apropiada
- BP media=130, DE=15 refleja poblacion con HTA

### 2.2 Regresion Cox

| Parametro | Valor Default | Referencia SEER | Estado |
|-----------|---------------|-----------------|--------|
| stage_II HR | 1.8 | 1.5-2.2 | OK |
| stage_III HR | 2.5 | 2.1-3.0 | OK |
| stage_IV HR | 3.2 | 3.5-4.8 | BAJO |
| treatment_B HR | 1.0 | Depende de tratamiento | OK |
| baseline_hazard | 0.01 | Cancer-especifico | OK |
| censoring_rate | 0.3 | 20-40% tipico | OK |

**Recomendaciones**:
- HR estadio IV deberia ser ~4.0 (actualmente 3.2)
- Agregar HR por tipo de cancer especifico

---

## 3. SurveillanceGenerator (surveillance.py)

### 3.1 Sistema de Alertas

| Parametro | Valor Default | Referencia CDC EARS | Estado |
|-----------|---------------|---------------------|--------|
| zscore_RED | >= 3.0 | EARS-C3: 3.0 | OK |
| zscore_ORANGE | >= 2.0 | EARS-C2: 2.0 | OK |
| zscore_YELLOW | >= 1.5 | EARS-C1: 1.5 | OK |
| outbreak_prob | 0.02 | 2% diario | OK |
| seasonal_amplitude | 0.5 | Respiratorias: ~50% | OK |

**Observaciones**:
- Thresholds de alerta consistentes con algoritmo EARS-C (CDC)
- Estacionalidad para respiratorias (prefijo "J") implementada correctamente
- Factor brote 2x-5x es plausible

### 3.2 Brotes

| Tipo | Implementacion | Plausibilidad |
|------|----------------|---------------|
| point_source | Lognormal(1.5, 0.5) | OK |
| continuous | Uniform(0, 30) | OK |
| propagated | Gamma(serial_interval, 1) | OK |

**Observaciones**:
- Serial interval = 5 dias (apropiado para COVID-like)
- R secundario Poisson(2.5) consistente con R0

---

## 4. PathologyProfiles (pathology_profiles.py)

### 4.1 Prevalencias GES vs ENS 2016-2017

| Patologia | Valor Usado | ENS 2016-2017 | Estado |
|-----------|-------------|---------------|--------|
| Hipertension | 27,400/100k (27.4%) | 27.6% | OK |
| Diabetes tipo 2 | 12,300/100k (12.3%) | 12.3% | OK |
| EPOC | 6,200/100k (6.2%) | 3.9% (>40 anos) | REVISAR |
| Depresion | 15,000/100k (15%) | 15.8% | OK |
| Asma | 5,000/100k (5%) | 5.4% | OK |

**Observaciones**:
- Mayoria de prevalencias correctamente alineadas con ENS
- EPOC puede estar sobreestimado (ENS: 3.9% en >40 anos)
- Comentarios en codigo referencian correctamente fuentes

---

## 5. Discrepancias Identificadas

### Alta Prioridad

1. **Cox HR Estadio IV**: Actual 3.2, literatura sugiere 4.0
2. **EPOC prevalencia**: 6.2% vs ENS 3.9%

### Media Prioridad

1. **SEIR R0 default**: 3.0 es bajo para variantes recientes
2. **Latent period no usado**: Parametro decorativo en SEIR

### Baja Prioridad

1. Agregar presets por enfermedad en SIR/SEIR
2. Documentar fuentes en docstrings

---

## 6. Validadores Disponibles

```python
from validation import (
    EpidemicValidator,
    SurvivalValidator,
    DemographicValidator,
)

# Validar modelo SIR
validator = EpidemicValidator()
report = validator.validate(
    data=sir_data,
    disease="influenza_seasonal",
    R0=2.5,
    gamma=0.1
)
print(report)

# Validar datos supervivencia
validator = SurvivalValidator()
report = validator.validate(
    data=survival_data,
    cancer_type="breast_cancer",
    expected_event_rate=0.15
)
print(report)

# Validar demograficos
validator = DemographicValidator()
report = validator.validate(
    data=patient_data,
    population="general"
)
print(report)
```

---

## 7. Referencias

- **CDC EARS**: Early Aberration Reporting System
- **SEER**: Surveillance, Epidemiology, and End Results Program
- **ENS 2016-2017**: Encuesta Nacional de Salud Chile
- **Framingham**: Framingham Heart Study Risk Functions
- **GLOBOCAN**: Global Cancer Observatory (IARC)
- **INE 2023**: Instituto Nacional de Estadisticas Chile
