import {
  mulberry32,
  generatePatientId,
  randomInt,
} from './utils'
import { comunas, type Comuna } from '@/data/comunas'

export interface DemographicsRecord {
  patient_id: string
  birth_year: number
  age: number
  age_months: number
  sex: 'M' | 'F'
  region: string
  region_code: string
  comuna: string
  comuna_code: string
  ruralidad: 'Urbano' | 'Rural' | 'Mixto'
  prevision: 'FONASA A' | 'FONASA B' | 'FONASA C' | 'FONASA D' | 'ISAPRE' | 'Sin previsión'
  insurance_type: 'Público' | 'Privado' | 'Sin cobertura'
}

export interface DemographicsParams {
  minBirthYear?: number
  maxBirthYear?: number
  femaleRatio?: number
  isapreRatio?: number
  fonasaDistribution?: { a: number; b: number; c: number; d: number }
}

const CURRENT_YEAR = 2025

// FONASA distribution based on Chilean health statistics
// A: indigentes ~15%, B: ingreso bajo ~35%, C: ingreso medio ~25%, D: ingreso alto ~25%
const DEFAULT_FONASA_DIST = { a: 0.15, b: 0.35, c: 0.25, d: 0.25 }

// Weighted pick for comuna based on population
function weightedComunaPick(rng: () => number): Comuna {
  const totalPop = comunas.reduce((sum, c) => sum + c.poblacion, 0)
  let r = rng() * totalPop
  
  for (const comuna of comunas) {
    r -= comuna.poblacion
    if (r <= 0) return comuna
  }
  
  return comunas[comunas.length - 1]
}

// Determine prevision based on comuna and random factors
function determinePrevision(
  rng: () => number, 
  comuna: Comuna, 
  isapreRatio: number,
  fonasaDist: { a: number; b: number; c: number; d: number }
): DemographicsRecord['prevision'] {
  // Urban areas with higher income have more ISAPRE
  const isHighIncome = ['Las Condes', 'Vitacura', 'Lo Barnechea', 'Providencia', 'Ñuñoa'].includes(comuna.nombre)
  const adjustedIsapreRatio = isHighIncome ? isapreRatio * 2.5 : isapreRatio
  
  // Rural areas have more FONASA A
  const isRural = comuna.ruralidad === 'Rural'
  
  if (rng() < 0.02) return 'Sin previsión' // ~2% without coverage
  
  if (rng() < adjustedIsapreRatio) return 'ISAPRE'
  
  // Distribute among FONASA tramos
  const r = rng()
  const adjustedA = isRural ? fonasaDist.a * 1.5 : fonasaDist.a
  const total = adjustedA + fonasaDist.b + fonasaDist.c + fonasaDist.d
  
  if (r < adjustedA / total) return 'FONASA A'
  if (r < (adjustedA + fonasaDist.b) / total) return 'FONASA B'
  if (r < (adjustedA + fonasaDist.b + fonasaDist.c) / total) return 'FONASA C'
  return 'FONASA D'
}

export function generateDemographics(
  count: number,
  seed: number,
  params: DemographicsParams = {}
): DemographicsRecord[] {
  const {
    minBirthYear = 1940,
    maxBirthYear = 2024,
    femaleRatio = 0.51,
    isapreRatio = 0.17, // ~17% of Chileans have ISAPRE
    fonasaDistribution = DEFAULT_FONASA_DIST,
  } = params

  const rng = mulberry32(seed)
  const data: DemographicsRecord[] = []

  for (let i = 0; i < count; i++) {
    const birthYear = randomInt(rng, minBirthYear, maxBirthYear)
    const birthMonth = randomInt(rng, 1, 12)
    const sex: 'M' | 'F' = rng() < femaleRatio ? 'F' : 'M'
    
    // Select comuna weighted by population
    const comuna = weightedComunaPick(rng)
    
    // Determine prevision
    const prevision = determinePrevision(rng, comuna, isapreRatio, fonasaDistribution)
    
    // Calculate age in years and months
    const age = CURRENT_YEAR - birthYear
    const currentMonth = 6 // Assume mid-year
    const ageMonths = age * 12 + (currentMonth - birthMonth)

    data.push({
      patient_id: generatePatientId(birthYear, sex, comuna.regionCodigo, i),
      birth_year: birthYear,
      age,
      age_months: Math.max(0, ageMonths),
      sex,
      region: comuna.region,
      region_code: comuna.regionCodigo,
      comuna: comuna.nombre,
      comuna_code: comuna.codigo,
      ruralidad: comuna.ruralidad,
      prevision,
      insurance_type: prevision === 'ISAPRE' ? 'Privado' 
        : prevision === 'Sin previsión' ? 'Sin cobertura' 
        : 'Público',
    })
  }

  return data
}

// Legacy function for backward compatibility
export function generateDemographicsLegacy(
  count: number,
  seed: number,
  params: DemographicsParams = {}
): { patient_id: string; age: number; sex: 'M' | 'F'; region: string; urban: string; insurance: string }[] {
  const records = generateDemographics(count, seed, params)
  return records.map(r => ({
    patient_id: r.patient_id,
    age: r.age,
    sex: r.sex,
    region: r.region_code,
    urban: r.ruralidad === 'Urbano' ? 'urban' : 'rural',
    insurance: r.prevision.toLowerCase().replace(' ', '_'),
  }))
}
