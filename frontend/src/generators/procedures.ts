import {
  mulberry32,
  randomPick,
  randomDate,
  hash,
} from './utils'
import { fonasaProcedures, type FonasaProcedure } from '@/data/fonasa-procedures'

export interface ProcedureRecord {
  procedure_id: string
  patient_id: string
  encounter_id: string
  procedure_name: string
  fonasa_code: string
  fonasa_group: string
  category: string
  complexity: string
  date: string
  performer_id: string
  organization_id: string
  outcome: 'exitoso' | 'complicado' | 'fallido'
  requires_hospitalization: boolean
  ges_related: boolean
  notes: string
}

export interface ProceduresParams {
  year?: number
  complicationRate?: number
}

const ORGANIZATIONS = [
  'DEIS-101100', 'DEIS-101101', 'DEIS-101102', 'DEIS-101103', 'DEIS-101104',
  'DEIS-102100', 'DEIS-103100', 'DEIS-201100', 'DEIS-701100', 'DEIS-701101',
]

const OUTCOMES: ('exitoso' | 'complicado' | 'fallido')[] = ['exitoso', 'complicado', 'fallido']

function weightedPick<T>(rng: () => number, items: T[], weights: number[]): T {
  const total = weights.reduce((a, b) => a + b, 0)
  let r = rng() * total
  for (let i = 0; i < items.length; i++) {
    r -= weights[i]
    if (r <= 0) return items[i]
  }
  return items[items.length - 1]
}

function generatePerformerId(rng: () => number): string {
  const professions = ['MED', 'ENF', 'KIN', 'MAT', 'TEC']
  const profession = randomPick(rng, professions)
  const num = Math.floor(rng() * 99999).toString().padStart(5, '0')
  return `${profession}-${num}`
}

export function generateProcedures(
  patientIds: string[],
  count: number,
  seed: number,
  params: ProceduresParams = {}
): ProcedureRecord[] {
  const {
    year = 2024,
    complicationRate = 0.08,
  } = params

  const rng = mulberry32(seed)
  const data: ProcedureRecord[] = []

  // Adjust weights based on complication rate
  const adjustedWeights = [
    1 - complicationRate,
    complicationRate * 0.875,
    complicationRate * 0.125,
  ]

  for (let i = 0; i < count; i++) {
    const patientId = randomPick(rng, patientIds)
    const procedure = randomPick(rng, fonasaProcedures) as FonasaProcedure
    const outcome = weightedPick(rng, OUTCOMES, adjustedWeights)

    let notes = ''
    if (outcome === 'complicado') {
      const complications = [
        'Sangrado menor controlado',
        'Reaccion alergica leve',
        'Dolor postoperatorio mayor a lo esperado',
        'Infeccion superficial de sitio quirurgico',
        'Hematoma en sitio de puncion',
      ]
      notes = randomPick(rng, complications)
    } else if (outcome === 'fallido') {
      const failures = [
        'Procedimiento suspendido por inestabilidad hemodinamica',
        'Anatomia desfavorable, derivado a centro de mayor complejidad',
        'Reaccion adversa severa, procedimiento interrumpido',
      ]
      notes = randomPick(rng, failures)
    }

    data.push({
      procedure_id: `PROC-${year}-${hash(`${patientId}-${i}-${procedure.fonasaCode}`)}`,
      patient_id: patientId,
      encounter_id: `ENC-${year}-${hash(`${patientId}-${i}`)}`,
      procedure_name: procedure.name,
      fonasa_code: procedure.fonasaCode,
      fonasa_group: procedure.group,
      category: procedure.category,
      complexity: procedure.complexity,
      date: randomDate(rng, year),
      performer_id: generatePerformerId(rng),
      organization_id: randomPick(rng, ORGANIZATIONS),
      outcome,
      requires_hospitalization: procedure.requiresHospitalization,
      ges_related: procedure.gesRelated,
      notes,
    })
  }

  return data
}
