import { useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, ChevronRight, Download, Eye, Settings, Target, RefreshCw } from 'lucide-react'
import { Button, Input, Select, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui'
import { schemas, categoryLabels, categoryColors } from '@/data/schemas'
import { generate, downloadCSV, downloadJSON, type GeneratedRecord } from '@/generators'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, name: 'Objetivo', icon: Target, description: 'Selecciona el esquema' },
  { id: 2, name: 'Configurar', icon: Settings, description: 'Ajusta parámetros' },
  { id: 3, name: 'Preview', icon: Eye, description: 'Revisa los datos' },
  { id: 4, name: 'Descargar', icon: Download, description: 'Exporta el dataset' },
]

export function Wizard() {
  const [searchParams] = useSearchParams()
  const initialSchema = searchParams.get('schema') || ''
  
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSchema, setSelectedSchema] = useState(initialSchema)
  const [rowCount, setRowCount] = useState(100)
  const [seed, setSeed] = useState<number | undefined>(undefined)
  const [previewData, setPreviewData] = useState<GeneratedRecord[]>([])
  const [fullData, setFullData] = useState<GeneratedRecord[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const schema = useMemo(
    () => schemas.find((s) => s.id === selectedSchema),
    [selectedSchema]
  )

  // Generate data when entering step 3
  const generateData = useCallback(() => {
    if (!selectedSchema) return
    
    setIsGenerating(true)
    
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      try {
        const actualSeed = seed ?? Math.floor(Math.random() * 1000000)
        const data = generate(selectedSchema, rowCount, actualSeed)
        setFullData(data)
        setPreviewData(data.slice(0, 10))
        
        // Store the used seed if it was random
        if (seed === undefined) {
          setSeed(actualSeed)
        }
      } catch (error) {
        console.error('Generation error:', error)
        setPreviewData([])
        setFullData([])
      }
      setIsGenerating(false)
    }, 50)
  }, [selectedSchema, rowCount, seed])

  const regenerateData = () => {
    setSeed(Math.floor(Math.random() * 1000000))
  }

  // Regenerate when seed changes
  useMemo(() => {
    if (currentStep >= 3 && selectedSchema && seed !== undefined) {
      generateData()
    }
  }, [seed])

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!selectedSchema
      case 2:
        return rowCount > 0 && rowCount <= 10000
      case 3:
        return fullData.length > 0
      default:
        return false
    }
  }

  const nextStep = () => {
    if (canProceed() && currentStep < 4) {
      const next = currentStep + 1
      setCurrentStep(next)
      
      // Generate data when entering step 3
      if (next === 3) {
        generateData()
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDownloadCSV = () => {
    if (fullData.length > 0 && schema) {
      downloadCSV(fullData, `${schema.id}_${rowCount}_seed${seed}.csv`)
    }
  }

  const handleDownloadJSON = () => {
    if (fullData.length > 0 && schema) {
      downloadJSON(fullData, `${schema.id}_${rowCount}_seed${seed}.json`)
    }
  }

  // Get column names from preview data or schema
  const columnNames = useMemo(() => {
    if (previewData.length > 0) {
      return Object.keys(previewData[0])
    }
    return schema?.columns.map(c => c.name) || []
  }, [previewData, schema])

  return (
    <div className="flex-1 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Wizard de Generación</h1>
          <p className="text-muted-foreground">
            Genera datos sintéticos en 4 sencillos pasos
          </p>
        </div>

        {/* Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors',
                      currentStep > step.id
                        ? 'bg-primary border-primary text-primary-foreground'
                        : currentStep === step.id
                        ? 'border-primary text-primary'
                        : 'border-border text-muted-foreground'
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={cn(
                      'text-sm font-medium',
                      currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                      {step.name}
                    </div>
                    <div className="text-xs text-muted-foreground hidden md:block">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 mx-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].name}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  Selecciona el tipo de datos que deseas generar
                </p>
                <Select
                  value={selectedSchema}
                  onChange={(e) => {
                    setSelectedSchema(e.target.value)
                    setPreviewData([])
                    setFullData([])
                  }}
                >
                  <option value="">Seleccionar esquema...</option>
                  {schemas.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} - {categoryLabels[s.category]}
                    </option>
                  ))}
                </Select>

                {schema && (
                  <div className="mt-4 p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={categoryColors[schema.category]}>
                        {categoryLabels[schema.category]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{schema.description}</p>
                    <div className="text-sm">
                      <span className="font-medium">Columnas: </span>
                      {schema.columns.map((c) => c.name).join(', ')}
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && schema && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Número de filas
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={10000}
                    value={rowCount}
                    onChange={(e) => setRowCount(parseInt(e.target.value) || 0)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Máximo 10,000 filas
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Semilla (opcional)
                  </label>
                  <Input
                    type="number"
                    placeholder="Dejar vacío para aleatorio"
                    value={seed || ''}
                    onChange={(e) => setSeed(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Usa la misma semilla para reproducir los mismos datos
                  </p>
                </div>

                {schema.defaultParams && (
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <h4 className="font-medium mb-2">Parámetros del modelo</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Valores por defecto (configuración avanzada próximamente)
                    </p>
                    <pre className="text-xs bg-background p-2 rounded overflow-auto">
                      {JSON.stringify(schema.defaultParams, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && schema && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    Vista previa de las primeras 10 filas
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={regenerateData}
                    disabled={isGenerating}
                  >
                    <RefreshCw className={cn("w-4 h-4 mr-2", isGenerating && "animate-spin")} />
                    Nueva semilla
                  </Button>
                </div>
                
                {seed !== undefined && (
                  <p className="text-xs text-muted-foreground">
                    Semilla actual: <code className="bg-secondary px-1 rounded">{seed}</code>
                  </p>
                )}

                <div className="overflow-auto border rounded-lg max-h-96">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground w-10">#</th>
                        {columnNames.map((col) => (
                          <th key={col} className="px-3 py-2 text-left font-medium whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {isGenerating ? (
                        <tr>
                          <td colSpan={columnNames.length + 1} className="px-3 py-8 text-center text-muted-foreground">
                            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2" />
                            Generando datos...
                          </td>
                        </tr>
                      ) : previewData.length > 0 ? (
                        previewData.map((row, idx) => (
                          <tr key={idx} className="border-t border-border hover:bg-secondary/30">
                            <td className="px-3 py-2 text-muted-foreground">{idx + 1}</td>
                            {columnNames.map((col) => (
                              <td key={col} className="px-3 py-2 whitespace-nowrap">
                                {formatCellValue(row[col])}
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={columnNames.length + 1} className="px-3 py-8 text-center text-muted-foreground">
                            No se pudieron generar datos
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {fullData.length > 0 && (
                  <p className="text-xs text-muted-foreground text-center">
                    Mostrando 10 de {fullData.length} filas generadas
                  </p>
                )}
              </div>
            )}

            {currentStep === 4 && schema && (
              <div className="space-y-6 text-center py-8">
                <div className="inline-flex p-4 rounded-full bg-success/20">
                  <Check className="w-8 h-8 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Generación completa</h3>
                  <p className="text-muted-foreground">
                    {schema.name} - {fullData.length.toLocaleString()} filas
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Semilla: <code className="bg-secondary px-1 rounded">{seed}</code>
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <Button onClick={handleDownloadCSV}>
                    <Download className="w-4 h-4 mr-2" />
                    Descargar CSV
                  </Button>
                  <Button variant="outline" onClick={handleDownloadJSON}>
                    <Download className="w-4 h-4 mr-2" />
                    Descargar JSON
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Usa la semilla <code className="bg-secondary px-1 rounded">{seed}</code> para reproducir estos exactos datos
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Anterior
          </Button>
          <Button
            onClick={nextStep}
            disabled={!canProceed() || currentStep === 4}
          >
            {currentStep === 3 ? 'Finalizar' : 'Siguiente'}
          </Button>
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
    // Format numbers with reasonable precision
    if (Number.isInteger(value)) return value.toLocaleString()
    return value.toLocaleString(undefined, { maximumFractionDigits: 3 })
  }
  return String(value)
}
