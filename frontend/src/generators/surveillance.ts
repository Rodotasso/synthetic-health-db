import {
  mulberry32,
  randomPick,
  randomPoisson,
  SURVEILLANCE_DISEASES,
} from './utils'

export interface SurveillanceRecord {
  week: number
  year: number
  disease: string
  cases: number
  expected: number
  alert: 0 | 1
}

export interface SurveillanceParams {
  /** Number of weeks to simulate */
  weeks?: number
  /** Starting year */
  startYear?: number
  /** Baseline expected cases per week */
  baselineCases?: number
  /** Threshold multiplier for alert (cases > expected * threshold) */
  alertThreshold?: number
  /** Add seasonal variation */
  seasonal?: boolean
  /** Week to simulate outbreak (0 = no outbreak) */
  outbreakWeek?: number
  /** Multiplier during outbreak */
  outbreakMultiplier?: number
}

export function generateSurveillance(
  count: number,
  seed: number,
  params: SurveillanceParams = {}
): SurveillanceRecord[] {
  const {
    weeks = count,
    startYear = 2024,
    baselineCases = 10,
    alertThreshold = 1.5,
    seasonal = true,
    outbreakWeek = 0,
    outbreakMultiplier = 3,
  } = params

  const rng = mulberry32(seed)
  const data: SurveillanceRecord[] = []
  const disease = randomPick(rng, SURVEILLANCE_DISEASES)

  for (let i = 0; i < weeks; i++) {
    const weekNum = (i % 52) + 1
    const yearOffset = Math.floor(i / 52)
    const year = startYear + yearOffset

    // Calculate expected cases with optional seasonality
    let expected = baselineCases
    if (seasonal) {
      // Peak in winter (weeks 20-30 in southern hemisphere)
      const seasonalFactor = 1 + 0.5 * Math.sin(2 * Math.PI * (weekNum - 25) / 52)
      expected *= seasonalFactor
    }

    // Simulate outbreak
    let lambda = expected
    if (outbreakWeek > 0 && weekNum >= outbreakWeek && weekNum < outbreakWeek + 8) {
      lambda *= outbreakMultiplier
    }

    // Generate cases using Poisson distribution
    const cases = randomPoisson(rng, lambda)
    
    // Determine if alert should be triggered
    const alert = cases > expected * alertThreshold ? 1 : 0

    data.push({
      week: weekNum,
      year,
      disease,
      cases,
      expected: Math.round(expected * 10) / 10,
      alert: alert as 0 | 1,
    })
  }

  return data
}
