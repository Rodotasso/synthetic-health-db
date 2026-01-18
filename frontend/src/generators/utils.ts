/**
 * Mulberry32 PRNG - Deterministic random number generator
 * Allows reproducible data generation with seeds
 */
export function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Simple string hash function for generating IDs
 */
export function hash(s: string): string {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h).toString(16).toUpperCase().substring(0, 6).padStart(6, '0')
}

/**
 * Generate a patient ID in format SHDB-{year}-{sex}-{region}-{hash}
 */
export function generatePatientId(
  year: number,
  sex: string,
  region: string,
  index: number
): string {
  return `SHDB-${year}-${sex}-${region}-${hash(year + sex + region + index.toString())}`
}

/**
 * Format a number with leading zeros
 */
export function padNumber(n: number, width: number): string {
  return String(n).padStart(width, '0')
}

/**
 * Generate a random date in a given year
 */
export function randomDate(rng: () => number, year: number): string {
  const month = Math.floor(rng() * 12) + 1
  const day = Math.floor(rng() * 28) + 1
  return `${year}-${padNumber(month, 2)}-${padNumber(day, 2)}`
}

/**
 * Pick a random item from an array
 */
export function randomPick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)]
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function randomInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min
}

/**
 * Generate exponentially distributed random number
 */
export function randomExponential(rng: () => number, lambda: number): number {
  return -Math.log(rng()) / lambda
}

/**
 * Generate normally distributed random number (Box-Muller)
 */
export function randomNormal(rng: () => number, mean: number = 0, std: number = 1): number {
  const u1 = rng()
  const u2 = rng()
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  return z * std + mean
}

/**
 * Generate Poisson distributed random number
 */
export function randomPoisson(rng: () => number, lambda: number): number {
  const L = Math.exp(-lambda)
  let k = 0
  let p = 1
  do {
    k++
    p *= rng()
  } while (p > L)
  return k - 1
}

/**
 * Chilean regions (codes 01-16)
 */
export const REGIONS = [
  '01', '02', '03', '04', '05', '06', '07', '08',
  '09', '10', '11', '12', '13', '14', '15', '16',
] as const

/**
 * Common CIE-10 codes for synthetic data
 */
export const CIE10_CODES = [
  'E11.0', 'E11.9', 'I10', 'I21.0', 'I25.1', 'J44.9', 'F32.9',
  'M54.5', 'K21.0', 'N18.9', 'G20', 'C50.9', 'A00.0', 'J18.9', 'R10.4',
] as const

/**
 * Insurance types
 */
export const INSURANCE_TYPES = [
  'fonasa_a', 'fonasa_b', 'fonasa_c', 'fonasa_d', 'isapre',
] as const

/**
 * Encounter types
 */
export const ENCOUNTER_TYPES = [
  'ambulatory', 'emergency', 'inpatient', 'telehealth',
] as const

/**
 * Surveillance diseases
 */
export const SURVEILLANCE_DISEASES = [
  'A00', 'J09', 'A90', 'B05', 'A39',
] as const

/**
 * Cancer stages
 */
export const CANCER_STAGES = ['I', 'II', 'III', 'IV'] as const

/**
 * Smoking status
 */
export const SMOKING_STATUS = ['never', 'former', 'current'] as const

/**
 * Severity levels
 */
export const SEVERITY_LEVELS = ['mild', 'moderate', 'severe'] as const
