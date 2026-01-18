import {
  mulberry32,
  generatePatientId,
  randomPick,
  randomInt,
  randomDate,
  REGIONS,
  CIE10_CODES,
} from './utils'

export interface CIE10Record {
  patient_id: string
  codigo: string
  fecha: string
}

export interface CIE10Params {
  addSpaces?: boolean
  addLowercase?: boolean
  addTruncated?: boolean
  addInvalid?: boolean
  spaceRate?: number
  lowercaseRate?: number
  truncatedRate?: number
  invalidRate?: number
}

export function generateCIE10(
  count: number,
  seed: number,
  params: CIE10Params = {}
): CIE10Record[] {
  const {
    addSpaces = true,
    addLowercase = true,
    addTruncated = false,
    addInvalid = false,
    spaceRate = 0.1,
    lowercaseRate = 0.1,
    truncatedRate = 0.05,
    invalidRate = 0.03,
  } = params

  const rng = mulberry32(seed)
  const data: CIE10Record[] = []

  for (let i = 0; i < count; i++) {
    let code: string = randomPick(rng, CIE10_CODES)

    // Apply error transformations
    if (addSpaces && rng() < spaceRate) {
      code = code.replace('.', ' .')
    }
    if (addLowercase && rng() < lowercaseRate) {
      code = code.toLowerCase()
    }
    if (addTruncated && rng() < truncatedRate) {
      code = code.split('.')[0]
    }
    if (addInvalid && rng() < invalidRate) {
      code = 'Z99.X'
    }

    const birthYear = randomInt(rng, 1940, 2020)
    const sex = rng() < 0.51 ? 'F' : 'M'
    const region = randomPick(rng, REGIONS)

    data.push({
      patient_id: generatePatientId(birthYear, sex, region, i),
      codigo: code,
      fecha: randomDate(rng, 2024),
    })
  }

  return data
}
