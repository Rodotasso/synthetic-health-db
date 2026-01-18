import { Link } from 'react-router-dom'
import { Database, BookOpen, Wand2, Blocks, ArrowRight, GraduationCap, CheckCircle2, Code2, FileText } from 'lucide-react'

import { schemas, categoryLabels } from '@/data/schemas'

const courseTable = [
  {
    course: 'Epidemiología',
    schemas: ['sir', 'seir', 'surveillance', 'outbreak'],
    activities: 'Calcular R0, construir curvas epidémicas, análisis de brotes',
  },
  {
    course: 'Bioestadística',
    schemas: ['survival_cohort', 'case_control'],
    activities: 'Kaplan-Meier, log-rank test, cálculo de OR/RR',
  },
  {
    course: 'Estadística aplicada',
    schemas: ['linear', 'logistic', 'poisson', 'cox'],
    activities: 'Ajustar GLM, interpretar coeficientes, diagnósticos',
  },
  {
    course: 'Vigilancia en salud',
    schemas: ['surveillance', 'outbreak'],
    activities: 'Construir canales endémicos, detectar alertas, series temporales',
  },
  {
    course: 'Salud digital',
    schemas: ['demographics', 'encounters', 'cie10'],
    activities: 'Diseñar esquemas relacionales, realizar joins, normalización',
  },
  {
    course: 'Metodología',
    schemas: ['case_control', 'survival_cohort'],
    activities: 'Formular hipótesis, calcular tamaño muestral, plan de análisis',
  },
]

const competencies = [
  { name: 'Gestión de datos', description: 'Carga, limpieza, transformación y joins de tablas clínicas' },
  { name: 'Modelado estadístico', description: 'Regresión, supervivencia, modelos epidemiológicos' },
  { name: 'Reproducibilidad', description: 'Seeds determinísticos para resultados replicables' },
  { name: 'Privacidad', description: 'Datos sintéticos sin información real de pacientes' },
  { name: 'Análisis epidemiológico', description: 'Medidas de frecuencia, asociación y vigilancia' },
]

export function Home() {
  const schemasByCategory = schemas.reduce((acc, schema) => {
    acc[schema.category] = (acc[schema.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10">
              <Database className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Synthetic Health DB
          </h1>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Plataforma para generar bases de datos sintéticas de salud.
            Datos realistas sin comprometer privacidad.
          </p>
          <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ideal para <strong>docencia</strong> (ejercicios prácticos sin datos reales), 
            <strong> investigación</strong> (pruebas de concepto y metodologías), 
            y <strong>desarrollo</strong> (testing de pipelines y dashboards).
            Generación 100% en el navegador, reproducible con seeds.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/wizard"
              className="inline-flex items-center justify-center gap-2 h-11 px-8 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors"
            >
              <Wand2 className="w-5 h-5" />
              Comenzar con Wizard
            </Link>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center gap-2 h-11 px-8 rounded-md border border-border bg-transparent hover:bg-accent hover:text-accent-foreground font-medium transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Ver Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Catálogo */}
            <Link
              to="/catalog"
              className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                Catálogo
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
              <p className="text-muted-foreground text-sm">
                Explora {schemas.length} esquemas organizados por categoría.
              </p>
            </Link>

            {/* Wizard */}
            <Link
              to="/wizard"
              className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Wand2 className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                Wizard
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
              <p className="text-muted-foreground text-sm">
                Genera datos paso a paso con previsualización.
              </p>
            </Link>

            {/* Builder */}
            <Link
              to="/builder"
              className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Blocks className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                Builder
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
              <p className="text-muted-foreground text-sm">
                Combina esquemas para bases complejas con relaciones.
              </p>
            </Link>

            {/* Docs */}
            <Link
              to="/docs"
              className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                Documentación
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
              <p className="text-muted-foreground text-sm">
                Diccionario de datos, diagrama ER y ejemplos de código.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Esquemas Disponibles</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(schemasByCategory).map(([category, count]) => (
              <div key={category} className="p-4 rounded-lg bg-card border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-1">{count}</div>
                <div className="text-sm text-muted-foreground">{categoryLabels[category]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para Docentes */}
      <section className="py-12 px-4 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <GraduationCap className="w-7 h-7 text-primary" />
            <h2 className="text-2xl font-bold">Para Docentes</h2>
          </div>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schemas sugeridos por asignatura con actividades prácticas listas para usar en clase.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Asignatura</th>
                  <th className="text-left py-3 px-4 font-semibold">Schemas sugeridos</th>
                  <th className="text-left py-3 px-4 font-semibold">Actividades prácticas</th>
                </tr>
              </thead>
              <tbody>
                {courseTable.map((row) => (
                  <tr key={row.course} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4 font-medium">{row.course}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {row.schemas.map((s) => (
                          <Link
                            key={s}
                            to={`/wizard?schema=${s}`}
                            className="text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            {s}
                          </Link>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.activities}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Competencias */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <CheckCircle2 className="w-7 h-7 text-primary" />
            <h2 className="text-2xl font-bold">Competencias que se Entrenan</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competencies.map((comp) => (
              <div key={comp.name} className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-semibold mb-1">{comp.name}</h3>
                <p className="text-sm text-muted-foreground">{comp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-12 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Code2 className="w-7 h-7 text-primary" />
            <h2 className="text-2xl font-bold">Quick Start</h2>
          </div>
          <p className="text-center text-muted-foreground mb-8">
            Descarga un CSV desde el Wizard y cárgalo en R o Python en segundos.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* R */}
            <div className="rounded-lg border border-border bg-background overflow-hidden">
              <div className="px-4 py-2 bg-secondary/50 border-b border-border font-mono text-sm">
                R / tidyverse
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code>{`library(readr)
library(dplyr)

# Cargar datos
datos <- read_csv("demographics.csv")

# Explorar
datos |> 
  count(sex, region) |> 
  arrange(desc(n))

# Análisis
datos |> 
  group_by(region) |> 
  summarise(
    edad_media = mean(age),
    n = n()
  )`}</code>
              </pre>
            </div>

            {/* Python */}
            <div className="rounded-lg border border-border bg-background overflow-hidden">
              <div className="px-4 py-2 bg-secondary/50 border-b border-border font-mono text-sm">
                Python / pandas
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code>{`import pandas as pd

# Cargar datos
datos = pd.read_csv("demographics.csv")

# Explorar
print(datos.groupby(["sex", "region"])
      .size()
      .sort_values(ascending=False))

# Análisis
datos.groupby("region").agg({
    "age": ["mean", "count"]
})`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Casos de Uso</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2">Docencia</h3>
              <p className="text-sm text-muted-foreground">
                Genera datasets para enseñar análisis de supervivencia, regresión logística,
                o modelos epidemiológicos sin usar datos reales de pacientes.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2">Investigación</h3>
              <p className="text-sm text-muted-foreground">
                Crea datos sintéticos para pruebas de concepto, desarrollo de metodologías,
                o simulaciones de escenarios epidemiológicos.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2">Testing de Software</h3>
              <p className="text-sm text-muted-foreground">
                Genera datos para probar pipelines de análisis, dashboards,
                o sistemas de información en salud.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2">Privacidad</h3>
              <p className="text-sm text-muted-foreground">
                Comparte datos sintéticos en lugar de datos reales para colaboraciones
                sin preocupaciones de confidencialidad.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
