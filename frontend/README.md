# Synthetic Health DB - Frontend

Frontend web para la plataforma de generacion de datos sinteticos de salud publica.

## Stack

- **React 19** + TypeScript
- **Vite 7** (build tool)
- **Tailwind CSS 4** (styling)
- **Recharts** (visualizaciones)
- **Lucide React** (iconos)

## Paginas

| Ruta | Pagina | Descripcion |
|------|--------|-------------|
| `/` | Home | Landing page con features y estadisticas |
| `/catalog` | Catalogo | Busqueda y filtrado de schemas |
| `/wizard` | Wizard | Generacion paso a paso |
| `/builder` | Builder | Construccion de schemas relacionales |
| `/examples` | Ejemplos | Visualizaciones interactivas y codigo |
| `/tutorials` | Tutoriales | Guias paso a paso |
| `/docs` | Documentacion | Diagrama ER y diccionario de datos |
| `/changelog` | Changelog | Historial de versiones |

## Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de produccion
npm run build

# Preview del build
npm run preview

# Lint
npm run lint
```

## Estructura

```
src/
├── components/
│   ├── layout/          # Header, Footer
│   └── ui/              # Button, Card, Tabs, ThemeToggle, etc.
├── pages/               # Paginas de la aplicacion
├── generators/          # 18 generadores de datos
├── data/                # Datos referenciales Chile
├── types/               # Interfaces TypeScript
└── lib/                 # Utilidades (cn, etc.)
```

## Generadores Disponibles (18)

### Datos Medicos (9)
- demographics, cie10, encounters, medications, observations
- vitals, immunizations, conditions, procedures, organizations

### Epidemiologia (4)
- sir, seir, surveillance, outbreak

### Bioestadistica (2)
- survival_cohort, case_control

### Regresion (4)
- linear, logistic, poisson, cox

## Caracteristicas

- **Dark/Light Mode**: Toggle con persistencia en localStorage
- **Responsive**: Mobile-first con menu hamburguesa
- **SEO**: Meta tags completos (Open Graph, Twitter Card, Schema.org)
- **Reproducibilidad**: Seed deterministico para todos los generadores
- **Datos Chile**: Comunas, ATC, PNI, GES, FONASA, DEIS

## Despliegue

El frontend se despliega automaticamente en GitHub Pages:
https://rodotasso.github.io/synthetic-health-db/

```bash
# Build con base path correcto
npm run build

# Los archivos se generan en dist/
```

## Licencia

MIT
