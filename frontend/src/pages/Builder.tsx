import { useState, useCallback } from 'react'
import { Plus, Link2, Trash2, ArrowRight, Download, RefreshCw, Eye, FileJson, FileSpreadsheet } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, Select, Badge, Input, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'
import { schemas, categoryLabels, categoryColors } from '@/data/schemas'
import { generateRelatedDatasets, downloadCSV, downloadJSON, type JoinedDataset } from '@/generators'
import { cn } from '@/lib/utils'

interface SchemaNode {
  id: string
  schemaId: string
  joinType?: '1:1' | '1:N'
  joinKey?: string
  minRecords?: number
  maxRecords?: number
}

const presets = [
  {
    id: 'cohorte-clinica',
    name: 'Cohorte Clínica',
    description: 'Pacientes con encuentros y diagnósticos',
    schemas: [
      { schemaId: 'demographics', joinKey: 'patient_id', minRecords: 1, maxRecords: 1 },
      { schemaId: 'encounters', joinType: '1:N' as const, joinKey: 'patient_id', minRecords: 1, maxRecords: 5 },
      { schemaId: 'cie10', joinType: '1:N' as const, joinKey: 'patient_id', minRecords: 1, maxRecords: 3 },
    ],
  },
  {
    id: 'supervivencia',
    name: 'Estudio de Supervivencia',
    description: 'Cohorte con seguimiento y eventos',
    schemas: [
      { schemaId: 'demographics', joinKey: 'patient_id', minRecords: 1, maxRecords: 1 },
      { schemaId: 'survival_cohort', joinType: '1:1' as const, joinKey: 'patient_id', minRecords: 1, maxRecords: 1 },
    ],
  },
  {
    id: 'caso-control',
    name: 'Caso-Control',
    description: 'Estudio epidemiológico con exposiciones',
    schemas: [
      { schemaId: 'case_control', joinKey: 'subject_id', minRecords: 1, maxRecords: 1 },
      { schemaId: 'cie10', joinType: '1:N' as const, joinKey: 'subject_id', minRecords: 0, maxRecords: 2 },
    ],
  },
  {
    id: 'brote',
    name: 'Análisis de Brote',
    description: 'Simulación epidémica completa',
    schemas: [
      { schemaId: 'sir', joinKey: 'day', minRecords: 1, maxRecords: 1 },
      { schemaId: 'surveillance', joinType: '1:1' as const, joinKey: 'week', minRecords: 1, maxRecords: 1 },
    ],
  },
]

// Keys that can be used for joining
const joinableKeys = ['patient_id', 'subject_id', 'case_id', 'encounter_id', 'day', 'week', 'id']

export function Builder() {
  const [nodes, setNodes] = useState<SchemaNode[]>([])
  const [selectedPreset, setSelectedPreset] = useState('')
  const [baseCount, setBaseCount] = useState(100)
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 1000000))
  const [generatedData, setGeneratedData] = useState<JoinedDataset[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('')

  const addNode = () => {
    const newNode: SchemaNode = {
      id: `node-${Date.now()}`,
      schemaId: '',
      joinType: nodes.length > 0 ? '1:1' : undefined,
      joinKey: nodes.length > 0 ? 'patient_id' : undefined,
      minRecords: 1,
      maxRecords: 3,
    }
    setNodes([...nodes, newNode])
  }

  const updateNode = (id: string, updates: Partial<SchemaNode>) => {
    setNodes(nodes.map((n) => (n.id === id ? { ...n, ...updates } : n)))
  }

  const removeNode = (id: string) => {
    setNodes(nodes.filter((n) => n.id !== id))
  }

  const applyPreset = (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId)
    if (!preset) return

    const newNodes: SchemaNode[] = preset.schemas.map((config, index) => ({
      id: `node-${Date.now()}-${index}`,
      schemaId: config.schemaId,
      joinType: index > 0 ? config.joinType : undefined,
      joinKey: config.joinKey,
      minRecords: config.minRecords || 1,
      maxRecords: config.maxRecords || 3,
    }))
    setNodes(newNodes)
    setSelectedPreset(presetId)
    setGeneratedData([])
  }

  const generateData = useCallback(() => {
    const validNodes = nodes.filter(n => n.schemaId)
    if (validNodes.length === 0) return

    setIsGenerating(true)

    setTimeout(() => {
      try {
        const configs = validNodes.map((node, index) => ({
          schemaId: node.schemaId,
          name: schemas.find(s => s.id === node.schemaId)?.name || node.schemaId,
          joinType: index > 0 ? node.joinType : undefined,
          joinKey: node.joinKey,
          minRecords: node.minRecords,
          maxRecords: node.maxRecords,
        }))

        const datasets = generateRelatedDatasets(configs, baseCount, seed)
        setGeneratedData(datasets)
        if (datasets.length > 0) {
          setActiveTab(datasets[0].name)
        }
      } catch (error) {
        console.error('Generation error:', error)
        setGeneratedData([])
      }
      setIsGenerating(false)
    }, 50)
  }, [nodes, baseCount, seed])

  const regenerateSeed = () => {
    setSeed(Math.floor(Math.random() * 1000000))
  }

  const handleDownloadAll = (format: 'csv' | 'json') => {
    generatedData.forEach(dataset => {
      const filename = `${dataset.name.toLowerCase().replace(/\s+/g, '_')}_${baseCount}_seed${seed}`
      if (format === 'csv') {
        downloadCSV(dataset.data, filename)
      } else {
        downloadJSON(dataset.data, filename)
      }
    })
  }

  const handleDownloadSingle = (dataset: JoinedDataset, format: 'csv' | 'json') => {
    const filename = `${dataset.name.toLowerCase().replace(/\s+/g, '_')}_${baseCount}_seed${seed}`
    if (format === 'csv') {
      downloadCSV(dataset.data, filename)
    } else {
      downloadJSON(dataset.data, filename)
    }
  }

  const canGenerate = nodes.some(n => n.schemaId)

  // Get column names for a dataset
  const getColumnNames = (data: Record<string, unknown>[]) => {
    if (data.length === 0) return []
    return Object.keys(data[0])
  }

  return (
    <div className="flex-1 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Schema Builder</h1>
          <p className="text-muted-foreground">
            Combina múltiples esquemas para crear bases de datos relacionadas
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Presets */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Presets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset.id)}
                    className={cn(
                      'w-full p-3 rounded-lg border text-left transition-colors',
                      selectedPreset === preset.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div className="font-medium mb-1">{preset.name}</div>
                    <div className="text-xs text-muted-foreground">{preset.description}</div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Generation Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Configuración</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Registros base
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={10000}
                    value={baseCount}
                    onChange={(e) => setBaseCount(parseInt(e.target.value) || 100)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Registros en el esquema principal
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Semilla
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={seed}
                      onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" onClick={regenerateSeed}>
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Builder Canvas */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Esquemas</CardTitle>
                <Button size="sm" onClick={addNode}>
                  <Plus className="w-4 h-4 mr-1" />
                  Agregar
                </Button>
              </CardHeader>
              <CardContent>
                {nodes.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Link2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Selecciona un preset o agrega esquemas manualmente</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {nodes.map((node, index) => {
                      const schema = schemas.find((s) => s.id === node.schemaId)
                      return (
                        <div key={node.id} className="flex items-start gap-4">
                          {index > 0 && (
                            <div className="flex flex-col items-center gap-2 pt-4">
                              <Select
                                value={node.joinType || '1:1'}
                                onChange={(e) =>
                                  updateNode(node.id, { joinType: e.target.value as '1:1' | '1:N' })
                                }
                                className="w-16 text-xs"
                              >
                                <option value="1:1">1:1</option>
                                <option value="1:N">1:N</option>
                              </Select>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}

                          <div className="flex-1 p-4 rounded-lg border border-border bg-card">
                            <div className="flex items-center gap-3 mb-3">
                              <Select
                                value={node.schemaId}
                                onChange={(e) => updateNode(node.id, { schemaId: e.target.value })}
                                className="flex-1"
                              >
                                <option value="">Seleccionar esquema...</option>
                                {schemas.map((s) => (
                                  <option key={s.id} value={s.id}>
                                    {s.name}
                                  </option>
                                ))}
                              </Select>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeNode(node.id)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>

                            {schema && (
                              <>
                                <div className="flex items-center gap-2 mb-3">
                                  <Badge className={categoryColors[schema.category]}>
                                    {categoryLabels[schema.category]}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {schema.columns.length} columnas
                                  </span>
                                </div>

                                {/* Join configuration for non-first nodes */}
                                {index > 0 && (
                                  <div className="flex gap-3 text-sm">
                                    <div className="flex-1">
                                      <label className="block text-xs text-muted-foreground mb-1">
                                        Join Key
                                      </label>
                                      <Select
                                        value={node.joinKey || 'patient_id'}
                                        onChange={(e) => updateNode(node.id, { joinKey: e.target.value })}
                                        className="text-xs"
                                      >
                                        {joinableKeys.map(key => (
                                          <option key={key} value={key}>{key}</option>
                                        ))}
                                      </Select>
                                    </div>
                                    
                                    {node.joinType === '1:N' && (
                                      <>
                                        <div>
                                          <label className="block text-xs text-muted-foreground mb-1">
                                            Min
                                          </label>
                                          <Input
                                            type="number"
                                            min={0}
                                            max={10}
                                            value={node.minRecords || 1}
                                            onChange={(e) => updateNode(node.id, { minRecords: parseInt(e.target.value) || 0 })}
                                            className="w-16 text-xs"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs text-muted-foreground mb-1">
                                            Max
                                          </label>
                                          <Input
                                            type="number"
                                            min={1}
                                            max={20}
                                            value={node.maxRecords || 3}
                                            onChange={(e) => updateNode(node.id, { maxRecords: parseInt(e.target.value) || 3 })}
                                            className="w-16 text-xs"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {nodes.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button 
                      className="w-full" 
                      onClick={generateData}
                      disabled={!canGenerate || isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generando...
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Generar Datos
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generated Data Preview */}
            {generatedData.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Datos Generados</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleDownloadAll('csv')}>
                      <FileSpreadsheet className="w-4 h-4 mr-1" />
                      CSV
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDownloadAll('json')}>
                      <FileJson className="w-4 h-4 mr-1" />
                      JSON
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      {generatedData.map((dataset) => (
                        <TabsTrigger key={dataset.name} value={dataset.name}>
                          {dataset.name}
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {dataset.data.length}
                          </Badge>
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {generatedData.map((dataset) => (
                      <TabsContent key={dataset.name} value={dataset.name}>
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-sm text-muted-foreground">
                            Mostrando 10 de {dataset.data.length} registros
                          </p>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleDownloadSingle(dataset, 'csv')}
                            >
                              <Download className="w-3 h-3 mr-1" />
                              CSV
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleDownloadSingle(dataset, 'json')}
                            >
                              <Download className="w-3 h-3 mr-1" />
                              JSON
                            </Button>
                          </div>
                        </div>
                        
                        <div className="overflow-auto border rounded-lg max-h-80">
                          <table className="w-full text-sm">
                            <thead className="bg-secondary sticky top-0">
                              <tr>
                                <th className="px-3 py-2 text-left font-medium text-muted-foreground w-10">#</th>
                                {getColumnNames(dataset.data).map((col) => (
                                  <th key={col} className="px-3 py-2 text-left font-medium whitespace-nowrap">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {dataset.data.slice(0, 10).map((row, idx) => (
                                <tr key={idx} className="border-t border-border hover:bg-secondary/30">
                                  <td className="px-3 py-2 text-muted-foreground">{idx + 1}</td>
                                  {getColumnNames(dataset.data).map((col) => (
                                    <td key={col} className="px-3 py-2 whitespace-nowrap">
                                      {formatCellValue(row[col])}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Semilla: <code className="bg-secondary px-1 rounded">{seed}</code>
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to format cell values for display
function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return '-'
  if (typeof value === 'boolean') return value ? 'Sí' : 'No'
  if (typeof value === 'number') {
    if (Number.isInteger(value)) return value.toLocaleString()
    return value.toLocaleString(undefined, { maximumFractionDigits: 3 })
  }
  return String(value)
}
