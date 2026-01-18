import {
  mulberry32,
  randomPick,
  randomDate,
  hash,
} from './utils'
import { vaccines, type Vaccine } from '@/data/vaccines-pni'

export interface ImmunizationRecord {
  immunization_id: string
  patient_id: string
  vaccine_name: string
  vaccine_short_name: string
  cvx_code: string
  dose_number: number
  dose_sequence: string
  date: string
  lot_number: string
  site: string
  route: string
  organization_id: string
  pni_schedule: boolean
  target_diseases: string
}

export interface ImmunizationsParams {
  year?: number
  coverageRate?: number
}

const INJECTION_SITES = [
  'Deltoides derecho',
  'Deltoides izquierdo',
  'Vasto lateral derecho',
  'Vasto lateral izquierdo',
  'Glúteo',
]

const ORGANIZATIONS = [
  'DEIS-401100', 'DEIS-401101', 'DEIS-401102', 'DEIS-401103', 'DEIS-401104',
  'DEIS-401105', 'DEIS-401106', 'DEIS-401107', 'DEIS-401200', 'DEIS-401201',
]

function generateLotNumber(rng: () => number, year: number): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const letter1 = letters[Math.floor(rng() * letters.length)]
  const letter2 = letters[Math.floor(rng() * letters.length)]
  const num = Math.floor(rng() * 9999).toString().padStart(4, '0')
  return `${letter1}${letter2}${num}-${year}`
}

export function generateImmunizations(
  patientIds: string[],
  count: number,
  seed: number,
  params: ImmunizationsParams = {}
): ImmunizationRecord[] {
  const {
    year = 2024,
    coverageRate = 0.85,
  } = params

  const rng = mulberry32(seed)
  const data: ImmunizationRecord[] = []

  // Filter to PNI vaccines for realistic distribution
  const pniVaccines = vaccines.filter(v => v.pni)

  for (let i = 0; i < count; i++) {
    // Skip some vaccinations to simulate incomplete coverage
    if (rng() > coverageRate) continue

    const patientId = randomPick(rng, patientIds)
    const vaccine = randomPick(rng, pniVaccines) as Vaccine
    
    // Determine which dose this is
    const maxDose = vaccine.doses.length || 1
    const doseIndex = Math.floor(rng() * maxDose)
    const dose = vaccine.doses[doseIndex]

    data.push({
      immunization_id: `IMM-${year}-${hash(`${patientId}-${i}-${vaccine.cvxCode}`)}`,
      patient_id: patientId,
      vaccine_name: vaccine.name,
      vaccine_short_name: vaccine.shortName,
      cvx_code: vaccine.cvxCode,
      dose_number: dose.doseNumber,
      dose_sequence: dose.doseSequence,
      date: randomDate(rng, year),
      lot_number: generateLotNumber(rng, year),
      site: vaccine.site || randomPick(rng, INJECTION_SITES),
      route: vaccine.route,
      organization_id: randomPick(rng, ORGANIZATIONS),
      pni_schedule: vaccine.pni,
      target_diseases: vaccine.targetDiseases.join(', '),
    })
  }

  return data
}
