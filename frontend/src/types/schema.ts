export type SchemaCategory = 'medical' | 'epidemiology' | 'biostatistics' | 'regression'

export interface SchemaColumn {
  name: string
  type: 'string' | 'number' | 'date' | 'boolean'
  description?: string
}

export interface Schema {
  id: string
  name: string
  description: string
  category: SchemaCategory
  columns: SchemaColumn[]
  defaultParams?: Record<string, unknown>
  analysis?: string[]
}

export interface GenerationConfig {
  schemaId: string
  rowCount: number
  seed?: number
  params?: Record<string, unknown>
}
