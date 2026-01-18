import {
  mulberry32,
  padNumber,
  randomNormal,
  randomExponential,
  randomPoisson,
  randomInt,
} from './utils'

// ============================================================================
// LINEAR REGRESSION
// ============================================================================

export interface LinearRecord {
  id: string
  x1: number
  x2: number
  y: number
}

export interface LinearParams {
  /** Intercept */
  beta0?: number
  /** Coefficient for x1 */
  beta1?: number
  /** Coefficient for x2 */
  beta2?: number
  /** Standard deviation of noise */
  noise?: number
}

export function generateLinear(
  count: number,
  seed: number,
  params: LinearParams = {}
): LinearRecord[] {
  const {
    beta0 = 10,
    beta1 = 2.5,
    beta2 = -1.5,
    noise = 5,
  } = params

  const rng = mulberry32(seed)
  const data: LinearRecord[] = []

  for (let i = 0; i < count; i++) {
    const x1 = randomNormal(rng, 50, 10)
    const x2 = randomNormal(rng, 100, 20)
    const y = beta0 + beta1 * x1 + beta2 * x2 + randomNormal(rng, 0, noise)

    data.push({
      id: `LIN-${padNumber(i + 1, 6)}`,
      x1: Math.round(x1 * 100) / 100,
      x2: Math.round(x2 * 100) / 100,
      y: Math.round(y * 100) / 100,
    })
  }

  return data
}

// ============================================================================
// LOGISTIC REGRESSION
// ============================================================================

export interface LogisticRecord {
  id: string
  x1: number
  x2: number
  outcome: 0 | 1
  probability: number
}

export interface LogisticParams {
  /** Intercept (log-odds) */
  beta0?: number
  /** Log-odds ratio for x1 */
  beta1?: number
  /** Log-odds ratio for x2 */
  beta2?: number
}

export function generateLogistic(
  count: number,
  seed: number,
  params: LogisticParams = {}
): LogisticRecord[] {
  const {
    beta0 = -2,
    beta1 = 0.05,
    beta2 = 0.03,
  } = params

  const rng = mulberry32(seed)
  const data: LogisticRecord[] = []

  for (let i = 0; i < count; i++) {
    const x1 = randomNormal(rng, 50, 10)
    const x2 = randomNormal(rng, 100, 20)
    
    // Calculate probability using logistic function
    const logOdds = beta0 + beta1 * x1 + beta2 * x2
    const probability = 1 / (1 + Math.exp(-logOdds))
    const outcome = rng() < probability ? 1 : 0

    data.push({
      id: `LOG-${padNumber(i + 1, 6)}`,
      x1: Math.round(x1 * 100) / 100,
      x2: Math.round(x2 * 100) / 100,
      outcome: outcome as 0 | 1,
      probability: Math.round(probability * 1000) / 1000,
    })
  }

  return data
}

// ============================================================================
// POISSON REGRESSION
// ============================================================================

export interface PoissonRecord {
  id: string
  exposure: number
  x1: number
  count: number
  rate: number
}

export interface PoissonParams {
  /** Intercept (log-rate) */
  beta0?: number
  /** Log-rate ratio for x1 */
  beta1?: number
}

export function generatePoisson(
  count: number,
  seed: number,
  params: PoissonParams = {}
): PoissonRecord[] {
  const {
    beta0 = 1,
    beta1 = 0.3,
  } = params

  const rng = mulberry32(seed)
  const data: PoissonRecord[] = []

  for (let i = 0; i < count; i++) {
    const exposure = randomInt(rng, 1, 10) // Person-years at risk
    const x1 = randomNormal(rng, 0, 1)
    
    // Calculate rate using log-linear model
    const logRate = beta0 + beta1 * x1
    const rate = Math.exp(logRate)
    
    // Expected count = rate * exposure
    const lambda = rate * exposure
    const eventCount = randomPoisson(rng, lambda)

    data.push({
      id: `POI-${padNumber(i + 1, 6)}`,
      exposure,
      x1: Math.round(x1 * 100) / 100,
      count: eventCount,
      rate: Math.round(rate * 1000) / 1000,
    })
  }

  return data
}

// ============================================================================
// COX PROPORTIONAL HAZARDS REGRESSION
// ============================================================================

export interface CoxRecord {
  id: string
  time: number
  event: 0 | 1
  treatment: 0 | 1
  age: number
}

export interface CoxParams {
  /** Hazard ratio for treatment */
  hazardRatioTreatment?: number
  /** Hazard ratio per year of age */
  hazardRatioAge?: number
  /** Baseline median survival in days */
  baselineSurvival?: number
  /** Maximum follow-up time */
  maxFollowup?: number
  /** Censoring rate */
  censoringRate?: number
}

export function generateCox(
  count: number,
  seed: number,
  params: CoxParams = {}
): CoxRecord[] {
  const {
    hazardRatioTreatment = 0.6,
    hazardRatioAge = 1.02,
    baselineSurvival = 500,
    maxFollowup = 1000,
    censoringRate = 0.25,
  } = params

  const rng = mulberry32(seed)
  const data: CoxRecord[] = []

  // Convert median to baseline lambda
  const baseLambda = Math.log(2) / baselineSurvival

  for (let i = 0; i < count; i++) {
    const treatment = rng() < 0.5 ? 1 : 0
    const age = randomInt(rng, 40, 80)
    const ageEffect = Math.pow(hazardRatioAge, age - 60) // Center at age 60
    
    // Calculate individual hazard
    const hr = (treatment === 1 ? hazardRatioTreatment : 1) * ageEffect
    const lambda = baseLambda * hr
    
    // Generate event time
    const trueEventTime = randomExponential(rng, lambda)
    
    // Generate censoring
    const isCensored = rng() < censoringRate
    const censorTime = isCensored 
      ? randomInt(rng, 30, maxFollowup) 
      : maxFollowup
    
    const observedTime = Math.min(trueEventTime, censorTime, maxFollowup)
    const event = trueEventTime <= observedTime ? 1 : 0

    data.push({
      id: `COX-${padNumber(i + 1, 6)}`,
      time: Math.round(observedTime),
      event: event as 0 | 1,
      treatment: treatment as 0 | 1,
      age,
    })
  }

  return data
}
