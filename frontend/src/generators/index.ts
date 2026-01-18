/**
 * Synthetic Health Database Generators
 * 
 * Provides deterministic, reproducible data generation for:
 * - Medical: demographics, CIE-10, encounters
 * - Epidemiology: SIR, SEIR, surveillance, outbreak
 * - Biostatistics: survival cohort, case-control
 * - Regression: linear, logistic, Poisson, Cox
 */

// Re-export individual generators
export { generateDemographics } from './demographics'
export type { DemographicsRecord, DemographicsParams } from './demographics'

export { generateCIE10 } from './cie10'
export type { CIE10Record, CIE10Params } from './cie10'

export { generateEncounters } from './encounters'
export type { EncounterRecord, EncountersParams } from './encounters'

export { generateSurvival } from './survival'
export type { SurvivalRecord, SurvivalParams } from './survival'

export { generateCaseControl } from './casecontrol'
export type { CaseControlRecord, CaseControlParams } from './casecontrol'

export { generateSurveillance } from './surveillance'
export type { SurveillanceRecord, SurveillanceParams } from './surveillance'

export { generateOutbreak } from './outbreak'
export type { OutbreakRecord, OutbreakParams } from './outbreak'

export { generateSIR } from './sir'
export type { SIRRecord, SIRParams } from './sir'

export { generateSEIR } from './seir'
export type { SEIRRecord, SEIRParams } from './seir'

export { generateLinear, generateLogistic, generatePoisson, generateCox } from './regression'
export type { 
  LinearRecord, LinearParams,
  LogisticRecord, LogisticParams,
  PoissonRecord, PoissonParams,
  CoxRecord, CoxParams,
} from './regression'

// Re-export utilities
export { mulberry32, hash, generatePatientId } from './utils'

// Re-export join utilities
export { 
  generateRelatedDatasets, 
  generateJoinedDataset,
  mergeDatasets,
  type JoinConfig,
  type JoinedDataset,
} from './joins'

// Import for unified interface
import { generateDemographics } from './demographics'
import { generateCIE10 } from './cie10'
import { generateEncounters } from './encounters'
import { generateSurvival } from './survival'
import { generateCaseControl } from './casecontrol'
import { generateSurveillance } from './surveillance'
import { generateOutbreak } from './outbreak'
import { generateSIR } from './sir'
import { generateSEIR } from './seir'
import { generateLinear, generateLogistic, generatePoisson, generateCox } from './regression'

// Generic record type - using index signature compatible type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GeneratedRecord = Record<string, any>

// Generator function signature
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GeneratorFunction = (
  count: number,
  seed: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => any[]

/**
 * Map of schema IDs to their generator functions
 */
export const generators: Record<string, GeneratorFunction> = {
  // Medical
  demographics: generateDemographics,
  cie10: generateCIE10,
  encounters: generateEncounters,
  
  // Epidemiology
  sir: generateSIR,
  seir: generateSEIR,
  surveillance: generateSurveillance,
  outbreak: generateOutbreak,
  
  // Biostatistics
  survival_cohort: generateSurvival,
  case_control: generateCaseControl,
  
  // Regression
  linear: generateLinear,
  logistic: generateLogistic,
  poisson: generatePoisson,
  cox: generateCox,
}

/**
 * Generate data for a schema by ID
 */
export function generate(
  schemaId: string,
  count: number,
  seed: number,
  params?: Record<string, unknown>
): GeneratedRecord[] {
  const generator = generators[schemaId]
  if (!generator) {
    throw new Error(`Unknown schema: ${schemaId}`)
  }
  return generator(count, seed, params)
}

/**
 * Convert records to CSV string
 */
export function toCSV(records: GeneratedRecord[]): string {
  if (records.length === 0) return ''
  
  const headers = Object.keys(records[0])
  const rows = records.map(record => 
    headers.map(h => {
      const val = record[h]
      // Quote strings that contain commas or quotes
      if (typeof val === 'string' && (val.includes(',') || val.includes('"'))) {
        return `"${val.replace(/"/g, '""')}"`
      }
      return val === null || val === undefined ? '' : String(val)
    }).join(',')
  )
  
  return [headers.join(','), ...rows].join('\n')
}

/**
 * Convert records to JSON string (pretty printed)
 */
export function toJSON(records: GeneratedRecord[]): string {
  return JSON.stringify(records, null, 2)
}

/**
 * Download data as a file
 */
export function downloadFile(
  data: string,
  filename: string,
  mimeType: string = 'text/plain'
): void {
  const blob = new Blob([data], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Download records as CSV
 */
export function downloadCSV(records: GeneratedRecord[], filename: string): void {
  downloadFile(toCSV(records), filename.endsWith('.csv') ? filename : `${filename}.csv`, 'text/csv')
}

/**
 * Download records as JSON
 */
export function downloadJSON(records: GeneratedRecord[], filename: string): void {
  downloadFile(toJSON(records), filename.endsWith('.json') ? filename : `${filename}.json`, 'application/json')
}
