import {
  mulberry32,
  generatePatientId,
  randomPick,
  randomInt,
  REGIONS,
  INSURANCE_TYPES,
} from './utils'

export interface DemographicsRecord {
  patient_id: string
  birth_year: number
  age: number
  sex: 'M' | 'F'
  region: string
  urban: 'urban' | 'rural'
  insurance: string
}

export interface DemographicsParams {
  minBirthYear?: number
  maxBirthYear?: number
  femaleRatio?: number
  urbanRatio?: number
}

const CURRENT_YEAR = 2025

export function generateDemographics(
  count: number,
  seed: number,
  params: DemographicsParams = {}
): DemographicsRecord[] {
  const {
    minBirthYear = 1940,
    maxBirthYear = 2020,
    femaleRatio = 0.51,
    urbanRatio = 0.87,
  } = params

  const rng = mulberry32(seed)
  const data: DemographicsRecord[] = []

  for (let i = 0; i < count; i++) {
    const birthYear = randomInt(rng, minBirthYear, maxBirthYear)
    const sex = rng() < femaleRatio ? 'F' : 'M'
    const region = randomPick(rng, REGIONS)

    data.push({
      patient_id: generatePatientId(birthYear, sex, region, i),
      birth_year: birthYear,
      age: CURRENT_YEAR - birthYear,
      sex,
      region,
      urban: rng() < urbanRatio ? 'urban' : 'rural',
      insurance: randomPick(rng, INSURANCE_TYPES),
    })
  }

  return data
}
