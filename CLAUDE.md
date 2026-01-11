# Plataforma de Bases Sintéticas para Salud Pública

## Contexto
Generador de bases de datos sintéticas para testing, desarrollo e investigación en salud pública. Interfaz NO-AI con soporte Python y R.

## Stack
- **Backend**: FastAPI (Python 3.11+)
- **Frontend**: React/Next.js + R Shiny
- **Data Engine**: Python (Faker, numpy, pandas) + R (data.table)
- **Job Queue**: Celery + Redis (opcional)

## Comandos

```bash
# Backend API
cd backend && uvicorn app.main:app --reload

# Shiny (R)
cd shiny && Rscript -e "shiny::runApp()"

# CLI
python -m synthetic_db generate --schema cie10 --rows 100000
```

## Schemas Disponibles

| Schema | Descripción | Filas |
|--------|-------------|-------|
| cie10 | Códigos CIE-10 con errores | 500K |
| demographics | Datos demográficos | 1M |
| comorbid | Índices Charlson/Elixhauser | 500K |

## Skills

```bash
/synthetic-gen <schema> <rows> <output>     # Generar base
/schema-validate <schema.yaml>               # Validar schema
```

## Agents

```bash
@synthetic-architect     # Diseñar arquitecturas
@data-engineer          # Implementar generadores
@schema-validator        # Validar schemas
```

## Estructura
```
backend/    # FastAPI
shiny/      # R Shiny
schemas/    # YAML schemas
R_scripts/  # Scripts R compartidos
.claude/    # Claude Code config
```

## Eficiencia
- Skills para tareas simples (<5 líneas)
- Agents para arquitectura e implementación
- Vectorización y paralelización obligatoria
- Respuestas concisas, sin verbose
