import {
  mulberry32,
  padNumber,
  randomInt,
  randomPick,
  SEVERITY_LEVELS,
} from './utils'

export interface OutbreakRecord {
  case_id: string
  generation: number
  infector_id: string | null
  onset_date: string
  age: number
  sex: 'M' | 'F'
  severity: string
}

export interface OutbreakParams {
  /** Start date of outbreak (YYYY-MM-DD) */
  startDate?: string
  /** Average reproduction number (secondary cases per case) */
  r0?: number
  /** Average serial interval in days */
  serialInterval?: number
  /** Maximum generations to simulate */
  maxGenerations?: number
}

export function generateOutbreak(
  count: number,
  seed: number,
  params: OutbreakParams = {}
): OutbreakRecord[] {
  const {
    startDate = '2024-01-15',
    r0 = 2.5,
    serialInterval = 5,
    maxGenerations = 6,
  } = params

  const rng = mulberry32(seed)
  const data: OutbreakRecord[] = []
  let caseNum = 0

  // Parse start date
  const [_year, _month, _day] = startDate.split('-').map(Number)

  // Track cases by generation for linking
  const casesByGeneration: string[][] = []

  // Generate index case (generation 0)
  const indexCaseId = `OB-${padNumber(++caseNum, 6)}`
  data.push({
    case_id: indexCaseId,
    generation: 0,
    infector_id: null,
    onset_date: startDate,
    age: randomInt(rng, 20, 60),
    sex: rng() < 0.5 ? 'M' : 'F',
    severity: randomPick(rng, SEVERITY_LEVELS),
  })
  casesByGeneration[0] = [indexCaseId]

  // Generate subsequent generations
  let generation = 1
  while (data.length < count && generation <= maxGenerations) {
    const previousGen = casesByGeneration[generation - 1] || []
    if (previousGen.length === 0) break

    casesByGeneration[generation] = []

    for (const infectorId of previousGen) {
      if (data.length >= count) break

      // Each infector generates ~R0 secondary cases (Poisson distributed)
      const L = Math.exp(-r0)
      let k = 0
      let p = 1
      do {
        k++
        p *= rng()
      } while (p > L)
      const nSecondary = k - 1

      for (let i = 0; i < nSecondary && data.length < count; i++) {
        const caseId = `OB-${padNumber(++caseNum, 6)}`
        
        // Calculate onset date with some variation around serial interval
        const daysFromInfector = Math.max(1, Math.round(serialInterval + (rng() - 0.5) * 4))
        const infectorCase = data.find(c => c.case_id === infectorId)!
        const infectorDate = new Date(infectorCase.onset_date)
        const onsetDate = new Date(infectorDate)
        onsetDate.setDate(onsetDate.getDate() + daysFromInfector)

        const onsetStr = `${onsetDate.getFullYear()}-${padNumber(onsetDate.getMonth() + 1, 2)}-${padNumber(onsetDate.getDate(), 2)}`

        data.push({
          case_id: caseId,
          generation,
          infector_id: infectorId,
          onset_date: onsetStr,
          age: randomInt(rng, 5, 85),
          sex: rng() < 0.5 ? 'M' : 'F',
          severity: randomPick(rng, SEVERITY_LEVELS),
        })

        casesByGeneration[generation].push(caseId)
      }
    }

    generation++
  }

  return data
}
