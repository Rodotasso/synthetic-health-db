import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Database, BookOpen, Wand2, Blocks } from 'lucide-react'

// Placeholder pages - will be expanded in Etapa 2
function Home() {
  return (
    <div className="min-h-screen p-8">
      <header className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-2">Synthetic Health DB</h1>
        <p className="text-muted-foreground text-lg">
          Generador de bases de datos sintéticas para epidemiología y bioestadística
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card: Catálogo */}
          <Link
            to="/catalog"
            className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Catálogo</h2>
            <p className="text-muted-foreground">
              Explora los generadores disponibles: CIE-10, demografía, epidemias, supervivencia y regresión.
            </p>
          </Link>

          {/* Card: Wizard */}
          <Link
            to="/wizard"
            className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Wand2 className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Wizard</h2>
            <p className="text-muted-foreground">
              Genera datos paso a paso: selecciona esquema, configura parámetros, previsualiza y descarga.
            </p>
          </Link>

          {/* Card: Builder */}
          <Link
            to="/builder"
            className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Blocks className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Builder</h2>
            <p className="text-muted-foreground">
              Combina múltiples esquemas para crear bases de datos complejas con relaciones 1:1 y 1:N.
            </p>
          </Link>
        </div>

        {/* Quick stats */}
        <div className="mt-12 p-6 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium">Generadores disponibles</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-3 rounded-md bg-secondary">
              <div className="text-2xl font-bold text-primary">CIE-10</div>
              <div className="text-sm text-muted-foreground">Diagnósticos</div>
            </div>
            <div className="p-3 rounded-md bg-secondary">
              <div className="text-2xl font-bold text-primary">Demo</div>
              <div className="text-sm text-muted-foreground">Demografía</div>
            </div>
            <div className="p-3 rounded-md bg-secondary">
              <div className="text-2xl font-bold text-primary">SIR</div>
              <div className="text-sm text-muted-foreground">Epidemias</div>
            </div>
            <div className="p-3 rounded-md bg-secondary">
              <div className="text-2xl font-bold text-primary">KM</div>
              <div className="text-sm text-muted-foreground">Supervivencia</div>
            </div>
            <div className="p-3 rounded-md bg-secondary">
              <div className="text-2xl font-bold text-primary">Reg</div>
              <div className="text-sm text-muted-foreground">Regresión</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function Catalog() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-primary hover:underline mb-4 inline-block">← Volver</Link>
        <h1 className="text-3xl font-bold mb-4">Catálogo de Generadores</h1>
        <p className="text-muted-foreground">Contenido de Etapa 2...</p>
      </div>
    </div>
  )
}

function Wizard() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-primary hover:underline mb-4 inline-block">← Volver</Link>
        <h1 className="text-3xl font-bold mb-4">Wizard de Generación</h1>
        <p className="text-muted-foreground">Contenido de Etapa 4...</p>
      </div>
    </div>
  )
}

function Builder() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-primary hover:underline mb-4 inline-block">← Volver</Link>
        <h1 className="text-3xl font-bold mb-4">Schema Builder</h1>
        <p className="text-muted-foreground">Contenido de Etapa 5...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter basename="/synthetic-health-db">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/wizard" element={<Wizard />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
