import {
  mulberry32,
  generatePatientId,
  randomPick,
  randomInt,
  randomDate,
  padNumber,
  REGIONS,
  CIE10_CODES,
  ENCOUNTER_TYPES,
} from './utils'

export interface EncounterRecord {
  encounter_id: string
  patient_id: string
  date: string
  type: string
  primary_dx: string
}

export interface EncountersParams {
  year?: number
}

export function generateEncounters(
  count: number,
  seed: number,
  params: EncountersParams = {}
): EncounterRecord[] {
  const { year = 2024 } = params

  const rng = mulberry32(seed)
  const data: EncounterRecord[] = []

  for (let i = 0; i < count; i++) {
    const birthYear = randomInt(rng, 1940, 2020)
    const sex = rng() < 0.51 ? 'F' : 'M'
    const region = randomPick(rng, REGIONS)

    data.push({
      encounter_id: `ENC-${padNumber(i + 1, 8)}`,
      patient_id: generatePatientId(birthYear, sex, region, i),
      date: randomDate(rng, year),
      type: randomPick(rng, ENCOUNTER_TYPES),
      primary_dx: randomPick(rng, CIE10_CODES),
    })
  }

  return data
}
