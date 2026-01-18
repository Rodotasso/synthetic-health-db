---
description: Implementar wizard 4 pasos con preview y download
dependencies: [frontend-pages, frontend-generators]
---

# /frontend-wizard

Wizard completo de generación en 4 pasos.

## src/pages/Wizard.tsx
```typescript
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { StepObjective } from '@/components/wizard/StepObjective'
import { StepConfig } from '@/components/wizard/StepConfig'
import { StepColumns } from '@/components/wizard/StepColumns'
import { StepGenerate } from '@/components/wizard/StepGenerate'

export interface WizardState {
  schema: string
  rows: number
  seed: number
  options: Record<string, any>
}

export function Wizard() {
  const [params] = useSearchParams()
  const [step, setStep] = useState(1)
  const [state, setState] = useState<WizardState>({
    schema: params.get('schema') || '',
    rows: 10000,
    seed: 42,
    options: {}
  })

  const steps = [
    { n: 1, title: 'Objetivo', component: StepObjective },
    { n: 2, title: 'Configuración', component: StepConfig },
    { n: 3, title: 'Columnas', component: StepColumns },
    { n: 4, title: 'Generar', component: StepGenerate },
  ]

  const CurrentStep = steps[step - 1].component

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress */}
      <div className="mb-8 flex justify-center gap-2">
        {steps.map((s) => (
          <div key={s.n} className={`flex items-center gap-2 ${step >= s.n ? 'text-primary' : 'text-muted-foreground'}`}>
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= s.n ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
              {s.n}
            </span>
            <span className="hidden sm:inline">{s.title}</span>
            {s.n < 4 && <span className="mx-2">→</span>}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <CurrentStep 
        state={state} 
        setState={setState} 
        onNext={() => setStep(s => Math.min(s + 1, 4))}
        onBack={() => setStep(s => Math.max(s - 1, 1))}
      />
    </div>
  )
}
```

## src/components/wizard/StepObjective.tsx
```typescript
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WizardState } from '@/pages/Wizard'

const OBJECTIVES = [
  { schema: 'survival', title: 'Supervivencia', desc: 'Kaplan-Meier, Log-rank', category: 'Biostatistics' },
  { schema: 'logistic', title: 'Regresión Logística', desc: 'OR, AUC-ROC', category: 'Regression' },
  { schema: 'sir', title: 'Modelo SIR', desc: 'Curva epidémica, R0', category: 'Epidemiology' },
  { schema: 'demographics', title: 'Demográficos', desc: 'Distribución poblacional', category: 'Medical' },
  { schema: 'cie10', title: 'Testing CIE-10', desc: 'Fuzzy match, errores', category: 'Medical' },
  { schema: 'surveillance', title: 'Vigilancia', desc: 'Alertas, z-score', category: 'Epidemiology' },
]

interface Props {
  state: WizardState
  setState: (s: WizardState) => void
  onNext: () => void
}

export function StepObjective({ state, setState, onNext }: Props) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-center">¿Qué quieres analizar?</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {OBJECTIVES.map((o) => (
          <Card 
            key={o.schema}
            className={`cursor-pointer transition-colors ${state.schema === o.schema ? 'border-primary bg-primary/10' : 'hover:border-primary/50'}`}
            onClick={() => setState({ ...state, schema: o.schema })}
          >
            <span className="mb-2 inline-block rounded bg-primary/20 px-2 py-1 text-xs">{o.category}</span>
            <CardTitle>{o.title}</CardTitle>
            <CardDescription>{o.desc}</CardDescription>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button onClick={onNext} disabled={!state.schema}>Siguiente</Button>
      </div>
    </div>
  )
}
```

## src/components/wizard/StepConfig.tsx
```typescript
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { WizardState } from '@/pages/Wizard'

interface Props {
  state: WizardState
  setState: (s: WizardState) => void
  onNext: () => void
  onBack: () => void
}

export function StepConfig({ state, setState, onNext, onBack }: Props) {
  return (
    <Card className="mx-auto max-w-lg">
      <h2 className="mb-6 text-xl font-bold">Configuración</h2>
      
      <div className="mb-4">
        <label className="mb-2 block text-sm">Filas: {state.rows.toLocaleString()}</label>
        <input 
          type="range" 
          min="100" max="500000" step="100"
          value={state.rows}
          onChange={(e) => setState({ ...state, rows: +e.target.value })}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm">Seed (reproducibilidad)</label>
        <input 
          type="number"
          value={state.seed}
          onChange={(e) => setState({ ...state, seed: +e.target.value })}
          className="w-full rounded border border-border bg-background px-3 py-2"
        />
      </div>

      {state.schema === 'cie10' && (
        <div className="mb-4">
          <label className="mb-2 block text-sm">Tipos de errores</label>
          <div className="flex flex-wrap gap-2">
            {['spaces', 'lowercase', 'truncated', 'invalid'].map((e) => (
              <label key={e} className="flex items-center gap-1 rounded bg-secondary px-2 py-1 text-sm">
                <input 
                  type="checkbox"
                  checked={state.options[e] || false}
                  onChange={(ev) => setState({ ...state, options: { ...state.options, [e]: ev.target.checked } })}
                />
                {e}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Atrás</Button>
        <Button onClick={onNext}>Siguiente</Button>
      </div>
    </Card>
  )
}
```

## src/components/wizard/StepColumns.tsx
Preview de columnas según schema seleccionado. Mostrar nombres y tipos.

## src/components/wizard/StepGenerate.tsx
```typescript
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DataPreview } from '@/components/common/DataPreview'
import { StatsPanel } from '@/components/common/StatsPanel'
import { useDownload } from '@/hooks/useDownload'
import { useSchemaHistory } from '@/hooks/useSchemaHistory'
import * as generators from '@/generators'
import { WizardState } from '@/pages/Wizard'

interface Props {
  state: WizardState
  onBack: () => void
}

export function StepGenerate({ state, onBack }: Props) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { downloadCSV, downloadJSON } = useDownload()
  const { recordUsage } = useSchemaHistory()

  const generate = () => {
    setLoading(true)
    setTimeout(() => {
      let result: any[]
      switch (state.schema) {
        case 'demographics': result = generators.generateDemographics(state.rows, state.seed); break
        case 'cie10': result = generators.generateCIE10(state.rows, state.seed, state.options); break
        case 'survival': result = generators.generateSurvival(state.rows, state.seed); break
        case 'sir': result = generators.generateSIR(state.rows, state.seed); break
        default: result = []
      }
      setData(result)
      recordUsage(state.schema, state)
      setLoading(false)
    }, 50)
  }

  return (
    <div>
      <div className="mb-6 flex justify-center gap-4">
        <Button variant="outline" onClick={onBack}>Atrás</Button>
        <Button onClick={generate} disabled={loading}>{loading ? 'Generando...' : 'Generar'}</Button>
      </div>

      {data.length > 0 && (
        <>
          <StatsPanel data={data} />
          <DataPreview data={data} />
          <div className="mt-4 flex justify-center gap-4">
            <Button onClick={() => downloadCSV(data, state.schema)}>Descargar CSV</Button>
            <Button variant="secondary" onClick={() => downloadJSON(data, state.schema)}>Descargar JSON</Button>
          </div>
        </>
      )}
    </div>
  )
}
```

## src/components/common/DataPreview.tsx
```typescript
interface Props { data: any[] }

export function DataPreview({ data }: Props) {
  if (!data.length) return null
  const cols = Object.keys(data[0])
  const preview = data.slice(0, 20)

  return (
    <div className="overflow-x-auto rounded border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary">
          <tr>{cols.map(c => <th key={c} className="px-3 py-2 text-left">{c}</th>)}</tr>
        </thead>
        <tbody>
          {preview.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {cols.map(c => <td key={c} className="px-3 py-2">{String(row[c])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-secondary px-3 py-2 text-xs text-muted-foreground">
        Mostrando {preview.length} de {data.length.toLocaleString()} filas
      </div>
    </div>
  )
}
```

## src/components/common/StatsPanel.tsx
```typescript
interface Props { data: any[] }

export function StatsPanel({ data }: Props) {
  const cols = data.length ? Object.keys(data[0]).length : 0
  const size = new Blob([JSON.stringify(data)]).size

  return (
    <div className="mb-4 grid grid-cols-3 gap-4">
      <div className="rounded bg-secondary p-4 text-center">
        <div className="text-2xl font-bold text-primary">{data.length.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">Filas</div>
      </div>
      <div className="rounded bg-secondary p-4 text-center">
        <div className="text-2xl font-bold text-primary">{cols}</div>
        <div className="text-xs text-muted-foreground">Columnas</div>
      </div>
      <div className="rounded bg-secondary p-4 text-center">
        <div className="text-2xl font-bold text-primary">{(size / 1024).toFixed(0)} KB</div>
        <div className="text-xs text-muted-foreground">Tamaño</div>
      </div>
    </div>
  )
}
```

## src/hooks/useDownload.ts
```typescript
export function useDownload() {
  const toCSV = (data: any[]) => {
    if (!data.length) return ''
    const cols = Object.keys(data[0])
    return cols.join(',') + '\n' + data.map(r => cols.map(c => r[c]).join(',')).join('\n')
  }

  const download = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return {
    downloadCSV: (data: any[], name: string) => download(toCSV(data), `${name}_${data.length}.csv`, 'text/csv'),
    downloadJSON: (data: any[], name: string) => download(JSON.stringify(data, null, 2), `${name}_${data.length}.json`, 'application/json')
  }
}
```

## src/hooks/useSchemaHistory.ts
```typescript
const STORAGE_KEY = 'shdb_schemas'

interface SchemaUsage {
  name: string
  count: number
  lastUsed: string
  config?: any
}

export function useSchemaHistory() {
  const getHistory = (): Record<string, SchemaUsage> => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
    catch { return {} }
  }

  const recordUsage = (name: string, config?: any) => {
    const h = getHistory()
    h[name] = {
      name,
      count: (h[name]?.count || 0) + 1,
      lastUsed: new Date().toISOString(),
      config: (h[name]?.count || 0) >= 2 ? config : undefined // Guarda config si count >= 3
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(h))
  }

  const getFrequent = () => Object.values(getHistory()).filter(s => s.count >= 3)

  return { recordUsage, getFrequent, getHistory }
}
```

## Verificación

Wizard completo: seleccionar schema → configurar → generar → descargar CSV funcional.
