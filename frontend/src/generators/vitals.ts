import {
  mulberry32,
  randomPick,
  randomDate,
  hash,
} from './utils'
import {
  generarFrecuenciaCardiaca,
  generarFrecuenciaRespiratoria,
  generarPresionSistolica,
  generarPresionDiastolica,
  generarTemperatura,
  generarSaturacionO2,
} from '@/data/vital-ranges'

export interface VitalsRecord {
  vital_id: string
  patient_id: string
  encounter_id: string
  age_months: number
  heart_rate: number
  respiratory_rate: number
  systolic_bp: number
  diastolic_bp: number
  temperature: number
  oxygen_saturation: number
  weight: number
  height: number
  bmi: number
  date: string
}

export interface VitalsParams {
  year?: number
}

// Generate realistic weight based on age and sex
function generateWeight(rng: () => number, ageMeses: number, sex: 'M' | 'F'): number {
  if (ageMeses < 1) return 2.5 + rng() * 1.5 // Neonato: 2.5-4 kg
  if (ageMeses < 12) return 3 + (ageMeses * 0.5) + rng() * 2 // Lactante
  if (ageMeses < 24) return 8 + rng() * 4 // 1-2 años
  if (ageMeses < 72) return 12 + (ageMeses / 12) * 2 + rng() * 4 // 2-6 años
  if (ageMeses < 144) return 20 + (ageMeses / 12) * 3 + rng() * 8 // 6-12 años
  if (ageMeses < 216) return 45 + rng() * 20 // Adolescente
  // Adulto
  const baseWeight = sex === 'M' ? 75 : 65
  return baseWeight + (rng() - 0.5) * 30
}

// Generate realistic height based on age and sex
function generateHeight(rng: () => number, ageMeses: number, sex: 'M' | 'F'): number {
  if (ageMeses < 1) return 48 + rng() * 4 // Neonato: 48-52 cm
  if (ageMeses < 12) return 50 + ageMeses * 2 + rng() * 3 // Lactante
  if (ageMeses < 24) return 70 + ageMeses + rng() * 5 // 1-2 años
  if (ageMeses < 72) return 85 + (ageMeses / 12) * 6 + rng() * 8 // 2-6 años
  if (ageMeses < 144) return 100 + (ageMeses / 12) * 5 + rng() * 10 // 6-12 años
  if (ageMeses < 216) return 150 + rng() * 20 // Adolescente
  // Adulto
  const baseHeight = sex === 'M' ? 172 : 160
  return baseHeight + (rng() - 0.5) * 20
}

export function generateVitals(
  patientIds: string[],
  patientAges: Map<string, { ageMeses: number; sex: 'M' | 'F' }>,
  count: number,
  seed: number,
  params: VitalsParams = {}
): VitalsRecord[] {
  const { year = 2024 } = params

  const rng = mulberry32(seed)
  const data: VitalsRecord[] = []

  // If no patient ages provided, generate random ages
  const defaultAge = () => ({ ageMeses: Math.floor(rng() * 780) + 216, sex: (rng() < 0.51 ? 'F' : 'M') as 'M' | 'F' })

  for (let i = 0; i < count; i++) {
    const patientId = randomPick(rng, patientIds)
    const patientInfo = patientAges.get(patientId) || defaultAge()
    const { ageMeses, sex } = patientInfo

    const weight = Math.round(generateWeight(rng, ageMeses, sex) * 10) / 10
    const height = Math.round(generateHeight(rng, ageMeses, sex))
    const bmi = Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10

    // Use the vital ranges generators which account for age
    // Add some variation using our RNG
    const seedForVitals = seed + i
    const vitalRng = mulberry32(seedForVitals)

    data.push({
      vital_id: `VIT-${year}-${hash(`${patientId}-${i}`)}`,
      patient_id: patientId,
      encounter_id: `ENC-${year}-${hash(`${patientId}-${i}`)}`,
      age_months: ageMeses,
      heart_rate: generarFrecuenciaCardiaca(ageMeses) + Math.floor((vitalRng() - 0.5) * 10),
      respiratory_rate: generarFrecuenciaRespiratoria(ageMeses) + Math.floor((vitalRng() - 0.5) * 4),
      systolic_bp: generarPresionSistolica(ageMeses) + Math.floor((vitalRng() - 0.5) * 10),
      diastolic_bp: generarPresionDiastolica(ageMeses) + Math.floor((vitalRng() - 0.5) * 8),
      temperature: Math.round((generarTemperatura(ageMeses) + (vitalRng() - 0.5) * 0.6) * 10) / 10,
      oxygen_saturation: Math.min(100, Math.max(90, generarSaturacionO2(ageMeses) + Math.floor((vitalRng() - 0.5) * 4))),
      weight,
      height,
      bmi,
      date: randomDate(rng, year),
    })
  }

  return data
}

// Simpler version without patient ages map
export function generateVitalsSimple(
  patientIds: string[],
  count: number,
  seed: number,
  params: VitalsParams = {}
): VitalsRecord[] {
  const emptyMap = new Map<string, { ageMeses: number; sex: 'M' | 'F' }>()
  return generateVitals(patientIds, emptyMap, count, seed, params)
}
