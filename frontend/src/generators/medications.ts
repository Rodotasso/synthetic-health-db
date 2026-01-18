import {
  mulberry32,
  randomPick,
  randomDate,
  hash,
} from './utils'
import { medications, type Medication } from '@/data/medications-atc'

export interface MedicationRecord {
  prescription_id: string
  patient_id: string
  encounter_id: string
  medication_name: string
  atc_code: string
  atc_category: string
  dose: string
  unit: string
  frequency: string
  route: string
  start_date: string
  end_date: string
  duration_days: number
  formulario_nacional: boolean
  ges: boolean
}

export interface MedicationsParams {
  year?: number
  durationMin?: number
  durationMax?: number
  chronicRatio?: number
}

export function generateMedications(
  patientIds: string[],
  count: number,
  seed: number,
  params: MedicationsParams = {}
): MedicationRecord[] {
  const {
    year = 2024,
    durationMin = 7,
    durationMax = 90,
    chronicRatio = 0.3,
  } = params

  const rng = mulberry32(seed)
  const data: MedicationRecord[] = []

  for (let i = 0; i < count; i++) {
    const patientId = randomPick(rng, patientIds)
    const medication = randomPick(rng, medications) as Medication
    const isChronic = rng() < chronicRatio
    
    // Generate dates
    const startDate = randomDate(rng, year)
    const duration = isChronic 
      ? Math.floor(rng() * 365) + 180 // 180-545 days for chronic
      : Math.floor(rng() * (durationMax - durationMin)) + durationMin
    
    // Calculate end date
    const start = new Date(startDate)
    const end = new Date(start)
    end.setDate(end.getDate() + duration)
    const endDate = end.toISOString().split('T')[0]

    data.push({
      prescription_id: `RX-${year}-${hash(`${patientId}-${i}-${medication.atcCode}`)}`,
      patient_id: patientId,
      encounter_id: `ENC-${year}-${hash(`${patientId}-${i}`)}`,
      medication_name: medication.genericName,
      atc_code: medication.atcCode,
      atc_category: medication.atcLevel1Name,
      dose: medication.dose,
      unit: medication.unit,
      frequency: medication.frequency,
      route: medication.route,
      start_date: startDate,
      end_date: endDate,
      duration_days: duration,
      formulario_nacional: medication.formularioNacional,
      ges: medication.ges,
    })
  }

  return data
}
