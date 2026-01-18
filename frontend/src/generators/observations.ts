import {
  mulberry32,
  randomPick,
  randomDate,
  randomNormal,
  hash,
} from './utils'
import { labTests, type LabTest, getReferenceRange } from '@/data/lab-tests'

export interface ObservationRecord {
  observation_id: string
  patient_id: string
  encounter_id: string
  test_name: string
  loinc_code: string
  category: string
  value: number
  unit: string
  reference_low: number
  reference_high: number
  interpretation: 'N' | 'L' | 'H' | 'LL' | 'HH'
  date: string
  specimen: string
}

export interface ObservationsParams {
  year?: number
  abnormalRatio?: number
  criticalRatio?: number
}

function interpretValue(
  value: number,
  refLow: number,
  refHigh: number,
  critLow?: number,
  critHigh?: number
): 'N' | 'L' | 'H' | 'LL' | 'HH' {
  if (critLow !== undefined && value < critLow) return 'LL'
  if (critHigh !== undefined && value > critHigh) return 'HH'
  if (value < refLow) return 'L'
  if (value > refHigh) return 'H'
  return 'N'
}

export function generateObservations(
  patientIds: string[],
  count: number,
  seed: number,
  params: ObservationsParams = {}
): ObservationRecord[] {
  const {
    year = 2024,
    abnormalRatio = 0.25,
    criticalRatio = 0.05,
  } = params

  const rng = mulberry32(seed)
  const data: ObservationRecord[] = []

  for (let i = 0; i < count; i++) {
    const patientId = randomPick(rng, patientIds)
    const test = randomPick(rng, labTests) as LabTest
    
    // Get reference range for default group (first one / "Adultos")
    const refRange = getReferenceRange(test, 'Adultos')
    const referenceLow = refRange.low
    const referenceHigh = refRange.high
    const criticalLow = refRange.criticalLow
    const criticalHigh = refRange.criticalHigh
    
    // Generate value - normal distribution centered on normal range
    const mean = (referenceLow + referenceHigh) / 2
    const std = (referenceHigh - referenceLow) / 4
    
    let value: number
    const roll = rng()
    
    if (roll < criticalRatio) {
      // Critical value - outside critical range
      if (rng() < 0.5 && criticalLow !== undefined) {
        value = criticalLow * (0.5 + rng() * 0.4) // Below critical low
      } else if (criticalHigh !== undefined) {
        value = criticalHigh * (1.1 + rng() * 0.5) // Above critical high
      } else {
        value = randomNormal(rng, mean, std)
      }
    } else if (roll < abnormalRatio) {
      // Abnormal but not critical
      if (rng() < 0.5) {
        value = referenceLow * (0.7 + rng() * 0.25) // Below normal
      } else {
        value = referenceHigh * (1.05 + rng() * 0.3) // Above normal
      }
    } else {
      // Normal value
      value = randomNormal(rng, mean, std)
      // Clamp to normal range with some margin
      value = Math.max(referenceLow * 0.95, Math.min(referenceHigh * 1.05, value))
    }
    
    // Round based on precision
    value = Math.round(value * 100) / 100
    if (value > 100) value = Math.round(value)

    const interpretation = interpretValue(
      value, 
      referenceLow, 
      referenceHigh,
      criticalLow,
      criticalHigh
    )

    data.push({
      observation_id: `OBS-${year}-${hash(`${patientId}-${i}-${test.loincCode}`)}`,
      patient_id: patientId,
      encounter_id: `ENC-${year}-${hash(`${patientId}-${i}`)}`,
      test_name: test.name,
      loinc_code: test.loincCode,
      category: test.category,
      value,
      unit: test.unit,
      reference_low: referenceLow,
      reference_high: referenceHigh,
      interpretation,
      date: randomDate(rng, year),
      specimen: test.specimen,
    })
  }

  return data
}
