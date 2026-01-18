import { Link } from 'react-router-dom'
import { Database, BookOpen, Wand2, Blocks, ArrowRight } from 'lucide-react'

import { schemas, categoryLabels } from '@/data/schemas'

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
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Genera bases de datos sintéticas para epidemiología y bioestadística.
            Ideal para docencia, investigación y pruebas de software.
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
          <div className="grid md:grid-cols-3 gap-6">
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
              <p className="text-muted-foreground">
                Explora {schemas.length} esquemas disponibles organizados por categoría.
                Desde demografía hasta modelos epidemiológicos.
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
              <p className="text-muted-foreground">
                Genera datos paso a paso: selecciona esquema, configura parámetros,
                previsualiza y descarga en CSV o JSON.
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
              <p className="text-muted-foreground">
                Combina múltiples esquemas para crear bases de datos complejas
                con relaciones 1:1 y 1:N.
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

      {/* Use Cases */}
      <section className="py-12 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Casos de Uso</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg border border-border bg-background">
              <h3 className="font-semibold mb-2">Docencia</h3>
              <p className="text-sm text-muted-foreground">
                Genera datasets para enseñar análisis de supervivencia, regresión logística,
                o modelos epidemiológicos sin usar datos reales de pacientes.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-background">
              <h3 className="font-semibold mb-2">Investigación</h3>
              <p className="text-sm text-muted-foreground">
                Crea datos sintéticos para pruebas de concepto, desarrollo de metodologías,
                o simulaciones de escenarios epidemiológicos.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-background">
              <h3 className="font-semibold mb-2">Testing de Software</h3>
              <p className="text-sm text-muted-foreground">
                Genera datos para probar pipelines de análisis, dashboards,
                o sistemas de información en salud.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-background">
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
