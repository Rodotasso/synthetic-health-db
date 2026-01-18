import { useState } from 'react'
import { Plus, Link2, Trash2, ArrowRight } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, Select, Badge } from '@/components/ui'
import { schemas, categoryLabels, categoryColors } from '@/data/schemas'

interface SchemaNode {
  id: string
  schemaId: string
  joinType?: '1:1' | '1:N'
  joinKey?: string
}

const presets = [
  {
    id: 'cohorte-clinica',
    name: 'Cohorte Clínica',
    description: 'demographics + encounters + survival (1:N)',
    schemas: ['demographics', 'encounters', 'survival_cohort'],
  },
  {
    id: 'estudio-epidemico',
    name: 'Estudio Epidémico',
    description: 'surveillance + sir + outbreak (1:1)',
    schemas: ['surveillance', 'sir', 'outbreak'],
  },
  {
    id: 'regresion-clinica',
    name: 'Regresión Clínica',
    description: 'demographics + logistic + cie10 (1:1)',
    schemas: ['demographics', 'logistic', 'cie10'],
  },
]

export function Builder() {
  const [nodes, setNodes] = useState<SchemaNode[]>([])
  const [selectedPreset, setSelectedPreset] = useState('')

  const addNode = () => {
    const newNode: SchemaNode = {
      id: `node-${Date.now()}`,
      schemaId: '',
      joinType: nodes.length > 0 ? '1:1' : undefined,
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

    const newNodes: SchemaNode[] = preset.schemas.map((schemaId, index) => ({
      id: `node-${Date.now()}-${index}`,
      schemaId,
      joinType: index > 0 ? '1:1' : undefined,
      joinKey: index > 0 ? 'patient_id' : undefined,
    }))
    setNodes(newNodes)
    setSelectedPreset(presetId)
  }

  return (
    <div className="flex-1 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Schema Builder</h1>
          <p className="text-muted-foreground">
            Combina múltiples esquemas para crear bases de datos complejas
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Presets */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Presets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      selectedPreset === preset.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium mb-1">{preset.name}</div>
                    <div className="text-xs text-muted-foreground">{preset.description}</div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Builder Canvas */}
          <div className="lg:col-span-2">
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
                        <div key={node.id} className="flex items-center gap-4">
                          {index > 0 && (
                            <div className="flex items-center gap-2">
                              <Select
                                value={node.joinType || '1:1'}
                                onChange={(e) =>
                                  updateNode(node.id, { joinType: e.target.value as '1:1' | '1:N' })
                                }
                                className="w-20"
                              >
                                <option value="1:1">1:1</option>
                                <option value="1:N">1:N</option>
                              </Select>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}

                          <div className="flex-1 p-4 rounded-lg border border-border bg-card">
                            <div className="flex items-center gap-3">
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
                              <div className="mt-3 flex items-center gap-2">
                                <Badge className={categoryColors[schema.category]}>
                                  {categoryLabels[schema.category]}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {schema.columns.length} columnas
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {nodes.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button className="w-full" disabled>
                      Generar Combinación
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Combinación de esquemas disponible en Etapa 5
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
