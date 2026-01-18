import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import { Input, Badge, Tabs, TabsList, TabsTrigger } from '@/components/ui'
import { schemas, categoryLabels, categoryColors } from '@/data/schemas'
import type { SchemaCategory } from '@/types'

const categories: (SchemaCategory | 'all')[] = ['all', 'medical', 'epidemiology', 'biostatistics', 'regression']

export function Catalog() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<SchemaCategory | 'all'>('all')

  const filteredSchemas = schemas.filter((schema) => {
    const matchesSearch =
      search === '' ||
      schema.name.toLowerCase().includes(search.toLowerCase()) ||
      schema.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || schema.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex-1 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Catálogo de Esquemas</h1>
          <p className="text-muted-foreground">
            Explora los {schemas.length} esquemas disponibles para generar datos sintéticos
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar esquemas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="all" onValueChange={(v) => setCategory(v as SchemaCategory | 'all')}>
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat === 'all' ? 'Todos' : categoryLabels[cat]}
                  <Badge variant="secondary" className="ml-2">
                    {cat === 'all'
                      ? schemas.length
                      : schemas.filter((s) => s.category === cat).length}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Schema Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchemas.map((schema) => (
            <Link
              key={schema.id}
              to={`/wizard?schema=${schema.id}`}
              className="group p-5 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <Badge className={categoryColors[schema.category]}>
                  {categoryLabels[schema.category]}
                </Badge>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="text-lg font-semibold mb-2">{schema.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{schema.description}</p>

              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">{schema.columns.length}</span> columnas
                </div>
                {schema.analysis && (
                  <div className="flex flex-wrap gap-1">
                    {schema.analysis.map((a) => (
                      <Badge key={a} variant="outline" className="text-xs">
                        {a}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filteredSchemas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No se encontraron esquemas</p>
          </div>
        )}
      </div>
    </div>
  )
}
