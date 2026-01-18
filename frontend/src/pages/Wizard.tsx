import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, ChevronRight, Download, Eye, Settings, Target } from 'lucide-react'
import { Button, Input, Select, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui'
import { schemas, categoryLabels, categoryColors } from '@/data/schemas'
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

  const schema = useMemo(
    () => schemas.find((s) => s.id === selectedSchema),
    [selectedSchema]
  )

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!selectedSchema
      case 2:
        return rowCount > 0 && rowCount <= 10000
      case 3:
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    if (canProceed() && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

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
                  onChange={(e) => setSelectedSchema(e.target.value)}
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
                      Configuración avanzada disponible en próximas versiones
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
                <p className="text-muted-foreground">
                  Vista previa de las primeras 10 filas (generación disponible en Etapa 3)
                </p>
                <div className="overflow-auto border rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary">
                      <tr>
                        {schema.columns.map((col) => (
                          <th key={col.name} className="px-3 py-2 text-left font-medium">
                            {col.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={schema.columns.length} className="px-3 py-8 text-center text-muted-foreground">
                          Generadores se implementarán en Etapa 3
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {currentStep === 4 && schema && (
              <div className="space-y-6 text-center py-8">
                <div className="inline-flex p-4 rounded-full bg-success/20">
                  <Check className="w-8 h-8 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Configuración completa</h3>
                  <p className="text-muted-foreground">
                    {schema.name} - {rowCount} filas
                    {seed && ` - Semilla: ${seed}`}
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <Button disabled>
                    <Download className="w-4 h-4 mr-2" />
                    Descargar CSV
                  </Button>
                  <Button variant="outline" disabled>
                    <Download className="w-4 h-4 mr-2" />
                    Descargar JSON
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Descarga disponible tras implementar generadores (Etapa 3)
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
