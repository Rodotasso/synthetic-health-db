import { Card, CardContent, Badge } from '@/components/ui'
import { Sparkles, Bug, Wrench, BookOpen, Zap, Package } from 'lucide-react'

interface ChangelogEntry {
  version: string
  date: string
  highlights?: string
  changes: {
    type: 'feature' | 'fix' | 'improvement' | 'docs' | 'breaking' | 'deprecation'
    description: string
  }[]
}

const changelog: ChangelogEntry[] = [
  {
    version: '1.2.0',
    date: '2025-01-27',
    highlights: 'Profesionalizacion del frontend con dark/light mode y nuevas paginas',
    changes: [
      { type: 'feature', description: 'Agregado toggle de tema oscuro/claro con persistencia en localStorage' },
      { type: 'feature', description: 'Nueva pagina de Ejemplos con visualizaciones interactivas usando Recharts' },
      { type: 'feature', description: 'Nueva pagina de Tutoriales con guias paso a paso' },
      { type: 'feature', description: 'Nueva pagina de Changelog' },
      { type: 'improvement', description: 'Nuevo logo SVG profesional y favicon' },
      { type: 'improvement', description: 'Meta tags SEO completos (Open Graph, Twitter Card, Schema.org)' },
      { type: 'improvement', description: 'Header responsive con menu mobile' },
      { type: 'improvement', description: 'Sitemap.xml y robots.txt para mejor indexacion' },
    ]
  },
  {
    version: '1.1.0',
    date: '2025-01-20',
    highlights: 'Sistema de Patient ID y generadores de vigilancia epidemiologica',
    changes: [
      { type: 'feature', description: 'Nuevo sistema de Patient ID con formato SHDB-{year}-{sex}-{region}-{hash}' },
      { type: 'feature', description: 'Generador de vigilancia epidemiologica con alertas y brotes' },
      { type: 'feature', description: 'Generador de outbreak para epidemias point-source y propagadas' },
      { type: 'feature', description: 'Generador de series temporales con tendencia, estacionalidad y ruido' },
      { type: 'improvement', description: 'Builder con 4 presets: Cohorte, Supervivencia, Caso-Control, Brote' },
      { type: 'fix', description: 'Corregido calculo de R0 en modelo SIR' },
      { type: 'docs', description: 'Documentacion de API actualizada con nuevos generadores' },
    ]
  },
  {
    version: '1.0.0',
    date: '2025-01-10',
    highlights: 'Lanzamiento inicial con 18 generadores',
    changes: [
      { type: 'feature', description: 'Frontend React 19 + Vite + TypeScript + Tailwind 4' },
      { type: 'feature', description: '9 generadores medicos: demographics, cie10, encounters, medications, observations, vitals, immunizations, conditions, procedures' },
      { type: 'feature', description: '4 generadores epidemiologicos: SIR, SEIR, surveillance, outbreak' },
      { type: 'feature', description: '2 generadores bioestadisticos: survival_cohort, case_control' },
      { type: 'feature', description: '4 generadores de regresion: linear, logistic, poisson, cox' },
      { type: 'feature', description: 'Wizard de generacion con preview y descarga CSV/JSON' },
      { type: 'feature', description: 'Builder para schemas relacionales con joins' },
      { type: 'feature', description: 'Catalogo de schemas con busqueda y filtros' },
      { type: 'feature', description: 'Datos referenciales Chile: comunas, medicamentos ATC, vacunas PNI, GES, FONASA' },
    ]
  },
  {
    version: '0.9.0',
    date: '2024-12-15',
    highlights: 'Beta publica con generadores core',
    changes: [
      { type: 'feature', description: 'Generadores iniciales de demographics y CIE-10' },
      { type: 'feature', description: 'RNG deterministico con Mulberry32 para reproducibilidad' },
      { type: 'feature', description: 'Interfaz basica de generacion' },
      { type: 'docs', description: 'Documentacion inicial' },
    ]
  },
]

const typeConfig = {
  feature: {
    icon: Sparkles,
    label: 'Nueva funcionalidad',
    color: 'bg-green-500/10 text-green-500',
  },
  fix: {
    icon: Bug,
    label: 'Correccion',
    color: 'bg-red-500/10 text-red-500',
  },
  improvement: {
    icon: Zap,
    label: 'Mejora',
    color: 'bg-blue-500/10 text-blue-500',
  },
  docs: {
    icon: BookOpen,
    label: 'Documentacion',
    color: 'bg-purple-500/10 text-purple-500',
  },
  breaking: {
    icon: Wrench,
    label: 'Breaking change',
    color: 'bg-orange-500/10 text-orange-500',
  },
  deprecation: {
    icon: Package,
    label: 'Deprecacion',
    color: 'bg-yellow-500/10 text-yellow-500',
  },
}

function ChangelogItem({ entry, isLatest }: { entry: ChangelogEntry; isLatest: boolean }) {
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-[11px] top-8 bottom-0 w-px bg-border" />

      {/* Timeline dot */}
      <div className={`absolute left-0 top-2 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
        isLatest ? 'bg-primary border-primary' : 'bg-background border-border'
      }`}>
        {isLatest && <span className="w-2 h-2 bg-primary-foreground rounded-full" />}
      </div>

      {/* Content */}
      <Card className={isLatest ? 'border-primary/50' : ''}>
        <CardContent className="pt-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold">v{entry.version}</h3>
              {isLatest && (
                <Badge variant="default" className="text-xs">
                  Ultimo
                </Badge>
              )}
            </div>
            <time className="text-sm text-muted-foreground">{entry.date}</time>
          </div>

          {/* Highlights */}
          {entry.highlights && (
            <p className="text-muted-foreground mb-4 pb-4 border-b border-border">
              {entry.highlights}
            </p>
          )}

          {/* Changes */}
          <ul className="space-y-3">
            {entry.changes.map((change, index) => {
              const config = typeConfig[change.type]
              const Icon = config.icon
              return (
                <li key={index} className="flex items-start gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium shrink-0 ${config.color}`}>
                    <Icon className="h-3 w-3" />
                    {config.label}
                  </span>
                  <span className="text-sm text-foreground">{change.description}</span>
                </li>
              )
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export function Changelog() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Changelog</h1>
          <p className="text-muted-foreground">
            Historial de cambios y nuevas funcionalidades de Synthetic Health DB
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-primary">{changelog.length}</div>
              <div className="text-xs text-muted-foreground">Versiones</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-green-500">
                {changelog.reduce((acc, e) => acc + e.changes.filter(c => c.type === 'feature').length, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Features</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-red-500">
                {changelog.reduce((acc, e) => acc + e.changes.filter(c => c.type === 'fix').length, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Fixes</div>
            </CardContent>
          </Card>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-8 p-4 bg-card rounded-lg border border-border">
          {Object.entries(typeConfig).map(([key, config]) => {
            const Icon = config.icon
            return (
              <span key={key} className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs ${config.color}`}>
                <Icon className="h-3 w-3" />
                {config.label}
              </span>
            )
          })}
        </div>

        {/* Timeline */}
        <div className="relative">
          {changelog.map((entry, index) => (
            <ChangelogItem key={entry.version} entry={entry} isLatest={index === 0} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Sigue las actualizaciones en{' '}
            <a
              href="https://github.com/Rodotasso/synthetic-health-db/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub Releases
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
