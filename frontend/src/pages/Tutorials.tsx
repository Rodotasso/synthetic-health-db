import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Tabs, TabsList, TabsTrigger } from '@/components/ui'
import { BookOpen, Clock, ChevronRight, Activity, FlaskRound, Code, BarChart3, GraduationCap, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Tutorial {
  id: string
  title: string
  description: string
  category: 'epidemiology' | 'biostatistics' | 'clinical' | 'getting-started'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  topics: string[]
  content: TutorialContent[]
}

interface TutorialContent {
  type: 'text' | 'code' | 'note' | 'warning'
  content: string
  language?: string
}

const tutorials: Tutorial[] = [
  {
    id: 'getting-started',
    title: 'Primeros Pasos con Synthetic Health DB',
    description: 'Aprende a generar tu primera base de datos sintetica en menos de 5 minutos',
    category: 'getting-started',
    difficulty: 'beginner',
    duration: '5 min',
    topics: ['Instalacion', 'Configuracion', 'Primer dataset'],
    content: [
      {
        type: 'text',
        content: `# Introduccion

Synthetic Health DB es una plataforma para generar bases de datos sinteticas de salud publica. Soporta multiples formatos y casos de uso: epidemiologia, bioestadistica, y datos clinicos.

## Requisitos Previos

- Node.js 18+ (para la interfaz web)
- Python 3.11+ (para el backend)
- R 4.3+ (opcional, para scripts R)`
      },
      {
        type: 'code',
        language: 'bash',
        content: `# Clonar el repositorio
git clone https://github.com/Rodotasso/synthetic-health-db.git
cd synthetic-health-db

# Instalar dependencias del frontend
cd frontend && npm install

# Iniciar el servidor de desarrollo
npm run dev`
      },
      {
        type: 'note',
        content: 'La interfaz web funciona completamente en el navegador. No necesitas backend para generar datos basicos.'
      },
      {
        type: 'text',
        content: `## Tu Primer Dataset

1. Ve al **Catalogo** y selecciona un schema (ej: "demographics")
2. En el **Wizard**, configura el numero de filas y seed
3. Descarga en formato CSV o JSON

O usa el codigo directamente:`
      },
      {
        type: 'code',
        language: 'typescript',
        content: `import { generate } from '@/generators'

// Generar 1000 pacientes
const patients = generate('demographics', 1000, 42)

// Exportar a CSV
const csv = patients.map(p =>
  Object.values(p).join(',')
).join('\\n')

console.log(\`Generados \${patients.length} pacientes\`)`
      }
    ]
  },
  {
    id: 'sir-seir-models',
    title: 'Modelos Epidemicos SIR y SEIR',
    description: 'Genera curvas epidemicas realistas para simulacion de brotes y analisis de intervencion',
    category: 'epidemiology',
    difficulty: 'intermediate',
    duration: '15 min',
    topics: ['R0', 'Tasa de transmision', 'Periodo latente', 'Herd immunity'],
    content: [
      {
        type: 'text',
        content: `# Modelos Compartimentales

Los modelos SIR (Susceptible-Infectado-Recuperado) y SEIR (con periodo Expuesto) son fundamentales en epidemiologia para modelar la propagacion de enfermedades infecciosas.

## Parametros Clave

| Parametro | Simbolo | Descripcion |
|-----------|---------|-------------|
| Tasa de transmision | beta | Probabilidad de contagio por contacto |
| Tasa de recuperacion | gamma | 1/duracion de enfermedad |
| Numero reproductivo | R0 | beta/gamma |
| Periodo latente | sigma | Solo SEIR, tiempo de incubacion |`
      },
      {
        type: 'code',
        language: 'python',
        content: `from synthetic_health import EpidemicGenerator

# Configurar parametros para COVID-like
gen = EpidemicGenerator(seed=42)

# Modelo SIR basico
sir_data = gen.sir(
    population=100000,
    initial_infected=10,
    beta=0.4,      # R0 ~ 2.0 con gamma=0.2
    gamma=0.2,
    days=180
)

# Modelo SEIR con periodo latente
seir_data = gen.seir(
    population=100000,
    initial_exposed=50,
    beta=0.4,
    gamma=0.2,
    sigma=0.2,     # ~5 dias de incubacion
    days=180
)`
      },
      {
        type: 'warning',
        content: 'Los valores de R0 deben basarse en literatura cientifica. Un R0 muy alto (>5) generara curvas poco realistas para la mayoria de enfermedades.'
      },
      {
        type: 'text',
        content: `## Interpretacion de Resultados

El pico de infectados y su timing dependen directamente de R0:

- **R0 < 1**: La epidemia se extingue naturalmente
- **R0 = 1-2**: Propagacion lenta, curva aplanada
- **R0 = 2-4**: Propagacion moderada (influenza, COVID)
- **R0 > 4**: Propagacion rapida (sarampion)`
      },
      {
        type: 'code',
        language: 'r',
        content: `library(synthetichealth)
library(ggplot2)

# Comparar escenarios de intervencion
baseline <- generate_sir(R0 = 2.5, days = 180)
intervencion <- generate_sir(R0 = 1.5, days = 180)

# Visualizar impacto
ggplot() +
  geom_line(data = baseline, aes(day, infected, color = "Sin intervencion")) +
  geom_line(data = intervencion, aes(day, infected, color = "Con intervencion")) +
  labs(title = "Impacto de Reducir R0",
       y = "Infectados activos",
       color = "Escenario") +
  theme_minimal()`
      }
    ]
  },
  {
    id: 'survival-analysis',
    title: 'Analisis de Supervivencia con Datos Sinteticos',
    description: 'Genera cohortes para estudios de supervivencia con censura y multiples brazos de tratamiento',
    category: 'biostatistics',
    difficulty: 'intermediate',
    duration: '20 min',
    topics: ['Kaplan-Meier', 'Cox regression', 'Hazard ratio', 'Censura'],
    content: [
      {
        type: 'text',
        content: `# Estudios de Supervivencia

El analisis de supervivencia estudia el tiempo hasta un evento (muerte, recaida, curacion). Los datos sinteticos permiten validar pipelines de analisis y explorar escenarios hipoteticos.

## Componentes del Dataset

Cada registro de supervivencia incluye:
- **patient_id**: Identificador unico
- **time**: Tiempo de seguimiento
- **event**: 1 si ocurrio el evento, 0 si censura
- **treatment**: Grupo de tratamiento
- **covariables**: Edad, sexo, comorbilidades`
      },
      {
        type: 'code',
        language: 'python',
        content: `from synthetic_health import SurvivalGenerator
from lifelines import KaplanMeierFitter, CoxPHFitter

# Generar cohorte
gen = SurvivalGenerator(seed=42)
data = gen.cohort(
    n_patients=1000,
    followup_months=36,
    hazard_treatment=0.05,  # Mortalidad mensual tratamiento
    hazard_control=0.10,    # Mortalidad mensual control
    covariates=['age', 'sex', 'comorbidity_index']
)

# Kaplan-Meier por grupo
kmf = KaplanMeierFitter()
for group in [0, 1]:
    mask = data['treatment'] == group
    kmf.fit(data[mask]['time'], data[mask]['event'],
            label=f"{'Tratamiento' if group else 'Control'}")
    kmf.plot_survival_function()

# Cox regression
cph = CoxPHFitter()
cph.fit(data, 'time', 'event')
print(f"Hazard Ratio tratamiento: {cph.hazard_ratios_['treatment']:.2f}")`
      },
      {
        type: 'note',
        content: 'El Hazard Ratio esperado es aproximadamente hazard_control/hazard_treatment = 0.10/0.05 = 2.0 (tratamiento reduce riesgo a la mitad).'
      },
      {
        type: 'code',
        language: 'r',
        content: `library(synthetichealth)
library(survival)
library(survminer)

# Generar y ajustar
data <- generate_survival(n = 1000, seed = 42)
fit <- survfit(Surv(time, event) ~ treatment, data = data)

# Grafico Kaplan-Meier profesional
ggsurvplot(fit,
  data = data,
  risk.table = TRUE,
  pval = TRUE,
  conf.int = TRUE,
  palette = c("#E7B800", "#2E9FDF"),
  legend.labs = c("Control", "Tratamiento")
)`
      }
    ]
  },
  {
    id: 'cie10-validation',
    title: 'Testing de Validadores CIE-10',
    description: 'Genera codigos CIE-10 con errores intencionales para probar tu pipeline de validacion',
    category: 'clinical',
    difficulty: 'beginner',
    duration: '10 min',
    topics: ['CIE-10', 'Validacion', 'QA', 'Edge cases'],
    content: [
      {
        type: 'text',
        content: `# Validacion de Codigos CIE-10

Los sistemas de salud requieren codigos diagnosticos precisos. Synthetic Health DB genera datasets con errores intencionales para testing de validadores.

## Tipos de Errores Soportados

| Tipo | Ejemplo Correcto | Ejemplo Erroneo |
|------|-----------------|-----------------|
| Sin punto | E11.0 | E110 |
| Minusculas | E11.0 | e11.0 |
| Con espacios | E11.0 | E 11.0 |
| Truncados | E11.0 | E11 |
| Invalidos | E11.0 | Z99.X |
| Siglas | E11.0 | DM2 |`
      },
      {
        type: 'code',
        language: 'typescript',
        content: `import { generate } from '@/generators'

// Generar con diferentes tipos de error
const perfectCodes = generate('cie10', 1000, 42, { errorType: 'none' })
const noDotCodes = generate('cie10', 1000, 42, { errorType: 'no_dot' })
const lowercaseCodes = generate('cie10', 1000, 42, { errorType: 'lowercase' })
const mixedCodes = generate('cie10', 1000, 42, { errorType: 'mixed' })

// Validar tu funcion
function validateCIE10(code: string): boolean {
  return /^[A-Z]\\d{2}\\.\\d{1,2}$/.test(code)
}

// Test
const passed = perfectCodes.every(r => validateCIE10(r.code))
const failed = noDotCodes.filter(r => validateCIE10(r.code)).length

console.log(\`Codigos perfectos validados: \${passed ? 'OK' : 'FAIL'}\`)
console.log(\`Codigos sin punto detectados: \${1000 - failed}/1000\`)`
      },
      {
        type: 'text',
        content: `## Uso para Testing Automatizado

Integra los datasets en tu CI/CD para asegurar que los validadores manejan todos los edge cases:`
      },
      {
        type: 'code',
        language: 'python',
        content: `import pytest
from synthetic_health import CIE10Generator
from my_validator import validate_cie10

@pytest.fixture
def cie10_generator():
    return CIE10Generator(seed=42)

@pytest.mark.parametrize("error_type,expected_valid", [
    ("none", True),      # Todos deben pasar
    ("no_dot", False),   # Todos deben fallar
    ("lowercase", False),
    ("truncated", False),
    ("invalid", False),
])
def test_cie10_validation(cie10_generator, error_type, expected_valid):
    codes = cie10_generator.batch(100, error_type=error_type)
    results = [validate_cie10(c['code']) for c in codes]

    if expected_valid:
        assert all(results), "Codigos validos rechazados"
    else:
        assert not any(results), f"Codigos {error_type} aceptados"`
      }
    ]
  },
  {
    id: 'regression-datasets',
    title: 'Datasets para Regresion Estadistica',
    description: 'Genera datos con relaciones conocidas para validar modelos de regresion lineal, logistica y Poisson',
    category: 'biostatistics',
    difficulty: 'advanced',
    duration: '25 min',
    topics: ['Regresion lineal', 'Regresion logistica', 'Poisson', 'Efectos conocidos'],
    content: [
      {
        type: 'text',
        content: `# Datasets con Efectos Controlados

Una ventaja clave de los datos sinteticos es conocer los efectos reales. Esto permite validar que tus modelos recuperan los parametros correctos.

## Tipos de Regresion

- **Lineal**: outcome = beta0 + beta1*x1 + ... + error
- **Logistica**: log(p/(1-p)) = beta0 + beta1*x1 + ...
- **Poisson**: log(lambda) = beta0 + beta1*x1 + ...
- **Cox**: h(t) = h0(t) * exp(beta1*x1 + ...)`
      },
      {
        type: 'code',
        language: 'python',
        content: `from synthetic_health import RegressionGenerator

gen = RegressionGenerator(seed=42)

# Regresion logistica con OR conocidos
logistic_data = gen.logistic(
    n=5000,
    predictors={
        'age': {'mean': 50, 'sd': 15, 'or': 1.03},      # OR=1.03 por ano
        'smoking': {'prevalence': 0.25, 'or': 2.5},    # OR=2.5 vs no fumador
        'diabetes': {'prevalence': 0.15, 'or': 1.8},
    },
    baseline_risk=0.10
)

# Validar con statsmodels
import statsmodels.api as sm
X = logistic_data[['age', 'smoking', 'diabetes']]
X = sm.add_constant(X)
y = logistic_data['outcome']

model = sm.Logit(y, X).fit()
print("OR estimados vs reales:")
print(f"  Age: {np.exp(model.params['age']):.3f} (real: 1.030)")
print(f"  Smoking: {np.exp(model.params['smoking']):.3f} (real: 2.500)")
print(f"  Diabetes: {np.exp(model.params['diabetes']):.3f} (real: 1.800)")`
      },
      {
        type: 'warning',
        content: 'Con muestras pequenas, los OR estimados pueden diferir de los reales. Usa n>=1000 para estimaciones estables.'
      },
      {
        type: 'code',
        language: 'r',
        content: `library(synthetichealth)

# Regresion Poisson para tasas de incidencia
poisson_data <- generate_poisson_regression(
  n = 10000,
  predictors = list(
    age_group = list(levels = c("18-39", "40-59", "60+"),
                     irr = c(1.0, 1.5, 2.5)),
    region = list(levels = c("Norte", "Centro", "Sur"),
                  irr = c(1.0, 1.2, 0.8)),
    vaccination = list(prevalence = 0.7, irr = 0.4)
  ),
  baseline_rate = 0.05,
  offset = "person_years",
  seed = 42
)

# Modelo Poisson
fit <- glm(events ~ age_group + region + vaccination + offset(log(person_years)),
           data = poisson_data, family = poisson)

# IRR con IC 95%
exp(cbind(IRR = coef(fit), confint(fit)))`
      }
    ]
  }
]

function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  const difficultyColors = {
    beginner: 'bg-green-500/10 text-green-500',
    intermediate: 'bg-yellow-500/10 text-yellow-500',
    advanced: 'bg-red-500/10 text-red-500',
  }

  const categoryIcons = {
    'getting-started': GraduationCap,
    epidemiology: Activity,
    biostatistics: BarChart3,
    clinical: FlaskRound,
  }

  const Icon = categoryIcons[tutorial.category]

  return (
    <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {tutorial.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {tutorial.description}
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm">
          <span className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${difficultyColors[tutorial.difficulty]}`}>
            {tutorial.difficulty === 'beginner' ? 'Principiante' :
             tutorial.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            {tutorial.duration}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {tutorial.topics.map((topic) => (
            <Badge key={topic} variant="secondary" className="text-xs">
              {topic}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TutorialDetail({ tutorial }: { tutorial: Tutorial }) {
  return (
    <div className="prose prose-invert max-w-none">
      {tutorial.content.map((block, index) => {
        switch (block.type) {
          case 'text':
            return (
              <div key={index} className="mb-6">
                {block.content.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={i} className="text-2xl font-bold mb-4">{line.replace('# ', '')}</h1>
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={i} className="text-xl font-semibold mt-6 mb-3">{line.replace('## ', '')}</h2>
                  }
                  if (line.startsWith('| ')) {
                    return null // Skip table rows for now
                  }
                  if (line.startsWith('- ')) {
                    return <li key={i} className="text-muted-foreground">{line.replace('- ', '')}</li>
                  }
                  if (line.trim() === '') return <br key={i} />
                  return <p key={i} className="text-muted-foreground mb-2">{line}</p>
                })}
              </div>
            )
          case 'code':
            return (
              <pre key={index} className="bg-background border border-border rounded-lg p-4 overflow-x-auto mb-6">
                <code className="text-sm text-muted-foreground">{block.content}</code>
              </pre>
            )
          case 'note':
            return (
              <div key={index} className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg mb-6">
                <Star className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm text-foreground">{block.content}</p>
              </div>
            )
          case 'warning':
            return (
              <div key={index} className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
                <Code className="h-5 w-5 text-yellow-500 mt-0.5" />
                <p className="text-sm text-foreground">{block.content}</p>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

export function Tutorials() {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'Todos', icon: BookOpen },
    { id: 'getting-started', label: 'Inicio', icon: GraduationCap },
    { id: 'epidemiology', label: 'Epidemiologia', icon: Activity },
    { id: 'biostatistics', label: 'Bioestadistica', icon: BarChart3 },
    { id: 'clinical', label: 'Clinicos', icon: FlaskRound },
  ]

  const filteredTutorials = selectedCategory === 'all'
    ? tutorials
    : tutorials.filter(t => t.category === selectedCategory)

  if (selectedTutorial) {
    return (
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => setSelectedTutorial(null)}
            className="mb-6"
          >
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Volver a Tutoriales
          </Button>

          {/* Tutorial header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{selectedTutorial.title}</h1>
            <p className="text-muted-foreground mb-4">{selectedTutorial.description}</p>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{selectedTutorial.duration}</Badge>
              <Badge variant="secondary" className="capitalize">
                {selectedTutorial.difficulty === 'beginner' ? 'Principiante' :
                 selectedTutorial.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
              </Badge>
            </div>
          </div>

          {/* Tutorial content */}
          <Card>
            <CardContent className="pt-6">
              <TutorialDetail tutorial={selectedTutorial} />
            </CardContent>
          </Card>

          {/* Next steps */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Continua aprendiendo</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {tutorials
                .filter(t => t.id !== selectedTutorial.id)
                .slice(0, 2)
                .map(t => (
                  <Card
                    key={t.id}
                    className="cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => setSelectedTutorial(t)}
                  >
                    <CardContent className="pt-4">
                      <h4 className="font-medium">{t.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tutoriales</h1>
          <p className="text-muted-foreground">
            Guias paso a paso para dominar la generacion de datos sinteticos en salud
          </p>
        </div>

        {/* Quick Start CTA */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="flex items-center justify-between py-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Nuevo aqui?</h3>
              <p className="text-muted-foreground">Comienza con nuestro tutorial de primeros pasos</p>
            </div>
            <Button onClick={() => setSelectedTutorial(tutorials[0])}>
              <GraduationCap className="h-4 w-4 mr-2" />
              Comenzar
            </Button>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
          <TabsList>
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="flex items-center gap-2">
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Tutorials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTutorials.map((tutorial) => (
            <div key={tutorial.id} onClick={() => setSelectedTutorial(tutorial)}>
              <TutorialCard tutorial={tutorial} />
            </div>
          ))}
        </div>

        {/* Resources Section */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Recursos Adicionales</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-4">
                <h4 className="font-medium mb-2">Documentacion API</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Referencia completa de todos los generadores y parametros
                </p>
                <Link to="/docs" className="text-sm text-primary hover:underline">
                  Ver documentacion
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <h4 className="font-medium mb-2">Ejemplos de Codigo</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Codigo ejecutable en Python, R y TypeScript
                </p>
                <Link to="/examples" className="text-sm text-primary hover:underline">
                  Ver ejemplos
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <h4 className="font-medium mb-2">GitHub</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Codigo fuente, issues y contribuciones
                </p>
                <a
                  href="https://github.com/Rodotasso/synthetic-health-db"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Ver repositorio
                </a>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}
