import { mulberry32 } from './utils'

export interface SIRRecord {
  day: number
  susceptible: number
  infected: number
  recovered: number
  new_infections: number
  cumulative_infections: number
}

export interface SIRParams {
  /** Transmission rate (contacts per day * probability of transmission) */
  beta?: number
  /** Recovery rate (1/duration of infection in days) */
  gamma?: number
  /** Total population size */
  population?: number
  /** Initial number of infected individuals */
  initialInfected?: number
  /** Number of days to simulate */
  days?: number
  /** Add stochastic noise */
  stochastic?: boolean
}

export function generateSIR(
  count: number,
  seed: number,
  params: SIRParams = {}
): SIRRecord[] {
  const {
    beta = 0.3,
    gamma = 0.1,
    population = 10000,
    initialInfected = 10,
    days = count,
    stochastic = false,
  } = params

  const rng = mulberry32(seed)
  const data: SIRRecord[] = []

  let S = population - initialInfected
  let I = initialInfected
  let R = 0
  let cumulative = initialInfected

  // Record day 0
  data.push({
    day: 0,
    susceptible: Math.round(S),
    infected: Math.round(I),
    recovered: Math.round(R),
    new_infections: initialInfected,
    cumulative_infections: cumulative,
  })

  for (let day = 1; day < days; day++) {
    const N = S + I + R

    // Calculate transitions
    let dS_to_I = (beta * S * I) / N
    let dI_to_R = gamma * I

    // Add stochastic variation if enabled
    if (stochastic) {
      dS_to_I *= (1 + (rng() - 0.5) * 0.2)
      dI_to_R *= (1 + (rng() - 0.5) * 0.2)
    }

    // Ensure we don't go negative
    dS_to_I = Math.min(dS_to_I, S)
    dI_to_R = Math.min(dI_to_R, I)

    // Update compartments
    S -= dS_to_I
    I += dS_to_I - dI_to_R
    R += dI_to_R
    cumulative += dS_to_I

    data.push({
      day,
      susceptible: Math.round(S),
      infected: Math.round(I),
      recovered: Math.round(R),
      new_infections: Math.round(dS_to_I),
      cumulative_infections: Math.round(cumulative),
    })
  }

  return data
}
