import { useState } from 'react'
import { FileText, Database, Code2, Link as LinkIcon } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, Badge } from '@/components/ui'
import { schemas, categoryLabels, categoryColors } from '@/data/schemas'
import type { SchemaCategory } from '@/types'

const categories: (SchemaCategory | 'all')[] = ['all', 'medical', 'epidemiology', 'biostatistics', 'regression']

// Diagrama ER como SVG inline
function ERDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto max-w-4xl mx-auto">
      {/* Background */}
      <rect width="800" height="500" fill="transparent" />
      
      {/* Title */}
      <text x="400" y="30" textAnchor="middle" className="fill-foreground text-lg font-bold">
        Diagrama de Relaciones - Schemas Médicos
      </text>
      
      {/* Demographics Box */}
      <g transform="translate(50, 60)">
        <rect width="180" height="130" rx="8" className="fill-card stroke-border" strokeWidth="2" />
        <rect width="180" height="32" rx="8" className="fill-blue-500/20" />
        <text x="90" y="22" textAnchor="middle" className="fill-blue-400 text-sm font-semibold">demographics</text>
        <line x1="0" y1="32" x2="180" y2="32" className="stroke-border" strokeWidth="1" />
        <text x="12" y="52" className="fill-foreground text-xs font-mono">patient_id</text>
        <text x="168" y="52" textAnchor="end" className="fill-yellow-400 text-xs">PK</text>
        <text x="12" y="72" className="fill-muted-foreground text-xs font-mono">age</text>
        <text x="12" y="92" className="fill-muted-foreground text-xs font-mono">sex</text>
        <text x="12" y="112" className="fill-muted-foreground text-xs font-mono">region, ses</text>
      </g>
      
      {/* Encounters Box */}
      <g transform="translate(310, 60)">
        <rect width="180" height="130" rx="8" className="fill-card stroke-border" strokeWidth="2" />
        <rect width="180" height="32" rx="8" className="fill-blue-500/20" />
        <text x="90" y="22" textAnchor="middle" className="fill-blue-400 text-sm font-semibold">encounters</text>
        <line x1="0" y1="32" x2="180" y2="32" className="stroke-border" strokeWidth="1" />
        <text x="12" y="52" className="fill-foreground text-xs font-mono">encounter_id</text>
        <text x="168" y="52" textAnchor="end" className="fill-yellow-400 text-xs">PK</text>
        <text x="12" y="72" className="fill-foreground text-xs font-mono">patient_id</text>
        <text x="168" y="72" textAnchor="end" className="fill-cyan-400 text-xs">FK</text>
        <text x="12" y="92" className="fill-muted-foreground text-xs font-mono">date, service</text>
        <text x="12" y="112" className="fill-muted-foreground text-xs font-mono">provider_id</text>
      </g>
      
      {/* CIE10 Box */}
      <g transform="translate(570, 60)">
        <rect width="180" height="130" rx="8" className="fill-card stroke-border" strokeWidth="2" />
        <rect width="180" height="32" rx="8" className="fill-blue-500/20" />
        <text x="90" y="22" textAnchor="middle" className="fill-blue-400 text-sm font-semibold">cie10</text>
        <line x1="0" y1="32" x2="180" y2="32" className="stroke-border" strokeWidth="1" />
        <text x="12" y="52" className="fill-foreground text-xs font-mono">patient_id</text>
        <text x="168" y="52" textAnchor="end" className="fill-cyan-400 text-xs">FK</text>
        <text x="12" y="72" className="fill-muted-foreground text-xs font-mono">code</text>
        <text x="12" y="92" className="fill-muted-foreground text-xs font-mono">description</text>
        <text x="12" y="112" className="fill-muted-foreground text-xs font-mono">date</text>
      </g>
      
      {/* Relationship lines */}
      <line x1="230" y1="125" x2="310" y2="125" className="stroke-primary" strokeWidth="2" />
      <line x1="490" y1="125" x2="570" y2="125" className="stroke-primary" strokeWidth="2" />
      <text x="270" y="115" textAnchor="middle" className="fill-muted-foreground text-xs">1:N</text>
      <text x="530" y="115" textAnchor="middle" className="fill-muted-foreground text-xs">1:N</text>
      
      {/* Epidemiology Section */}
      <text x="400" y="230" textAnchor="middle" className="fill-foreground text-sm font-semibold">
        Schemas de Epidemiología (independientes)
      </text>
      
      <g transform="translate(50, 250)">
        <rect width="160" height="80" rx="8" className="fill-card stroke-border" strokeWidth="2" />
        <rect width="160" height="28" rx="8" className="fill-green-500/20" />
        <text x="80" y="19" textAnchor="middle" className="fill-green-400 text-xs font-semibold">sir / seir</text>
        <text x="12" y="48" className="fill-muted-foreground text-xs font-mono">day, S, I, R, [E]</text>
        <text x="12" y="68" className="fill-muted-foreground text-xs">Modelos compartimentales</text>
      </g>
      
      <g transform="translate(230, 250)">
        <rect width="160" height="80" rx="8" className="fill-card stroke-border" strokeWidth="2" />
        <rect width="160" height="28" rx="8" className="fill-green-500/20" />
        <text x="80" y="19" textAnchor="middle" className="fill-green-400 text-xs font-semibold">surveillance</text>
        <text x="12" y="48" className="fill-muted-foreground text-xs font-mono">week, cases, alert</text>
        <text x="12" y="68" className="fill-muted-foreground text-xs">Vigilancia epidemiológica</text>
      </g>
      
      <g transform="translate(410, 250)">
        <rect width="160" height="80" rx="8" className="fill-card stroke-border" strokeWidth="2" />
        <rect width="160" height="28" rx="8" className="fill-green-500/20" />
        <text x="80" y="19" textAnchor="middle" className="fill-green-400 text-xs font-semibold">outbreak</text>
        <text x="12" y="48" className="fill-muted-foreground text-xs font-mono">case_id, generation</text>
        <text x="12" y="68" className="fill-muted-foreground text-xs">Árbol de transmisión</text>
      </g>
      
      {/* Biostatistics/Regression Section */}
      <text x="400" y="370" textAnchor="middle" className="fill-foreground text-sm font-semibold">
        Schemas de Bioestadística y Regresión
      </text>
      
      <g transform="translate(50, 390)">
        <rect width="140" height="70" rx="8" className="fill-card stroke-border" strokeWidth="2" />
        <rect width="140" height="26" rx="8" className="fill-purple-500/20" />
        <text x="70" y="18" textAnchor="middle" className="fill-purple-400 text-xs font-semibold">survival_cohort</text>
        <text x="12" y="44" className="fill-muted-foreground text-xs font-mono">time, event, group</text>
        <text x="12" y="60" className="fill-muted-foreground text-xs">Kaplan-Meier</text>
      </g>
      
      <g transform="translate(210, 390)">
        <rect width="140" height="70" rx="8" className="fill-card stroke-border" strokeWidth="2" />
        <rect width="140" height="26" rx="8" className="fill-purple-500/20" />
        <text x="70" y="18" textAnchor="middle" className="fill-purple-400 text-xs font-semibold">case_control</text>
        <text x="12" y="44" className="fill-muted-foreground text-xs font-mono">case, exposed, age</text>
        <text x="12" y="60" className="fill-muted-foreground text-xs">Odds Ratio</text>
      </g>
      
      <g transform="translate(370, 390)">
        <rect width="200" height="70" rx="8" className="fill-card stroke-border" strokeWidth="2" />
        <rect width="200" height="26" rx="8" className="fill-orange-500/20" />
        <text x="100" y="18" textAnchor="middle" className="fill-orange-400 text-xs font-semibold">linear / logistic / poisson</text>
        <text x="12" y="44" className="fill-muted-foreground text-xs font-mono">x1, x2, y/outcome/count</text>
        <text x="12" y="60" className="fill-muted-foreground text-xs">Modelos GLM</text>
      </g>
      
      <g transform="translate(590, 390)">
        <rect width="140" height="70" rx="8" className="fill-card stroke-border" strokeWidth="2" />
        <rect width="140" height="26" rx="8" className="fill-orange-500/20" />
        <text x="70" y="18" textAnchor="middle" className="fill-orange-400 text-xs font-semibold">cox</text>
        <text x="12" y="44" className="fill-muted-foreground text-xs font-mono">time, event, treatment</text>
        <text x="12" y="60" className="fill-muted-foreground text-xs">Hazard Ratio</text>
      </g>
      
      {/* Legend */}
      <g transform="translate(600, 230)">
        <text x="0" y="0" className="fill-muted-foreground text-xs font-semibold">Leyenda:</text>
        <rect x="0" y="10" width="12" height="12" className="fill-yellow-400/30" />
        <text x="18" y="20" className="fill-muted-foreground text-xs">PK = Primary Key</text>
        <rect x="0" y="28" width="12" height="12" className="fill-cyan-400/30" />
        <text x="18" y="38" className="fill-muted-foreground text-xs">FK = Foreign Key</text>
      </g>
    </svg>
  )
}

// Code examples por schema
const codeExamples: Record<string, { r: string; python: string }> = {
  demographics: {
    r: `library(readr)
library(dplyr)

datos <- read_csv("demographics.csv")

# Pirámide poblacional por comuna
datos |> 
  count(sex, age_group = cut(age, breaks = seq(0, 100, 10)), comuna) |> 
  ggplot(aes(x = age_group, y = n, fill = sex)) +
  geom_col(position = "dodge") +
  facet_wrap(~comuna)`,
    python: `import pandas as pd

datos = pd.read_csv("demographics.csv")

# Distribución por región y previsión
datos.groupby(["region", "prevision"]).size().unstack(fill_value=0)`,
  },
  medications: {
    r: `library(readr)
library(dplyr)

datos <- read_csv("medications.csv")

# Top medicamentos por categoría ATC
datos |> 
  count(atc_category, medication_name, sort = TRUE) |> 
  group_by(atc_category) |> 
  slice_head(n = 5)`,
    python: `import pandas as pd

datos = pd.read_csv("medications.csv")

# Medicamentos del Formulario Nacional
fn_meds = datos[datos["formulario_nacional"] == True]
fn_meds.groupby("atc_category").size()`,
  },
  observations: {
    r: `library(readr)
library(dplyr)

datos <- read_csv("observations.csv")

# Valores críticos por categoría
datos |> 
  filter(interpretation %in% c("LL", "HH")) |> 
  count(category, interpretation)`,
    python: `import pandas as pd

datos = pd.read_csv("observations.csv")

# Distribución de interpretaciones
datos.groupby(["category", "interpretation"]).size().unstack()`,
  },
  vitals: {
    r: `library(readr)
library(ggplot2)

datos <- read_csv("vitals.csv")

# Distribución de presión arterial
datos |> 
  ggplot(aes(x = systolic_bp, y = diastolic_bp, color = bp_category)) +
  geom_point(alpha = 0.5)`,
    python: `import pandas as pd

datos = pd.read_csv("vitals.csv")

# Categorías de IMC
datos["bmi_category"].value_counts()`,
  },
  immunizations: {
    r: `library(readr)
library(dplyr)

datos <- read_csv("immunizations.csv")
  
# Cobertura por vacuna PNI
datos |> 
  filter(pni_schedule) |> 
  count(vaccine_name, dose_number)`,
    python: `import pandas as pd

datos = pd.read_csv("immunizations.csv")

# Vacunas más frecuentes
datos["vaccine_name"].value_counts().head(10)`,
  },
  conditions: {
    r: `library(readr)
library(dplyr)

datos <- read_csv("conditions.csv")

# Condiciones GES más frecuentes
datos |> 
  filter(ges_problem) |> 
  count(condition_name, sort = TRUE) |> 
  head(15)`,
    python: `import pandas as pd

datos = pd.read_csv("conditions.csv")

# Distribución por categoría CIE-10
datos.groupby("cie10_chapter").size().sort_values(ascending=False)`,
  },
  procedures: {
    r: `library(readr)
library(dplyr)

datos <- read_csv("procedures.csv")

# Procedimientos por complejidad y outcome
datos |> 
  count(complexity, outcome) |> 
  tidyr::pivot_wider(names_from = outcome, values_from = n)`,
    python: `import pandas as pd

datos = pd.read_csv("procedures.csv")

# Procedimientos GES
ges = datos[datos["ges_related"] == True]
ges.groupby("category").size()`,
  },
  organizations: {
    r: `library(readr)
library(dplyr)

datos <- read_csv("organizations.csv")

# Establecimientos por tipo y región
datos |> 
  count(organization_type, region, sort = TRUE)`,
    python: `import pandas as pd

datos = pd.read_csv("organizations.csv")

# Hospitales de alta complejidad
datos[datos["complexity"] == "Alta"].groupby("region").size()`,
  },
  survival_cohort: {
    r: `library(survival)
library(survminer)

datos <- read_csv("survival_cohort.csv")

# Kaplan-Meier
km_fit <- survfit(Surv(time, event) ~ group, data = datos)
ggsurvplot(km_fit, data = datos, pval = TRUE)

# Log-rank test
survdiff(Surv(time, event) ~ group, data = datos)`,
    python: `from lifelines import KaplanMeierFitter
import pandas as pd

datos = pd.read_csv("survival_cohort.csv")

kmf = KaplanMeierFitter()
for group in datos["group"].unique():
    mask = datos["group"] == group
    kmf.fit(datos.loc[mask, "time"], datos.loc[mask, "event"], label=group)
    kmf.plot_survival_function()`,
  },
  sir: {
    r: `library(readr)
library(ggplot2)
library(tidyr)

datos <- read_csv("sir.csv")

# Curva epidémica
datos |> 
  pivot_longer(cols = c(susceptible, infected, recovered)) |> 
  ggplot(aes(x = day, y = value, color = name)) +
  geom_line(linewidth = 1) +
  labs(title = "Modelo SIR", y = "Población")`,
    python: `import pandas as pd
import matplotlib.pyplot as plt

datos = pd.read_csv("sir.csv")

# Curva epidémica
datos.plot(x="day", y=["susceptible", "infected", "recovered"], 
           title="Modelo SIR")
plt.ylabel("Población")
plt.show()`,
  },
  logistic: {
    r: `library(readr)

datos <- read_csv("logistic.csv")

# Regresión logística
modelo <- glm(outcome ~ x1 + x2, data = datos, family = binomial)
summary(modelo)

# Odds Ratios
exp(coef(modelo))
exp(confint(modelo))`,
    python: `import pandas as pd
from sklearn.linear_model import LogisticRegression
import numpy as np

datos = pd.read_csv("logistic.csv")

X = datos[["x1", "x2"]]
y = datos["outcome"]

modelo = LogisticRegression()
modelo.fit(X, y)

# Odds Ratios
print("OR:", np.exp(modelo.coef_))`,
  },
}

// Default code example
const defaultCode = {
  r: `library(readr)
library(dplyr)

datos <- read_csv("schema.csv")

# Explorar estructura
glimpse(datos)
summary(datos)`,
  python: `import pandas as pd

datos = pd.read_csv("schema.csv")

# Explorar estructura
print(datos.info())
print(datos.describe())`,
}

export function Docs() {
  const [category, setCategory] = useState<SchemaCategory | 'all'>('all')
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null)

  const filteredSchemas = schemas.filter(
    (schema) => category === 'all' || schema.category === category
  )

  const getCodeExample = (schemaId: string) => {
    return codeExamples[schemaId] || defaultCode
  }

  return (
    <div className="flex-1 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Documentación</h1>
          </div>
          <p className="text-muted-foreground">
            Diccionario de datos, diagrama de relaciones y ejemplos de código para cada schema.
          </p>
        </div>

        {/* ER Diagram Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Diagrama de Relaciones</h2>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card overflow-x-auto">
            <ERDiagram />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Los schemas médicos (demographics, encounters, cie10) se relacionan mediante <code className="px-1 py-0.5 rounded bg-secondary">patient_id</code>.
            Los schemas de epidemiología y regresión son independientes y se usan para análisis específicos.
          </p>
        </section>

        {/* Data Dictionary Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <LinkIcon className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Diccionario de Datos</h2>
          </div>

          <Tabs defaultValue="all" onValueChange={(v) => setCategory(v as SchemaCategory | 'all')} className="mb-6">
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat === 'all' ? 'Todos' : categoryLabels[cat]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="space-y-6">
            {filteredSchemas.map((schema) => (
              <div key={schema.id} className="rounded-lg border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setSelectedSchema(selectedSchema === schema.id ? null : schema.id)}
                  className="w-full px-4 py-3 flex items-center justify-between bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge className={categoryColors[schema.category]}>
                      {categoryLabels[schema.category]}
                    </Badge>
                    <span className="font-semibold">{schema.name}</span>
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                      — {schema.description}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {schema.columns.length} columnas
                  </span>
                </button>

                {selectedSchema === schema.id && (
                  <div className="p-4 space-y-4">
                    {/* Columns table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-3 font-medium">Campo</th>
                            <th className="text-left py-2 px-3 font-medium">Tipo</th>
                            <th className="text-left py-2 px-3 font-medium">Descripción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schema.columns.map((col) => (
                            <tr key={col.name} className="border-b border-border/50">
                              <td className="py-2 px-3 font-mono text-primary">{col.name}</td>
                              <td className="py-2 px-3">
                                <Badge variant="outline">{col.type}</Badge>
                              </td>
                              <td className="py-2 px-3 text-muted-foreground">{col.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Analysis tags */}
                    {schema.analysis && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Análisis sugeridos:</span>
                        <div className="flex flex-wrap gap-1">
                          {schema.analysis.map((a) => (
                            <Badge key={a} variant="secondary" className="text-xs">
                              {a}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Default params */}
                    {schema.defaultParams && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Parámetros por defecto: </span>
                        <code className="px-2 py-1 rounded bg-secondary text-xs">
                          {JSON.stringify(schema.defaultParams)}
                        </code>
                      </div>
                    )}

                    {/* Code examples */}
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center gap-2 mb-3">
                        <Code2 className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm">Ejemplos de código</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-lg border border-border bg-background overflow-hidden">
                          <div className="px-3 py-1.5 bg-secondary/50 border-b border-border font-mono text-xs">
                            R / tidyverse
                          </div>
                          <pre className="p-3 text-xs overflow-x-auto">
                            <code>{getCodeExample(schema.id).r}</code>
                          </pre>
                        </div>
                        <div className="rounded-lg border border-border bg-background overflow-hidden">
                          <div className="px-3 py-1.5 bg-secondary/50 border-b border-border font-mono text-xs">
                            Python / pandas
                          </div>
                          <pre className="p-3 text-xs overflow-x-auto">
                            <code>{getCodeExample(schema.id).python}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
