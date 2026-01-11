# Plataforma de Bases Sintéticas para Salud Pública

Generador de bases de datos sintéticas para testing, desarrollo e investigación en salud pública. **Interfaz NO-AI** con soporte Python y R.

## 🌐 GitHub Pages
**UI Interactiva**: https://rodotasso.github.io/synthetic-health-db/

## Tech Stack

- **Backend**: FastAPI (Python 3.11+)
- **Frontend**: React/Next.js + R Shiny
- **Data Engine**: Python (Faker, numpy, pandas) + R (data.table)
- **Job Queue**: Celery + Redis
- **Validación**: Pydantic + JSON Schema

## Quick Start

```bash
# Clone
git clone https://github.com/Rodotasso/synthetic-health-db.git
cd synthetic-health-db

# Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend React
cd frontend
npm install
npm run dev

# Shiny (R)
cd shiny
Rscript -e "shiny::runApp()"

# CLI
python -m synthetic_db generate --schema cie10 --rows 100000
```

## Schemas Disponibles

| Schema | Descripción | Filas default |
|--------|-------------|---------------|
| cie10 | Códigos CIE-10 con errores testing | 500K |
| demographics | Datos demográficos poblacionales | 1M |
| medications | Medicamentos ATC + CIE-10 | 500K |
| comorbidities | Índices Charlson/Elixhauser | 500K |
| lab_results | Resultados de laboratorio | 1M |

## Skills (Claude Code)

```bash
/synthetic-gen <schema> <rows> <output>     # Generar base
/schema-validate <schema.yaml>               # Validar schema
/export-config --format json                 # Exportar config
```

## Agents

```bash
@synthetic-architect     # Diseñar arquitecturas
@data-engineer          # Implementar generadores
@ui-developer           # Desarrollar interfaces
@test-validator         # Validar generadores
```

## Estructura

```
synthetic-health-db/
├── backend/            # FastAPI
├── frontend/           # React
├── shiny/              # R Shiny
├── schemas/            # YAML schemas
├── R_scripts/          # Scripts R compartidos
└── .claude/            # Claude Code config
```

## License

MIT
