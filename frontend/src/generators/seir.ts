import { mulberry32 } from './utils'

export interface SEIRRecord {
  day: number
  susceptible: number
  exposed: number
  infected: number
  recovered: number
  new_exposures: number
  new_infections: number
}

export interface SEIRParams {
  /** Transmission rate (contacts per day * probability of transmission) */
  beta?: number
  /** Rate of progression from exposed to infected (1/latent period in days) */
  sigma?: number
  /** Recovery rate (1/duration of infection in days) */
  gamma?: number
  /** Total population size */
  population?: number
  /** Initial number of exposed individuals */
  initialExposed?: number
  /** Initial number of infected individuals */
  initialInfected?: number
  /** Number of days to simulate */
  days?: number
  /** Add stochastic noise */
  stochastic?: boolean
}

export function generateSEIR(
  count: number,
  seed: number,
  params: SEIRParams = {}
): SEIRRecord[] {
  const {
    beta = 0.3,
    sigma = 0.2,  // 5 day latent period
    gamma = 0.1,  // 10 day infectious period
    population = 10000,
    initialExposed = 5,
    initialInfected = 5,
    days = count,
    stochastic = false,
  } = params

  const rng = mulberry32(seed)
  const data: SEIRRecord[] = []

  let S = population - initialExposed - initialInfected
  let E = initialExposed
  let I = initialInfected
  let R = 0

  // Record day 0
  data.push({
    day: 0,
    susceptible: Math.round(S),
    exposed: Math.round(E),
    infected: Math.round(I),
    recovered: Math.round(R),
    new_exposures: initialExposed,
    new_infections: initialInfected,
  })

  for (let day = 1; day < days; day++) {
    const N = S + E + I + R

    // Calculate transitions
    let dS_to_E = (beta * S * I) / N  // New exposures
    let dE_to_I = sigma * E           // Exposed becoming infectious
    let dI_to_R = gamma * I           // Recoveries

    // Add stochastic variation if enabled
    if (stochastic) {
      dS_to_E *= (1 + (rng() - 0.5) * 0.2)
      dE_to_I *= (1 + (rng() - 0.5) * 0.2)
      dI_to_R *= (1 + (rng() - 0.5) * 0.2)
    }

    // Ensure we don't go negative
    dS_to_E = Math.min(dS_to_E, S)
    dE_to_I = Math.min(dE_to_I, E)
    dI_to_R = Math.min(dI_to_R, I)

    // Update compartments
    S -= dS_to_E
    E += dS_to_E - dE_to_I
    I += dE_to_I - dI_to_R
    R += dI_to_R

    data.push({
      day,
      susceptible: Math.round(S),
      exposed: Math.round(E),
      infected: Math.round(I),
      recovered: Math.round(R),
      new_exposures: Math.round(dS_to_E),
      new_infections: Math.round(dE_to_I),
    })
  }

  return data
}
