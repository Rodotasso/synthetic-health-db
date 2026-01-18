import {
  mulberry32,
  padNumber,
  randomPick,
  randomInt,
  randomExponential,
  CANCER_STAGES,
} from './utils'

export interface SurvivalRecord {
  patient_id: string
  age: number
  sex: 'M' | 'F'
  treatment: 'treatment' | 'control'
  stage: string
  followup_days: number
  event: 0 | 1
  censored: 0 | 1
}

export interface SurvivalParams {
  /** Hazard ratio for treatment effect (< 1 = protective) */
  hazardRatio?: number
  /** Median survival time in days for control group */
  medianSurvival?: number
  /** Maximum follow-up time in days */
  maxFollowup?: number
  /** Probability of being in treatment group */
  treatmentProb?: number
  /** Administrative censoring rate */
  censoringRate?: number
}

export function generateSurvival(
  count: number,
  seed: number,
  params: SurvivalParams = {}
): SurvivalRecord[] {
  const {
    hazardRatio = 0.7,
    medianSurvival = 365,
    maxFollowup = 730,
    treatmentProb = 0.5,
    censoringRate = 0.2,
  } = params

  // Convert median to lambda for exponential distribution
  const lambdaControl = Math.log(2) / medianSurvival
  const lambdaTreatment = lambdaControl * hazardRatio

  const rng = mulberry32(seed)
  const data: SurvivalRecord[] = []

  for (let i = 0; i < count; i++) {
    const treatment = rng() < treatmentProb ? 'treatment' : 'control'
    const lambda = treatment === 'treatment' ? lambdaTreatment : lambdaControl
    
    // Generate true event time
    const trueEventTime = randomExponential(rng, lambda)
    
    // Generate censoring time (administrative or lost to follow-up)
    const isCensored = rng() < censoringRate
    const censorTime = isCensored 
      ? randomInt(rng, 30, maxFollowup) 
      : maxFollowup
    
    // Observed time is minimum of event time, censor time, and max follow-up
    const observedTime = Math.min(trueEventTime, censorTime, maxFollowup)
    const event = trueEventTime <= observedTime ? 1 : 0

    data.push({
      patient_id: `SRV-${padNumber(i + 1, 6)}`,
      age: randomInt(rng, 30, 85),
      sex: rng() < 0.5 ? 'M' : 'F',
      treatment,
      stage: randomPick(rng, CANCER_STAGES),
      followup_days: Math.round(observedTime),
      event: event as 0 | 1,
      censored: (1 - event) as 0 | 1,
    })
  }

  return data
}
