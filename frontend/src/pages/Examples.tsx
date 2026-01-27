import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend } from 'recharts'
import { Play, Copy, Check, Activity, Users, TrendingUp, FlaskRound } from 'lucide-react'
import { generate } from '@/generators'

// Example data for visualizations
const sirData = Array.from({ length: 100 }, (_, i) => {
  const t = i
  const beta = 0.3
  const gamma = 0.1
  const N = 1000
  let S = 999, I = 1, R = 0
  for (let j = 0; j < t; j++) {
    const newI = (beta * S * I) / N
    const newR = gamma * I
    S -= newI
    I += newI - newR
    R += newR
  }
  return { day: t, susceptible: Math.round(S), infected: Math.round(I), recovered: Math.round(R) }
})

const survivalData = Array.from({ length: 12 }, (_, i) => ({
  month: i + 1,
  treatment: Math.round(100 * Math.exp(-0.05 * (i + 1))),
  control: Math.round(100 * Math.exp(-0.12 * (i + 1))),
}))

const incidenceData = [
  { region: 'Metropolitana', cases: 1250, rate: 17.5 },
  { region: 'Valparaiso', cases: 420, rate: 23.1 },
  { region: 'Biobio', cases: 380, rate: 18.8 },
  { region: 'Maule', cases: 210, rate: 19.2 },
  { region: 'Araucania', cases: 185, rate: 18.1 },
  { region: 'OHiggins', cases: 165, rate: 17.6 },
]

interface Example {
  id: string
  title: string
  description: string
  category: 'epidemiology' | 'biostatistics' | 'clinical' | 'regression'
  icon: typeof Activity
  pythonCode: string
  rCode: string
  tsCode: string
}

const examples: Example[] = [
  {
    id: 'sir-model',
    title: 'Modelo SIR Epidemico',
    description: 'Simulacion de propagacion de enfermedad infecciosa usando el modelo Susceptible-Infectado-Recuperado',
    category: 'epidemiology',
    icon: Activity,
    pythonCode: `from synthetic_health import EpidemicGenerator

# Generar curva SIR
gen = EpidemicGenerator(seed=42)
data = gen.sir(
    population=10000,
    initial_infected=10,
    beta=0.3,  # Tasa de transmision
    gamma=0.1,  # Tasa de recuperacion
    days=100
)

# Calcular R0
R0 = 0.3 / 0.1  # R0 = 3.0
print(f"R0 estimado: {R0}")
print(f"Pico de infectados: dia {data['infected'].idxmax()}")`,
    rCode: `library(synthetichealth)

# Generar curva SIR
data <- generate_sir(
  population = 10000,
  initial_infected = 10,
  beta = 0.3,
  gamma = 0.1,
  days = 100,
  seed = 42
)

# Calcular R0
R0 <- 0.3 / 0.1
cat("R0 estimado:", R0, "\\n")
cat("Pico de infectados: dia", which.max(data$infected), "\\n")

# Visualizar
library(ggplot2)
ggplot(data, aes(x = day)) +
  geom_line(aes(y = susceptible, color = "Susceptibles")) +
  geom_line(aes(y = infected, color = "Infectados")) +
  geom_line(aes(y = recovered, color = "Recuperados")) +
  theme_minimal()`,
    tsCode: `import { generate } from '@/generators'

// Generar datos SIR
const sirData = generate('sir', 100, 42, {
  population: 10000,
  initialInfected: 10,
  beta: 0.3,
  gamma: 0.1,
})

// Encontrar pico de infectados
const peakDay = sirData.reduce((max, row, i) =>
  row.infected > sirData[max].infected ? i : max, 0
)

console.log(\`Pico de infectados: dia \${peakDay}\`)
console.log(\`Maximo infectados: \${sirData[peakDay].infected}\`)`,
  },
  {
    id: 'survival-analysis',
    title: 'Analisis de Supervivencia',
    description: 'Cohorte de supervivencia con curvas Kaplan-Meier para tratamiento vs control',
    category: 'biostatistics',
    icon: TrendingUp,
    pythonCode: `from synthetic_health import SurvivalGenerator
import pandas as pd

# Generar cohorte de supervivencia
gen = SurvivalGenerator(seed=42)
data = gen.cohort(
    n_patients=500,
    followup_months=24,
    hazard_treatment=0.05,
    hazard_control=0.12,
    treatment_ratio=0.5
)

# Calcular Hazard Ratio
from lifelines import CoxPHFitter
cph = CoxPHFitter()
cph.fit(data, duration_col='time', event_col='event')
print(f"Hazard Ratio: {cph.hazard_ratios_['treatment']:.2f}")`,
    rCode: `library(synthetichealth)
library(survival)

# Generar cohorte de supervivencia
data <- generate_survival_cohort(
  n_patients = 500,
  followup_months = 24,
  hazard_treatment = 0.05,
  hazard_control = 0.12,
  seed = 42
)

# Ajustar modelo de Cox
fit <- coxph(Surv(time, event) ~ treatment, data = data)
summary(fit)

# Curvas Kaplan-Meier
km_fit <- survfit(Surv(time, event) ~ treatment, data = data)
plot(km_fit, col = c("red", "blue"),
     xlab = "Meses", ylab = "Supervivencia")
legend("topright", c("Control", "Tratamiento"), col = c("red", "blue"), lty = 1)`,
    tsCode: `import { generate } from '@/generators'

// Generar cohorte de supervivencia
const survivalData = generate('survival', 500, 42, {
  followupMonths: 24,
  hazardTreatment: 0.05,
  hazardControl: 0.12,
  treatmentRatio: 0.5,
})

// Calcular supervivencia por grupo
const treatment = survivalData.filter(p => p.treatment === 1)
const control = survivalData.filter(p => p.treatment === 0)

const survTreatment = treatment.filter(p => !p.event).length / treatment.length
const survControl = control.filter(p => !p.event).length / control.length

console.log(\`Supervivencia tratamiento: \${(survTreatment * 100).toFixed(1)}%\`)
console.log(\`Supervivencia control: \${(survControl * 100).toFixed(1)}%\`)`,
  },
  {
    id: 'case-control',
    title: 'Estudio Caso-Control',
    description: 'Estudio caso-control con exposicion y calculo de Odds Ratio',
    category: 'biostatistics',
    icon: Users,
    pythonCode: `from synthetic_health import CaseControlGenerator
import pandas as pd

# Generar estudio caso-control
gen = CaseControlGenerator(seed=42)
data = gen.study(
    n_cases=200,
    n_controls=400,
    exposures=['tabaco', 'alcohol', 'sedentarismo'],
    odds_ratios=[2.5, 1.8, 1.5]
)

# Tabla de contingencia
table = pd.crosstab(data['case'], data['tabaco'])
print("Tabla 2x2 para Tabaco:")
print(table)

# Calcular OR
a, b = table.loc[1, 1], table.loc[1, 0]
c, d = table.loc[0, 1], table.loc[0, 0]
OR = (a * d) / (b * c)
print(f"\\nOdds Ratio: {OR:.2f}")`,
    rCode: `library(synthetichealth)

# Generar estudio caso-control
data <- generate_case_control(
  n_cases = 200,
  n_controls = 400,
  exposures = c("tabaco", "alcohol", "sedentarismo"),
  odds_ratios = c(2.5, 1.8, 1.5),
  seed = 42
)

# Tabla de contingencia
table(data$case, data$tabaco)

# Regresion logistica
fit <- glm(case ~ tabaco + alcohol + sedentarismo,
           data = data, family = binomial)
exp(coef(fit))  # Odds Ratios

# Forest plot
library(forestplot)
or_table <- data.frame(
  variable = c("Tabaco", "Alcohol", "Sedentarismo"),
  OR = exp(coef(fit)[-1]),
  lower = exp(confint(fit)[-1, 1]),
  upper = exp(confint(fit)[-1, 2])
)`,
    tsCode: `import { generate } from '@/generators'

// Generar estudio caso-control
const ccData = generate('casecontrol', 600, 42, {
  nCases: 200,
  nControls: 400,
  exposures: ['tabaco', 'alcohol', 'sedentarismo'],
  oddsRatios: [2.5, 1.8, 1.5],
})

// Calcular OR para tabaco
const cases = ccData.filter(p => p.case === 1)
const controls = ccData.filter(p => p.case === 0)

const a = cases.filter(p => p.tabaco === 1).length
const b = cases.filter(p => p.tabaco === 0).length
const c = controls.filter(p => p.tabaco === 1).length
const d = controls.filter(p => p.tabaco === 0).length

const OR = (a * d) / (b * c)
console.log(\`Odds Ratio tabaco: \${OR.toFixed(2)}\`)`,
  },
  {
    id: 'clinical-encounters',
    title: 'Encuentros Clinicos',
    description: 'Generacion de encuentros clinicos con diagnosticos CIE-10 y procedimientos',
    category: 'clinical',
    icon: FlaskRound,
    pythonCode: `from synthetic_health import EncounterGenerator

# Generar encuentros clinicos
gen = EncounterGenerator(seed=42)
encounters = gen.batch(
    n_patients=100,
    encounters_per_patient=(1, 5),
    include_diagnoses=True,
    include_procedures=True,
    include_medications=True
)

# Resumen de diagnosticos
from collections import Counter
dx_codes = [e['diagnosis_code'] for e in encounters]
print("Top 10 diagnosticos:")
for code, count in Counter(dx_codes).most_common(10):
    print(f"  {code}: {count}")`,
    rCode: `library(synthetichealth)
library(data.table)

# Generar encuentros clinicos
encounters <- generate_encounters(
  n_patients = 100,
  encounters_per_patient = c(1, 5),
  include_diagnoses = TRUE,
  include_procedures = TRUE,
  seed = 42
)

# Resumen de diagnosticos
dt <- data.table(encounters)
top_dx <- dt[, .N, by = diagnosis_code][order(-N)][1:10]
print(top_dx)

# Visualizar distribucion por tipo
library(ggplot2)
ggplot(encounters, aes(x = encounter_type)) +
  geom_bar(fill = "steelblue") +
  theme_minimal() +
  labs(title = "Distribucion de Tipos de Encuentro")`,
    tsCode: `import { generate } from '@/generators'

// Generar encuentros clinicos
const encounters = generate('encounters', 200, 42, {
  includeMultiple: true,
  includeDiagnoses: true,
  includeProcedures: true,
})

// Agrupar por tipo de encuentro
const byType = encounters.reduce((acc, e) => {
  acc[e.encounter_type] = (acc[e.encounter_type] || 0) + 1
  return acc
}, {} as Record<string, number>)

console.log('Distribucion por tipo:')
Object.entries(byType)
  .sort((a, b) => b[1] - a[1])
  .forEach(([type, count]) => {
    console.log(\`  \${type}: \${count}\`)
  })`,
  },
]

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <pre className="bg-background border border-border rounded-lg p-4 overflow-x-auto text-sm">
        <code className="text-muted-foreground">{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
        aria-label="Copiar codigo"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}

export function Examples() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [liveData, setLiveData] = useState<Record<string, unknown>[] | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'epidemiology', label: 'Epidemiologia' },
    { id: 'biostatistics', label: 'Bioestadistica' },
    { id: 'clinical', label: 'Clinicos' },
  ]

  const filteredExamples = selectedCategory === 'all'
    ? examples
    : examples.filter(e => e.category === selectedCategory)

  const runLiveDemo = async (exampleId: string) => {
    setIsGenerating(true)
    try {
      let data: Record<string, unknown>[]
      switch (exampleId) {
        case 'sir-model':
          data = generate('sir', 100, 42)
          break
        case 'survival-analysis':
          data = generate('survival', 100, 42)
          break
        case 'case-control':
          data = generate('casecontrol', 100, 42)
          break
        case 'clinical-encounters':
          data = generate('encounters', 50, 42)
          break
        default:
          data = []
      }
      setLiveData(data)
    } catch (error) {
      console.error('Error generating data:', error)
    }
    setIsGenerating(false)
  }

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Ejemplos Interactivos</h1>
          <p className="text-muted-foreground">
            Explora casos de uso con codigo ejecutable en Python, R y TypeScript
          </p>
        </div>

        {/* Interactive Charts Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Visualizaciones en Vivo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* SIR Model Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Modelo SIR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={sirData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                      }}
                    />
                    <Area type="monotone" dataKey="susceptible" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Susceptibles" />
                    <Area type="monotone" dataKey="infected" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Infectados" />
                    <Area type="monotone" dataKey="recovered" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} name="Recuperados" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Survival Curves */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Curvas de Supervivencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={survivalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} label={{ value: 'Meses', position: 'bottom', fontSize: 10 }} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line type="stepAfter" dataKey="treatment" stroke="#3b82f6" strokeWidth={2} name="Tratamiento" dot={false} />
                    <Line type="stepAfter" dataKey="control" stroke="#ef4444" strokeWidth={2} name="Control" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Incidence by Region */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Incidencia por Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={incidenceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis dataKey="region" type="category" stroke="var(--muted-foreground)" fontSize={10} width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="cases" fill="#3b82f6" name="Casos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Examples Grid */}
        <div className="space-y-8">
          {filteredExamples.map((example) => (
            <Card key={example.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <example.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{example.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {example.category === 'epidemiology' ? 'Epidemiologia' :
                     example.category === 'biostatistics' ? 'Bioestadistica' :
                     example.category === 'clinical' ? 'Clinico' : example.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="python" className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <TabsList>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="r">R</TabsTrigger>
                      <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                    </TabsList>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => runLiveDemo(example.id)}
                      disabled={isGenerating}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Ejecutar Demo
                    </Button>
                  </div>
                  <TabsContent value="python">
                    <CodeBlock code={example.pythonCode} />
                  </TabsContent>
                  <TabsContent value="r">
                    <CodeBlock code={example.rCode} />
                  </TabsContent>
                  <TabsContent value="typescript">
                    <CodeBlock code={example.tsCode} />
                  </TabsContent>
                </Tabs>

                {/* Live Demo Output */}
                {liveData && (
                  <div className="mt-4 p-4 bg-background border border-border rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Datos generados ({liveData.length} registros):</h4>
                    <pre className="text-xs overflow-x-auto max-h-32 text-muted-foreground">
                      {JSON.stringify(liveData.slice(0, 5), null, 2)}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
