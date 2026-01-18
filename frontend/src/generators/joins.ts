/**
 * Schema joining utilities for creating related datasets
 */

import { generate, type GeneratedRecord } from './index'
import { mulberry32, randomInt } from './utils'

export interface JoinConfig {
  schemaId: string
  joinType: '1:1' | '1:N'
  joinKey: string
  /** For 1:N, min records per parent */
  minRecords?: number
  /** For 1:N, max records per parent */
  maxRecords?: number
  /** Schema-specific params */
  params?: Record<string, unknown>
}

export interface JoinedDataset {
  name: string
  data: GeneratedRecord[]
}

/**
 * Generate a base dataset with a primary key
 */
export function generateBaseDataset(
  schemaId: string,
  count: number,
  seed: number,
  params?: Record<string, unknown>
): GeneratedRecord[] {
  return generate(schemaId, count, seed, params)
}

/**
 * Generate a joined dataset based on parent records
 * 
 * For 1:1 joins: Creates one record per parent
 * For 1:N joins: Creates multiple records per parent
 */
export function generateJoinedDataset(
  parentData: GeneratedRecord[],
  config: JoinConfig,
  seed: number
): GeneratedRecord[] {
  const { schemaId, joinType, joinKey, minRecords = 1, maxRecords = 5, params } = config
  const rng = mulberry32(seed)
  const joinedData: GeneratedRecord[] = []

  // Get unique parent keys
  const parentKeys = parentData
    .map(record => record[joinKey])
    .filter((key): key is string | number => key !== undefined && key !== null)

  if (joinType === '1:1') {
    // Generate one record per parent
    const baseData = generate(schemaId, parentKeys.length, seed, params)
    
    baseData.forEach((record, index) => {
      joinedData.push({
        ...record,
        [joinKey]: parentKeys[index],
      })
    })
  } else {
    // 1:N - Generate multiple records per parent
    let recordIndex = 0
    
    for (const parentKey of parentKeys) {
      const numRecords = randomInt(rng, minRecords, maxRecords)
      const childRecords = generate(schemaId, numRecords, seed + recordIndex, params)
      
      childRecords.forEach(record => {
        joinedData.push({
          ...record,
          [joinKey]: parentKey,
        })
        recordIndex++
      })
    }
  }

  return joinedData
}

/**
 * Generate multiple related datasets from a configuration
 */
export function generateRelatedDatasets(
  configs: Array<{
    schemaId: string
    name?: string
    joinType?: '1:1' | '1:N'
    joinKey?: string
    minRecords?: number
    maxRecords?: number
    params?: Record<string, unknown>
  }>,
  baseCount: number,
  seed: number
): JoinedDataset[] {
  if (configs.length === 0) return []

  const datasets: JoinedDataset[] = []
  const rng = mulberry32(seed)

  // Generate base dataset
  const firstConfig = configs[0]
  const baseData = generate(firstConfig.schemaId, baseCount, seed, firstConfig.params)
  
  datasets.push({
    name: firstConfig.name || firstConfig.schemaId,
    data: baseData,
  })

  // Determine the primary key from the base dataset
  const primaryKey = firstConfig.joinKey || detectPrimaryKey(baseData)

  // Generate joined datasets
  for (let i = 1; i < configs.length; i++) {
    const config = configs[i]
    const childSeed = seed + Math.floor(rng() * 1000000)
    
    const joinedData = generateJoinedDataset(
      baseData,
      {
        schemaId: config.schemaId,
        joinType: config.joinType || '1:1',
        joinKey: config.joinKey || primaryKey,
        minRecords: config.minRecords,
        maxRecords: config.maxRecords,
        params: config.params,
      },
      childSeed
    )

    datasets.push({
      name: config.name || config.schemaId,
      data: joinedData,
    })
  }

  return datasets
}

/**
 * Detect the primary key from a dataset
 * Looks for common patterns: patient_id, subject_id, id, case_id, etc.
 */
function detectPrimaryKey(data: GeneratedRecord[]): string {
  if (data.length === 0) return 'id'
  
  const firstRecord = data[0]
  const keys = Object.keys(firstRecord)
  
  // Priority order for primary key detection
  const priorityKeys = [
    'patient_id',
    'subject_id', 
    'case_id',
    'encounter_id',
    'id',
  ]
  
  for (const key of priorityKeys) {
    if (keys.includes(key)) return key
  }
  
  // Fallback to first key ending with '_id'
  const idKey = keys.find(k => k.endsWith('_id'))
  if (idKey) return idKey
  
  // Ultimate fallback
  return keys[0]
}

/**
 * Merge multiple datasets into a single flat dataset
 * Useful for creating denormalized data
 */
export function mergeDatasets(
  datasets: JoinedDataset[],
  joinKey: string
): GeneratedRecord[] {
  if (datasets.length === 0) return []
  if (datasets.length === 1) return datasets[0].data

  const baseData = datasets[0].data
  const merged: GeneratedRecord[] = []

  for (const baseRecord of baseData) {
    const keyValue = baseRecord[joinKey]
    let mergedRecord: GeneratedRecord = { ...baseRecord }

    // Find matching records in other datasets
    for (let i = 1; i < datasets.length; i++) {
      const dataset = datasets[i]
      const matchingRecords = dataset.data.filter(r => r[joinKey] === keyValue)
      
      if (matchingRecords.length === 1) {
        // 1:1 - merge directly (prefix columns to avoid conflicts)
        const prefix = dataset.name + '_'
        for (const [key, value] of Object.entries(matchingRecords[0])) {
          if (key !== joinKey) {
            mergedRecord[prefix + key] = value
          }
        }
      }
      // For 1:N, we skip merging (would need separate rows)
    }

    merged.push(mergedRecord)
  }

  return merged
}
