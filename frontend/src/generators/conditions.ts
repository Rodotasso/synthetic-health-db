import {
  mulberry32,
  randomPick,
  randomDate,
  hash,
} from './utils'
import { gesPathologies, type GESPathology } from '@/data/ges-pathologies'

export interface ConditionRecord {
  condition_id: string
  patient_id: string
  encounter_id: string
  condition_name: string
  cie10_code: string
  ges_number: number | null
  ges_name: string | null
  onset_date: string
  resolution_date: string | null
  status: 'activo' | 'resuelto' | 'remisión'
  severity: 'leve' | 'moderado' | 'grave'
  category: string
}

export interface ConditionsParams {
  year?: number
  gesRatio?: number
  chronicRatio?: number
  resolvedRatio?: number
}

const SEVERITIES: ('leve' | 'moderado' | 'grave')[] = ['leve', 'moderado', 'grave']
const SEVERITY_WEIGHTS = [0.5, 0.35, 0.15] // More mild than severe

function weightedPick<T>(rng: () => number, items: T[], weights: number[]): T {
  const total = weights.reduce((a, b) => a + b, 0)
  let r = rng() * total
  for (let i = 0; i < items.length; i++) {
    r -= weights[i]
    if (r <= 0) return items[i]
  }
  return items[items.length - 1]
}

export function generateConditions(
  patientIds: string[],
  count: number,
  seed: number,
  params: ConditionsParams = {}
): ConditionRecord[] {
  const {
    year = 2024,
    gesRatio = 0.4,
    chronicRatio = 0.3,
    resolvedRatio = 0.3,
  } = params

  const rng = mulberry32(seed)
  const data: ConditionRecord[] = []

  for (let i = 0; i < count; i++) {
    const patientId = randomPick(rng, patientIds)
    const pathology = randomPick(rng, gesPathologies) as GESPathology
    
    const isGes = rng() < gesRatio
    const isChronic = rng() < chronicRatio
    const isResolved = !isChronic && rng() < resolvedRatio
    
    // Generate onset date
    const onsetDate = randomDate(rng, year - (isChronic ? Math.floor(rng() * 10) : 0))
    
    // Generate resolution date if resolved
    let resolutionDate: string | null = null
    let status: 'activo' | 'resuelto' | 'remisión' = 'activo'
    
    if (isResolved) {
      const onset = new Date(onsetDate)
      const resolutionDays = Math.floor(rng() * 180) + 7 // 7-187 days
      onset.setDate(onset.getDate() + resolutionDays)
      resolutionDate = onset.toISOString().split('T')[0]
      status = 'resuelto'
    } else if (isChronic && rng() < 0.2) {
      status = 'remisión'
    }

    // Pick a CIE-10 code from the available codes
    const cie10Code = randomPick(rng, pathology.cie10Codes)

    data.push({
      condition_id: `COND-${year}-${hash(`${patientId}-${i}-${cie10Code}`)}`,
      patient_id: patientId,
      encounter_id: `ENC-${year}-${hash(`${patientId}-${i}`)}`,
      condition_name: pathology.name,
      cie10_code: cie10Code,
      ges_number: isGes ? pathology.gesNumber : null,
      ges_name: isGes ? pathology.name : null,
      onset_date: onsetDate,
      resolution_date: resolutionDate,
      status,
      severity: weightedPick(rng, SEVERITIES, SEVERITY_WEIGHTS),
      category: pathology.category,
    })
  }

  return data
}
