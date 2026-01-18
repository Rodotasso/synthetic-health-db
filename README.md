# Synthetic Health Database

Generador de bases de datos sintéticas para epidemiología y bioestadística. **100% client-side** - no requiere backend.

## Demo

**GitHub Pages**: https://rodotasso.github.io/synthetic-health-db/

## Features

- Generación determinística con seeds (reproducible)
- 14 esquemas de datos especializados
- Exportación CSV/JSON
- Sin dependencias de servidor

## Schemas Disponibles

### Médico
| Schema | Descripción |
|--------|-------------|
| `demographics` | Datos demográficos: edad, sexo, región, seguro |
| `cie10` | Códigos CIE-10 con errores opcionales para testing |
| `encounters` | Encuentros clínicos con fechas y diagnósticos |

### Epidemiología
| Schema | Descripción |
|--------|-------------|
| `sir` | Modelo compartimental SIR |
| `seir` | Modelo SEIR con período de latencia |
| `surveillance` | Vigilancia epidemiológica con alertas |
| `outbreak` | Simulación de brote con generaciones |

### Bioestadística
| Schema | Descripción |
|--------|-------------|
| `survival_cohort` | Cohorte de supervivencia (Kaplan-Meier) |
| `case_control` | Estudio caso-control con OR configurable |

### Regresión
| Schema | Descripción |
|--------|-------------|
| `linear` | Datos para regresión lineal |
| `logistic` | Datos para regresión logística |
| `poisson` | Datos para regresión Poisson |
| `cox` | Datos para modelo de Cox |

## Quick Start

```bash
# Clonar
git clone https://github.com/Rodotasso/synthetic-health-db.git
cd synthetic-health-db/frontend

# Instalar y ejecutar
npm install
npm run dev

# Abrir http://localhost:5173/synthetic-health-db/
```

## Desarrollo

### Frontend (React + Vite + TypeScript)

```bash
cd frontend
npm run dev      # Desarrollo
npm run build    # Producción
npm run preview  # Preview del build
```

### Estructura del Proyecto

```
synthetic-health-db/
├── frontend/
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── generators/   # Data generators (11 files)
│   │   ├── pages/        # Home, Catalog, Wizard, Builder
│   │   ├── data/         # Schema definitions
│   │   └── types/        # TypeScript interfaces
│   └── dist/             # Build output
├── backend/              # FastAPI (opcional)
└── index.html            # Versión standalone original
```

## Generadores Implementados

| Generador | Archivo | Parámetros |
|-----------|---------|------------|
| Demographics | `demographics.ts` | minBirthYear, maxBirthYear, femaleRatio, urbanRatio |
| CIE-10 | `cie10.ts` | addSpaces, addLowercase, addTruncated, addInvalid |
| Encounters | `encounters.ts` | year |
| Survival | `survival.ts` | hazardRatio, medianSurvival, censoringRate |
| Case-Control | `casecontrol.ts` | oddsRatio, exposurePrevalence, controlsPerCase |
| Surveillance | `surveillance.ts` | baselineCases, alertThreshold, seasonal, outbreakWeek |
| Outbreak | `outbreak.ts` | r0, serialInterval, maxGenerations |
| SIR | `sir.ts` | beta, gamma, population, initialInfected |
| SEIR | `seir.ts` | beta, sigma, gamma, population |
| Linear | `regression.ts` | beta0, beta1, beta2, noise |
| Logistic | `regression.ts` | beta0, beta1, beta2 |
| Poisson | `regression.ts` | beta0, beta1 |
| Cox | `regression.ts` | hazardRatioTreatment, hazardRatioAge |

## API de Generadores

```typescript
import { generate, downloadCSV, downloadJSON } from '@/generators'

// Generar 1000 registros con seed 42
const data = generate('demographics', 1000, 42)

// Descargar
downloadCSV(data, 'pacientes.csv')
downloadJSON(data, 'pacientes.json')
```

## Roadmap

- [x] Etapa 1: Setup (Vite + React + Tailwind)
- [x] Etapa 2: UI Components + Pages
- [x] Etapa 3: Generadores TypeScript
- [ ] Etapa 4: Wizard Integration
- [ ] Etapa 5: Schema Joins (1:N)
- [ ] Etapa 6: GitHub Pages Deploy

## License

MIT
