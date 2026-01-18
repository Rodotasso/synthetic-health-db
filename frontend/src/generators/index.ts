/**
 * Synthetic Health Database Generators
 * 
 * Provides deterministic, reproducible data generation for:
 * - Medical: demographics, CIE-10, encounters, medications, observations, vitals, immunizations, conditions, procedures, organizations
 * - Epidemiology: SIR, SEIR, surveillance, outbreak
 * - Biostatistics: survival cohort, case-control
 * - Regression: linear, logistic, Poisson, Cox
 */

// Re-export individual generators
export { generateDemographics, generateDemographicsLegacy } from './demographics'
export type { DemographicsRecord, DemographicsParams } from './demographics'

export { generateCIE10 } from './cie10'
export type { CIE10Record, CIE10Params } from './cie10'

export { generateEncounters } from './encounters'
export type { EncounterRecord, EncountersParams } from './encounters'

export { generateMedications } from './medications'
export type { MedicationRecord, MedicationsParams } from './medications'

export { generateObservations } from './observations'
export type { ObservationRecord, ObservationsParams } from './observations'

export { generateVitals, generateVitalsSimple } from './vitals'
export type { VitalsRecord, VitalsParams } from './vitals'

export { generateImmunizations } from './immunizations'
export type { ImmunizationRecord, ImmunizationsParams } from './immunizations'

export { generateConditions } from './conditions'
export type { ConditionRecord, ConditionsParams } from './conditions'

export { generateProcedures } from './procedures'
export type { ProcedureRecord, ProceduresParams } from './procedures'

export { generateOrganizations, getAllOrganizations } from './organizations'
export type { OrganizationRecord, OrganizationsParams } from './organizations'

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
import { generateMedications } from './medications'
import { generateObservations } from './observations'
import { generateVitalsSimple } from './vitals'
import { generateImmunizations } from './immunizations'
import { generateConditions } from './conditions'
import { generateProcedures } from './procedures'
import { generateOrganizations } from './organizations'
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

// Helper to generate patient IDs for dependent generators
function generatePatientIdsForGenerator(count: number, seed: number): string[] {
  const demographics = generateDemographics(Math.max(count, 100), seed)
  return demographics.map(d => d.patient_id)
}

// Wrapper generators that auto-generate patient IDs
function wrapWithPatientIds<T>(
  generator: (patientIds: string[], count: number, seed: number, params?: T) => GeneratedRecord[]
): GeneratorFunction {
  return (count: number, seed: number, params?: T) => {
    const patientIds = generatePatientIdsForGenerator(count, seed)
    return generator(patientIds, count, seed, params)
  }
}

/**
 * Map of schema IDs to their generator functions
 */
export const generators: Record<string, GeneratorFunction> = {
  // Medical
  demographics: generateDemographics,
  cie10: generateCIE10,
  encounters: generateEncounters,
  medications: wrapWithPatientIds(generateMedications),
  observations: wrapWithPatientIds(generateObservations),
  vitals: (count, seed, params) => generateVitalsSimple(
    generatePatientIdsForGenerator(count, seed), 
    count, 
    seed, 
    params
  ),
  immunizations: wrapWithPatientIds(generateImmunizations),
  conditions: wrapWithPatientIds(generateConditions),
  procedures: wrapWithPatientIds(generateProcedures),
  organizations: generateOrganizations,
  
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
