# FRONTEND_PLAN.md - Recetario Synthetic Health DB

## Resumen

Frontend React+Vite "recetario interactivo" para generar bases sintéticas de salud. Deploy GitHub Pages (static). Generación client-side. Persistencia localStorage (schemas >3 usos).

## Stack

```
React 18 + Vite + TypeScript
├── UI: Tailwind CSS + shadcn/ui
├── State: Zustand
├── Forms: React Hook Form + Zod
├── Storage: localStorage
├── Routing: React Router v6
└── Charts: Recharts
```

## Etapas de Implementación

| Etapa | Skill/Agent | Duración | Dependencias |
|-------|-------------|----------|--------------|
| 1 | `/frontend-setup` | 2h | - |
| 2 | `/frontend-pages` | 3h | 1 |
| 3 | `/frontend-generators` | 2h | 1 |
| 4 | `/frontend-wizard` | 3h | 2,3 |
| 5 | `@schema-builder` | 4h | 4 |
| 6 | `/frontend-deploy` | 2h | 1-5 |

**Nota**: Etapas 2 y 3 pueden ejecutarse en paralelo.

---

## Etapa 1: Setup Proyecto

**Skill**: `/frontend-setup`

**Objetivo**: Proyecto React+Vite funcional con routing básico

**Archivos**:
```
frontend/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── index.html
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    └── lib/utils.ts
```

**Verificación**: `npm run dev` en localhost:5173

---

## Etapa 2: Páginas Core + UI Base

**Skill**: `/frontend-pages`

**Objetivo**: Home, Catalog, Wizard, Builder con layout

**Archivos**:
```
src/
├── components/
│   ├── ui/{button,card,input,select,slider,tabs}.tsx
│   └── layout/{Header,Footer}.tsx
└── pages/{Home,Catalog,Wizard,Builder}.tsx
```

**Verificación**: Navegación entre 4 páginas

---

## Etapa 3: Generadores Client-Side

**Skill**: `/frontend-generators`

**Objetivo**: Portar generadores JS a TypeScript tipado

**Archivos**:
```
src/generators/
├── index.ts
├── utils.ts          # mulberry32, hash
├── demographics.ts
├── cie10.ts
├── encounters.ts
├── survival.ts
├── casecontrol.ts
├── surveillance.ts
├── outbreak.ts
├── sir.ts
└── regression.ts
```

**Verificación**: `generators.demographics(100, 42)` retorna array tipado

---

## Etapa 4: Wizard Completo

**Skill**: `/frontend-wizard`

**Objetivo**: Wizard 4 pasos con preview y download

**Archivos**:
```
src/
├── components/wizard/
│   ├── StepObjective.tsx
│   ├── StepConfig.tsx
│   ├── StepColumns.tsx
│   └── StepGenerate.tsx
├── components/common/
│   ├── DataPreview.tsx
│   └── StatsPanel.tsx
├── hooks/
│   ├── useDownload.ts
│   └── useSchemaHistory.ts
└── services/storage.ts
```

**Verificación**: Generar y descargar CSV

---

## Etapa 5: Builder + Combinaciones

**Agent**: `@schema-builder`

**Objetivo**: Builder schemas y sistema de combinación

**Archivos**:
```
src/
├── components/builder/
│   ├── ColumnEditor.tsx
│   ├── CombinationBuilder.tsx
│   ├── SchemaNode.tsx
│   ├── PresetSelector.tsx
│   └── YamlPreview.tsx
├── generators/combiner.ts
├── types/combination.ts
└── data/presets.ts
```

**Presets**:
- `cohorte-clinica`: demographics + encounters + survival (1:N)
- `estudio-epidemico`: surveillance + sir + outbreak (1:1)
- `regresion-clinica`: demographics + logistic + cie10 (1:1)

**Combinación**:
```typescript
interface SchemaCombination {
  base: string;
  layers: LayerConfig[];
  joinType: '1:1' | '1:N';
  coherenceCheck: true;
}

interface LayerConfig {
  schema: string;
  joinKey: string;
  columns: string[];
  cardinality?: [number, number];
}
```

**Reglas**:
- Columnas duplicadas: usar solo del schema base
- Coherencia: siempre validar consistencia
- FK: detectar automáticamente de schemas YAML
- Cardinalidad: usuario elige 1:1 o 1:N

**Verificación**: Crear combinación y generar datos

---

## Etapa 6: Polish + Deploy

**Skill**: `/frontend-deploy`

**Objetivo**: Responsive, dark mode, GitHub Pages

**Archivos**:
```
frontend/
├── src/index.css (dark mode)
├── src/components/layout/ThemeToggle.tsx
└── vite.config.ts (base path)
.github/workflows/deploy-frontend.yml
```

**Verificación**: https://rodotasso.github.io/synthetic-health-db/

---

## Arquitectura Final

```
frontend/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── index.html
├── public/
│   └── schemas.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── components/
    │   ├── ui/
    │   ├── layout/
    │   ├── catalog/
    │   ├── wizard/
    │   ├── builder/
    │   └── common/
    ├── pages/
    ├── generators/
    ├── hooks/
    ├── services/
    ├── types/
    ├── data/
    └── lib/
```

## Schemas Disponibles

| Categoría | Schema | Análisis |
|-----------|--------|----------|
| Medical | demographics | Descriptivos |
| Medical | cie10 | Testing fuzzy |
| Medical | encounters | Frecuencias |
| Biostatistics | survival_cohort | Kaplan-Meier |
| Biostatistics | case_control | OR, RR |
| Epidemiology | sir | Curva R0 |
| Epidemiology | seir | Latencia |
| Epidemiology | surveillance | Alertas |
| Epidemiology | outbreak | Generaciones |
| Regression | linear | β, R² |
| Regression | logistic | OR, AUC |
| Regression | poisson | IRR |
| Regression | cox | HR |
| Regression | multiple | Interacciones |

## Persistencia

```typescript
// Guardar schema si count >= 3
interface SchemaUsage {
  name: string;
  count: number;
  lastUsed: Date;
  config?: GenerationConfig;
}
```

## Dependencias

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "zustand": "^5.0.0",
    "react-hook-form": "^7.53.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.9.0",
    "recharts": "^2.12.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.0",
    "lucide-react": "^0.460.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "typescript": "^5.6.3",
    "vite": "^6.0.1"
  }
}
```

## Ejecución

```bash
# Etapa 1
/frontend-setup

# Etapa 2 (después de 1)
/frontend-pages

# Etapa 3 (después de 1, paralelo con 2)
/frontend-generators

# Etapa 4 (después de 2 y 3)
/frontend-wizard

# Etapa 5 (después de 4)
@schema-builder

# Etapa 6 (después de todo)
/frontend-deploy
```

## Criterios de Aceptación

- [x] Home muestra 3 opciones principales
- [ ] Catálogo lista schemas con filtros por categoría
- [ ] Wizard genera datos en 4 pasos
- [ ] Preview muestra primeras 20 filas
- [ ] Download funciona CSV y JSON
- [ ] Builder permite crear schema básico
- [ ] Combinación de schemas funcional (presets + drag&drop)
- [ ] Schemas usados >3 veces se guardan en localStorage
- [ ] Deploy automático a GitHub Pages
- [ ] Responsive mobile-friendly
- [ ] Dark mode toggle

---

## Progreso

### Etapa 1: Setup Proyecto - COMPLETADA

**Fecha**: 2026-01-18

**Archivos creados**:
- `frontend/package.json` - dependencias React 18 + Vite + Tailwind v4
- `frontend/vite.config.ts` - path alias `@`, base `/synthetic-health-db/`
- `frontend/postcss.config.js` - Tailwind v4
- `frontend/tsconfig.app.json` - paths config
- `frontend/src/index.css` - Dark theme medical aesthetic
- `frontend/src/App.tsx` - Router + 4 páginas placeholder
- `frontend/src/main.tsx` - React 18 entry
- `frontend/src/lib/utils.ts` - cn() helper

**Verificación**:
- `npm run dev` - OK (localhost:5173)
- `npm run build` - OK (235KB JS, 9KB CSS)
