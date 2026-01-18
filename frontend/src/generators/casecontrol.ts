import {
  mulberry32,
  padNumber,
  randomInt,
  randomPick,
  SMOKING_STATUS,
} from './utils'

export interface CaseControlRecord {
  subject_id: string
  case: 0 | 1
  exposed: 0 | 1
  age: number
  sex: 'M' | 'F'
  smoking: string
}

export interface CaseControlParams {
  /** Odds ratio for exposure effect */
  oddsRatio?: number
  /** Baseline exposure prevalence in controls */
  exposurePrevalence?: number
  /** Number of controls per case */
  controlsPerCase?: number
}

export function generateCaseControl(
  count: number,
  seed: number,
  params: CaseControlParams = {}
): CaseControlRecord[] {
  const {
    oddsRatio = 2.5,
    exposurePrevalence = 0.3,
    controlsPerCase = 1,
  } = params

  const rng = mulberry32(seed)
  const data: CaseControlRecord[] = []

  // Calculate number of cases and controls
  const nCases = Math.floor(count / (1 + controlsPerCase))
  const nControls = count - nCases

  // Calculate exposure probability for cases based on OR
  // OR = (p_case / (1 - p_case)) / (p_control / (1 - p_control))
  // Solving for p_case:
  const oddsControl = exposurePrevalence / (1 - exposurePrevalence)
  const oddsCase = oddsControl * oddsRatio
  const exposureProbCase = oddsCase / (1 + oddsCase)

  let id = 0

  // Generate cases
  for (let i = 0; i < nCases; i++) {
    const exposed = rng() < exposureProbCase ? 1 : 0
    data.push({
      subject_id: `CC-${padNumber(++id, 6)}`,
      case: 1,
      exposed: exposed as 0 | 1,
      age: randomInt(rng, 40, 80),
      sex: rng() < 0.5 ? 'M' : 'F',
      smoking: randomPick(rng, SMOKING_STATUS),
    })
  }

  // Generate controls
  for (let i = 0; i < nControls; i++) {
    const exposed = rng() < exposurePrevalence ? 1 : 0
    data.push({
      subject_id: `CC-${padNumber(++id, 6)}`,
      case: 0,
      exposed: exposed as 0 | 1,
      age: randomInt(rng, 40, 80),
      sex: rng() < 0.5 ? 'M' : 'F',
      smoking: randomPick(rng, SMOKING_STATUS),
    })
  }

  return data
}
