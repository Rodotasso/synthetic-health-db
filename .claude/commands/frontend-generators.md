---
description: Portar generadores JS a TypeScript tipado
dependencies: [frontend-setup]
---

# /frontend-generators

Crear generadores client-side basados en index.html actual.

## src/generators/utils.ts
```typescript
// Mulberry32 PRNG (determinístico)
export function mulberry32(seed: number): () => number {
  return function() {
    let t = seed += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

// Hash para patient_id
export function hash(s: string): string {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h).toString(16).toUpperCase().substring(0, 6).padStart(6, '0')
}

export const REGIONS = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16']
export const CIE10_CODES = ['E11.0','E11.9','I10','I21.0','I25.1','J44.9','F32.9','M54.5','K21.0','N18.9','G20','C50.9','A00.0','J18.9','R10.4']
```

## src/generators/demographics.ts
```typescript
import { mulberry32, hash, REGIONS } from './utils'

export interface DemographicsRow {
  patient_id: string
  birth_year: number
  age: number
  sex: 'M' | 'F'
  region: string
  urban: 'urban' | 'rural'
  insurance: string
}

export function generateDemographics(n: number, seed: number): DemographicsRow[] {
  const r = mulberry32(seed)
  const data: DemographicsRow[] = []
  const insurances = ['fonasa_a','fonasa_b','fonasa_c','fonasa_d','isapre']

  for (let i = 0; i < n; i++) {
    const y = 1940 + Math.floor(r() * 80)
    const x = r() < 0.51 ? 'F' : 'M'
    const g = REGIONS[Math.floor(r() * REGIONS.length)]
    data.push({
      patient_id: `SHDB-${y}-${x}-${g}-${hash(y + x + g + i)}`,
      birth_year: y,
      age: 2025 - y,
      sex: x,
      region: g,
      urban: r() < 0.87 ? 'urban' : 'rural',
      insurance: insurances[Math.floor(r() * insurances.length)]
    })
  }
  return data
}
```

## src/generators/cie10.ts
```typescript
import { mulberry32, hash, REGIONS, CIE10_CODES } from './utils'

export interface CIE10Row {
  patient_id: string
  codigo: string
  fecha: string
}

export interface CIE10Errors {
  spaces?: boolean
  lowercase?: boolean
  truncated?: boolean
  invalid?: boolean
}

export function generateCIE10(n: number, seed: number, errors: CIE10Errors = {}): CIE10Row[] {
  const r = mulberry32(seed)
  const data: CIE10Row[] = []

  for (let i = 0; i < n; i++) {
    let c = CIE10_CODES[Math.floor(r() * CIE10_CODES.length)]
    if (errors.spaces && r() < 0.1) c = c.replace('.', ' .')
    if (errors.lowercase && r() < 0.1) c = c.toLowerCase()
    if (errors.truncated && r() < 0.05) c = c.split('.')[0]
    if (errors.invalid && r() < 0.03) c = 'Z99.X'

    const y = 1940 + Math.floor(r() * 80)
    const x = r() < 0.51 ? 'F' : 'M'
    const g = REGIONS[Math.floor(r() * REGIONS.length)]
    const m = String(Math.floor(r() * 12) + 1).padStart(2, '0')
    const d = String(Math.floor(r() * 28) + 1).padStart(2, '0')

    data.push({
      patient_id: `SHDB-${y}-${x}-${g}-${hash(y + x + g + i)}`,
      codigo: c,
      fecha: `2024-${m}-${d}`
    })
  }
  return data
}
```

## src/generators/survival.ts
```typescript
import { mulberry32 } from './utils'

export interface SurvivalRow {
  subject_id: string
  age: number
  sex: 'M' | 'F'
  treatment: 'A' | 'B'
  stage: 'I' | 'II' | 'III' | 'IV'
  followup_days: number
  event: 0 | 1
  censored: 0 | 1
}

export function generateSurvival(n: number, seed: number): SurvivalRow[] {
  const r = mulberry32(seed)
  const data: SurvivalRow[] = []
  const stages: Array<'I'|'II'|'III'|'IV'> = ['I','II','III','IV']

  for (let i = 0; i < n; i++) {
    const e = r() < 0.35 ? 1 : 0
    data.push({
      subject_id: `SUBJ-${String(i + 1).padStart(6, '0')}`,
      age: Math.floor(r() * 50) + 35,
      sex: r() < 0.52 ? 'F' : 'M',
      treatment: r() < 0.5 ? 'A' : 'B',
      stage: stages[Math.floor(r() * 4)],
      followup_days: Math.floor(r() * 1825) + 30,
      event: e as 0|1,
      censored: (1 - e) as 0|1
    })
  }
  return data
}
```

## src/generators/sir.ts
```typescript
export interface SIRRow {
  day: number
  susceptible: number
  infected: number
  recovered: number
  R_eff: string
}

export function generateSIR(n_days: number, seed: number): SIRRow[] {
  const data: SIRRow[] = []
  let S = 1e6, I = 10, R = 0
  const b = 0.25, g = 0.1

  for (let i = 0; i < n_days; i++) {
    const nI = b * S * I / 1e6
    const nR = g * I
    S -= nI
    I += nI - nR
    R += nR
    data.push({
      day: i,
      susceptible: Math.round(S),
      infected: Math.round(I),
      recovered: Math.round(R),
      R_eff: (b * S / 1e6 / g).toFixed(2)
    })
  }
  return data
}
```

## src/generators/index.ts
```typescript
export * from './utils'
export * from './demographics'
export * from './cie10'
export * from './survival'
export * from './sir'
// Agregar: encounters, casecontrol, surveillance, outbreak, regression
```

## Patrón para otros generadores

Seguir mismo patrón:
1. Interface tipada para row
2. Función `generate<Schema>(n, seed, options?)` 
3. Usar mulberry32 para reproducibilidad
4. Exportar desde index.ts

## Verificación

```typescript
import { generateDemographics } from '@/generators'
const data = generateDemographics(100, 42)
console.log(data[0]) // { patient_id: 'SHDB-...', age: ..., ... }
```
