# Plataforma de Bases Sintéticas para Salud Pública

## Contexto
Generador de bases de datos sintéticas para testing, desarrollo e investigación en salud pública. **Interfaz NO-AI** con soporte Python y R.

## Stack
- **Backend**: FastAPI (Python 3.11+)
- **Frontend**: React/Next.js + R Shiny
- **Data Engine**: Python (Faker, numpy, pandas) + R (data.table)
- **Job Queue**: Celery + Redis (opcional)
- **Validación**: Pydantic + JSON Schema

## Dominios Especializados

### Bioestadística
- Análisis de supervivencia (Kaplan-Meier, Cox)
- Ensayos clínicos (power analysis, sample size)
- Seroprevalencia (estimación bayesiana)
- Análisis multivariante (logística, Poisson)

### Epidemiología
- Modelos epidémicos (SIR, SEIR, SEIRD)
- Curvas epidémicas (R0, período serial)
- Series temporales (tendencia, ruido, estacionalidad)
- Estudios de cohorte (longitudinal, casos-controles)
- Validación de datos (missing data, outliers)

## Comandos

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# Shiny (R)
cd shiny
Rscript -e "shiny::runApp()"

# CLI
python cli.py generate <schema> --rows <n>
```

## Schemas Disponibles

### Datos Médicos
| Schema | Descripción | Filas default |
|--------|-------------|---------------|
| cie10 | Códigos CIE-10 con errores testing | 500K |
| demographics | Datos demográficos poblacionales | 1M |
| medications | Medicamentos ATC + CIE-10 | 500K |
| comorbidities | Índices Charlson/Elixhauser | 500K |

### Bioestadística
| Schema | Descripción | Filas default |
|--------|-------------|---------------|
| survival_cohort | Cohorte longitudinal supervivencia | 5K |
| case_control | Estudio casos-controles | 2K |

### Epidemiología
| Schema | Descripción | Filas default |
|--------|-------------|---------------|
| epidemic_sir | Modelo SIR epidémico | 100K |
| epidemic_seir | Modelo SEIR epidémico | 100K |
| timeseries_covid | Serie temporal COVID-19 | 730 días |

## Skills (Claude Code)

### Datos Médicos
```bash
/synthetic-gen <schema> <rows> <output>     # Generar base
/schema-validate <schema.yaml>               # Validar schema
```

### Epidemiología
```bash
/epidemic-gen <model> <days> <population>   # Curvas epidémicas
/survival-gen <n> <followup> <event_rate>     # Supervivencia
/cohort-gen <n> <periods> <attrition>        # Cohortes
/timeseries-gen <days> <trend> <noise>        # Series temporales
```

## Agents

```bash
@synthetic-architect     # Diseñar arquitecturas
@data-engineer          # Implementar generadores
@epidemiologist        # Modelos epidémicos (SIR, SEIR, R0)
@biostatistician      # Análisis supervivencia, ensayos clínicos
@cohort-designer       # Diseñar estudios de cohorte
@epi-validator         # Validar calidad de datos
```

## Referencias Salud Pública

### Repositorios
- **epiverse-trace/tutorials-early**: Curvas epidémicas, validación line lists
- **UCL-ARC/r-amr-epidemiology**: R para análisis reproducible
- **reconhub/learn**: Training en análisis de epidemias
- **jhudsl/intro_to_r**: Datasets salud pública en R
- **ernestguevara/practical-r-for-epidemiologists**: R práctico epidemiólogos
- **JohnsHopkins-Data-Science-for-Public-Health**: Python para salud pública

### Cursos y Formación
- **Johns Hopkins**: Data Science for Public Health (Python)
- **PAHO/WHO**: Capacitación R para análisis de salud, inteligencia epidémica
- **Campus Virtual PAHO**: Epidemiología para sistemas de salud en las Américas

## Estructura

```
synthetic-health-db/
├── backend/            # FastAPI
│   └── app/
│       ├── generators.py           # Generadores médicos
│       └── epidemic_generators.py  # Generadores epidemio
├── shiny/              # R Shiny
├── schemas/            # YAML schemas
│   ├── medical/                  # Datos médicos
│   ├── biostatistics/           # Bioestadística
│   └── epidemiology/            # Epidemiología
├── R_scripts/          # Scripts R compartidos
└── .claude/            # Claude Code config
    ├── commands/                 # Skills
    │   ├── synthetic-generate.md
    │   ├── epidemic-gen.md
    │   ├── survival-gen.md
    │   ├── cohort-gen.md
    │   └── timeseries-gen.md
    └── agents/                  # Agentes especializados
        ├── synthetic-architect.md
        ├── data-engineer.md
        ├── epidemiologist.md
        ├── biostatistician.md
        ├── cohort-designer.md
        └── epi-validator.md
```

## Eficiencia

- Skills para tareas simples (<5 líneas)
- Agents para arquitectura e implementación
- Vectorización y paralelización obligatoria
- Respuestas concisas, sin verbose
- Reproducibilidad con seed fijo
