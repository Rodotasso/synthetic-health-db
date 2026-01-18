---
name: schema-builder
description: Implementar Builder de schemas y sistema de combinacion
dependencies: [frontend-wizard]
---

# @schema-builder

Agent para implementar Etapa 5: Builder + Combinaciones de schemas.

## Objetivo

Crear sistema que permita:
1. Editar columnas de schemas existentes
2. Combinar multiples schemas (1:1 o 1:N)
3. Usar presets predefinidos o drag-and-drop
4. Validar coherencia de datos combinados

## Archivos a Crear

### src/types/combination.ts
```typescript
export interface SchemaCombination {
  base: string
  layers: LayerConfig[]
  joinType: '1:1' | '1:N'
  coherenceCheck: boolean
}

export interface LayerConfig {
  schema: string
  joinKey: string
  columns: string[]
  cardinality?: [number, number]
}

export interface SchemaColumn {
  name: string
  type: 'string' | 'number' | 'boolean' | 'date'
  description?: string
  required?: boolean
}

export interface SchemaDefinition {
  name: string
  category: 'Medical' | 'Biostatistics' | 'Epidemiology' | 'Regression'
  description: string
  columns: SchemaColumn[]
  foreignKeys?: { column: string; references: string }[]
}
```

### src/data/presets.ts
```typescript
import { SchemaCombination } from '@/types/combination'

export const COMBINATION_PRESETS: Record<string, SchemaCombination> = {
  'cohorte-clinica': {
    base: 'demographics',
    layers: [
      { schema: 'encounters', joinKey: 'patient_id', columns: ['encounter_id', 'encounter_date', 'encounter_type', 'primary_dx'], cardinality: [1, 5] },
      { schema: 'survival', joinKey: 'patient_id', columns: ['followup_days', 'event', 'censored'] }
    ],
    joinType: '1:N',
    coherenceCheck: true
  },
  'estudio-epidemico': {
    base: 'surveillance',
    layers: [
      { schema: 'sir', joinKey: 'day', columns: ['susceptible', 'infected', 'recovered', 'R_eff'] },
      { schema: 'outbreak', joinKey: 'onset_day', columns: ['generation', 'secondary', 'severity'] }
    ],
    joinType: '1:1',
    coherenceCheck: true
  },
  'regresion-clinica': {
    base: 'demographics',
    layers: [
      { schema: 'logistic', joinKey: 'patient_id', columns: ['blood_pressure', 'cholesterol', 'disease'] },
      { schema: 'cie10', joinKey: 'patient_id', columns: ['codigo'] }
    ],
    joinType: '1:1',
    coherenceCheck: true
  }
}

export const PRESET_INFO = {
  'cohorte-clinica': { title: 'Cohorte Clinica', desc: 'Seguimiento longitudinal con encuentros y supervivencia', analysis: ['Kaplan-Meier', 'Incidencia'] },
  'estudio-epidemico': { title: 'Estudio Epidemico', desc: 'Vigilancia + modelo SIR + brotes', analysis: ['Curva R0', 'Alertas'] },
  'regresion-clinica': { title: 'Regresion Clinica', desc: 'Datos demograficos + predictores + diagnosticos', analysis: ['OR', 'AUC', 'Comorbilidades'] }
}
```

### src/data/schemas.ts
```typescript
import { SchemaDefinition } from '@/types/combination'

export const SCHEMA_DEFINITIONS: Record<string, SchemaDefinition> = {
  demographics: {
    name: 'demographics',
    category: 'Medical',
    description: 'Datos demograficos poblacionales',
    columns: [
      { name: 'patient_id', type: 'string', required: true },
      { name: 'birth_year', type: 'number' },
      { name: 'age', type: 'number' },
      { name: 'sex', type: 'string' },
      { name: 'region', type: 'string' },
      { name: 'urban', type: 'string' },
      { name: 'insurance', type: 'string' }
    ]
  },
  cie10: {
    name: 'cie10',
    category: 'Medical',
    description: 'Codigos CIE-10 con errores',
    columns: [
      { name: 'patient_id', type: 'string', required: true },
      { name: 'codigo', type: 'string', required: true },
      { name: 'fecha', type: 'date' }
    ],
    foreignKeys: [{ column: 'patient_id', references: 'demographics.patient_id' }]
  },
  survival: {
    name: 'survival',
    category: 'Biostatistics',
    description: 'Estudio supervivencia',
    columns: [
      { name: 'subject_id', type: 'string', required: true },
      { name: 'age', type: 'number' },
      { name: 'sex', type: 'string' },
      { name: 'treatment', type: 'string' },
      { name: 'stage', type: 'string' },
      { name: 'followup_days', type: 'number' },
      { name: 'event', type: 'number' },
      { name: 'censored', type: 'number' }
    ]
  },
  sir: {
    name: 'sir',
    category: 'Epidemiology',
    description: 'Modelo epidemico SIR',
    columns: [
      { name: 'day', type: 'number', required: true },
      { name: 'susceptible', type: 'number' },
      { name: 'infected', type: 'number' },
      { name: 'recovered', type: 'number' },
      { name: 'R_eff', type: 'string' }
    ]
  },
  surveillance: {
    name: 'surveillance',
    category: 'Epidemiology',
    description: 'Alertas vigilancia epidemiologica',
    columns: [
      { name: 'date', type: 'date', required: true },
      { name: 'epi_week', type: 'number' },
      { name: 'region', type: 'string' },
      { name: 'disease', type: 'string' },
      { name: 'cases', type: 'number' },
      { name: 'zscore', type: 'string' },
      { name: 'alert', type: 'string' }
    ]
  }
}
```

### src/generators/combiner.ts
```typescript
import { SchemaCombination, LayerConfig } from '@/types/combination'
import * as generators from './index'

type GeneratorFn = (n: number, seed: number, opts?: any) => any[]

const GENERATORS: Record<string, GeneratorFn> = {
  demographics: generators.generateDemographics,
  cie10: generators.generateCIE10,
  survival: generators.generateSurvival,
  sir: generators.generateSIR,
}

export function generateCombined(
  combination: SchemaCombination,
  rows: number,
  seed: number
): any[] {
  const baseData = GENERATORS[combination.base]?.(rows, seed) || []
  if (!combination.layers.length) return baseData

  let result = [...baseData]

  for (const layer of combination.layers) {
    const layerGen = GENERATORS[layer.schema]
    if (!layerGen) continue

    if (combination.joinType === '1:1') {
      const layerData = layerGen(rows, seed + 1)
      result = result.map((row, i) => {
        const layerRow = layerData[i] || {}
        const filtered = filterColumns(layerRow, layer.columns, baseData[0])
        return { ...row, ...filtered }
      })
    } else {
      // 1:N - expand rows
      const expanded: any[] = []
      for (const row of result) {
        const [min, max] = layer.cardinality || [1, 3]
        const count = min + Math.floor(Math.random() * (max - min + 1))
        const layerData = layerGen(count, seed + expanded.length)
        for (const lRow of layerData) {
          const filtered = filterColumns(lRow, layer.columns, row)
          expanded.push({ ...row, ...filtered })
        }
      }
      result = expanded
    }
  }

  return result
}

function filterColumns(
  row: Record<string, any>,
  columns: string[],
  baseRow: Record<string, any>
): Record<string, any> {
  const filtered: Record<string, any> = {}
  for (const col of columns) {
    if (col in row && !(col in baseRow)) {
      filtered[col] = row[col]
    }
  }
  return filtered
}

export function validateCoherence(data: any[]): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!data.length) {
    errors.push('No hay datos para validar')
    return { valid: false, errors }
  }

  // Check age consistency
  const hasAge = 'age' in data[0]
  const hasBirthYear = 'birth_year' in data[0]
  if (hasAge && hasBirthYear) {
    const inconsistent = data.filter(r => Math.abs((2025 - r.birth_year) - r.age) > 1)
    if (inconsistent.length > 0) {
      errors.push(`${inconsistent.length} filas con edad inconsistente`)
    }
  }

  // Check required fields
  const requiredFields = ['patient_id', 'subject_id', 'day', 'date']
  for (const field of requiredFields) {
    if (field in data[0]) {
      const missing = data.filter(r => !r[field])
      if (missing.length > 0) {
        errors.push(`${missing.length} filas sin ${field}`)
      }
    }
  }

  return { valid: errors.length === 0, errors }
}
```

### src/pages/Builder.tsx
```typescript
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PresetSelector } from '@/components/builder/PresetSelector'
import { CombinationBuilder } from '@/components/builder/CombinationBuilder'
import { YamlPreview } from '@/components/builder/YamlPreview'
import { SchemaCombination } from '@/types/combination'
import { COMBINATION_PRESETS } from '@/data/presets'
import { useNavigate } from 'react-router-dom'

export function Builder() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'presets' | 'custom'>('presets')
  const [combination, setCombination] = useState<SchemaCombination | null>(null)

  const handlePresetSelect = (presetKey: string) => {
    setCombination(COMBINATION_PRESETS[presetKey])
  }

  const handleUseInWizard = () => {
    if (combination) {
      sessionStorage.setItem('shdb_combination', JSON.stringify(combination))
      navigate('/wizard?mode=combination')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Schema Builder</h1>

      {/* Mode Toggle */}
      <div className="mb-6 flex gap-2">
        <Button 
          variant={mode === 'presets' ? 'default' : 'outline'}
          onClick={() => setMode('presets')}
        >
          Presets
        </Button>
        <Button 
          variant={mode === 'custom' ? 'default' : 'outline'}
          onClick={() => setMode('custom')}
        >
          Personalizado
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Selector */}
        <Card>
          {mode === 'presets' ? (
            <PresetSelector onSelect={handlePresetSelect} selected={combination} />
          ) : (
            <CombinationBuilder value={combination} onChange={setCombination} />
          )}
        </Card>

        {/* Right: Preview */}
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Preview</h2>
          {combination ? (
            <>
              <YamlPreview combination={combination} />
              <Button className="mt-4 w-full" onClick={handleUseInWizard}>
                Usar en Wizard
              </Button>
            </>
          ) : (
            <p className="text-muted-foreground">Selecciona un preset o crea una combinacion</p>
          )}
        </Card>
      </div>
    </div>
  )
}
```

### src/components/builder/PresetSelector.tsx
```typescript
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { PRESET_INFO, COMBINATION_PRESETS } from '@/data/presets'
import { SchemaCombination } from '@/types/combination'

interface Props {
  onSelect: (key: string) => void
  selected: SchemaCombination | null
}

export function PresetSelector({ onSelect, selected }: Props) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Combinaciones Predefinidas</h2>
      <div className="space-y-3">
        {Object.entries(PRESET_INFO).map(([key, info]) => {
          const preset = COMBINATION_PRESETS[key]
          const isSelected = selected?.base === preset.base && 
            JSON.stringify(selected?.layers) === JSON.stringify(preset.layers)
          
          return (
            <Card 
              key={key}
              className={`cursor-pointer p-4 transition-colors ${isSelected ? 'border-primary bg-primary/10' : 'hover:border-primary/50'}`}
              onClick={() => onSelect(key)}
            >
              <CardTitle className="text-base">{info.title}</CardTitle>
              <CardDescription className="text-sm">{info.desc}</CardDescription>
              <div className="mt-2 flex flex-wrap gap-1">
                {info.analysis.map(a => (
                  <span key={a} className="rounded bg-secondary px-2 py-0.5 text-xs">{a}</span>
                ))}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {preset.base} + {preset.layers.map(l => l.schema).join(' + ')} ({preset.joinType})
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
```

### src/components/builder/CombinationBuilder.tsx
```typescript
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SchemaCombination, LayerConfig } from '@/types/combination'
import { SCHEMA_DEFINITIONS } from '@/data/schemas'

interface Props {
  value: SchemaCombination | null
  onChange: (c: SchemaCombination) => void
}

export function CombinationBuilder({ value, onChange }: Props) {
  const schemas = Object.keys(SCHEMA_DEFINITIONS)
  const [base, setBase] = useState(value?.base || '')
  const [layers, setLayers] = useState<LayerConfig[]>(value?.layers || [])
  const [joinType, setJoinType] = useState<'1:1' | '1:N'>(value?.joinType || '1:1')

  const addLayer = (schema: string) => {
    if (schema === base || layers.some(l => l.schema === schema)) return
    const def = SCHEMA_DEFINITIONS[schema]
    const newLayer: LayerConfig = {
      schema,
      joinKey: 'patient_id',
      columns: def?.columns.map(c => c.name).filter(n => n !== 'patient_id') || []
    }
    const newLayers = [...layers, newLayer]
    setLayers(newLayers)
    updateCombination(base, newLayers, joinType)
  }

  const removeLayer = (schema: string) => {
    const newLayers = layers.filter(l => l.schema !== schema)
    setLayers(newLayers)
    updateCombination(base, newLayers, joinType)
  }

  const updateCombination = (b: string, l: LayerConfig[], j: '1:1' | '1:N') => {
    if (b) {
      onChange({ base: b, layers: l, joinType: j, coherenceCheck: true })
    }
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Crear Combinacion</h2>
      
      {/* Base Schema */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Schema Base</label>
        <select 
          value={base}
          onChange={(e) => { setBase(e.target.value); updateCombination(e.target.value, layers, joinType) }}
          className="w-full rounded border border-border bg-background px-3 py-2"
        >
          <option value="">Seleccionar...</option>
          {schemas.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Join Type */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Cardinalidad</label>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={joinType === '1:1' ? 'default' : 'outline'}
            onClick={() => { setJoinType('1:1'); updateCombination(base, layers, '1:1') }}
          >
            1:1 (aplanar)
          </Button>
          <Button 
            size="sm" 
            variant={joinType === '1:N' ? 'default' : 'outline'}
            onClick={() => { setJoinType('1:N'); updateCombination(base, layers, '1:N') }}
          >
            1:N (expandir)
          </Button>
        </div>
      </div>

      {/* Layers */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Capas ({layers.length})</label>
        <div className="space-y-2">
          {layers.map(l => (
            <div key={l.schema} className="flex items-center justify-between rounded bg-secondary p-2">
              <span>{l.schema}</span>
              <Button size="sm" variant="ghost" onClick={() => removeLayer(l.schema)}>X</Button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Layer */}
      <div>
        <label className="mb-2 block text-sm font-medium">Agregar Capa</label>
        <div className="flex flex-wrap gap-2">
          {schemas.filter(s => s !== base && !layers.some(l => l.schema === s)).map(s => (
            <Button key={s} size="sm" variant="outline" onClick={() => addLayer(s)}>{s}</Button>
          ))}
        </div>
      </div>
    </div>
  )
}
```

### src/components/builder/YamlPreview.tsx
```typescript
import { SchemaCombination } from '@/types/combination'

interface Props {
  combination: SchemaCombination
}

export function YamlPreview({ combination }: Props) {
  const yaml = `name: custom_combination
base: ${combination.base}
join_type: ${combination.joinType}
coherence_check: ${combination.coherenceCheck}
layers:
${combination.layers.map(l => `  - schema: ${l.schema}
    join_key: ${l.joinKey}
    columns: [${l.columns.join(', ')}]${l.cardinality ? `\n    cardinality: [${l.cardinality.join(', ')}]` : ''}`).join('\n')}`

  return (
    <div className="rounded bg-secondary p-4">
      <pre className="text-xs overflow-x-auto">{yaml}</pre>
    </div>
  )
}
```

## Verificacion

1. Builder muestra presets y modo custom
2. Seleccionar preset actualiza preview YAML
3. Modo custom permite agregar/quitar capas
4. "Usar en Wizard" navega con combinacion guardada
5. Wizard detecta mode=combination y usa combiner.ts
