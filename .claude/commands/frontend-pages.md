---
description: Crear páginas core y componentes UI base
dependencies: [frontend-setup]
---

# /frontend-pages

Crear páginas Home, Catalog, Wizard, Builder con layout compartido.

## Componentes UI (src/components/ui/)

### button.tsx
```typescript
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            'border border-border bg-transparent hover:bg-accent': variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-8 px-3 text-sm': size === 'sm',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)
```

### card.tsx
```typescript
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-lg border border-border bg-card p-6', className)} {...props} />
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)} {...props} />
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-lg font-semibold', className)} {...props} />
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />
}
```

### input.tsx, select.tsx, slider.tsx, tabs.tsx
Crear con mismo patrón: forwardRef, cn(), variantes de estilo.

## Layout (src/components/layout/)

### Header.tsx
```typescript
import { Link } from 'react-router-dom'
import { Database } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <Database className="h-6 w-6 text-primary" />
          Synthetic Health DB
        </Link>
        <nav className="flex gap-6">
          <Link to="/catalog" className="text-muted-foreground hover:text-foreground">Catálogo</Link>
          <Link to="/wizard" className="text-muted-foreground hover:text-foreground">Wizard</Link>
          <Link to="/builder" className="text-muted-foreground hover:text-foreground">Builder</Link>
        </nav>
      </div>
    </header>
  )
}
```

### Footer.tsx
```typescript
export function Footer() {
  return (
    <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
      Grupo CDSP | <a href="https://github.com/Rodotasso/synthetic-health-db" className="hover:text-primary">GitHub</a>
    </footer>
  )
}
```

## Páginas (src/pages/)

### Home.tsx
```typescript
import { Link } from 'react-router-dom'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Wand2, Blocks } from 'lucide-react'

export function Home() {
  const options = [
    { icon: BookOpen, title: 'Catálogo', desc: 'Explorar schemas disponibles', to: '/catalog' },
    { icon: Wand2, title: 'Wizard', desc: 'Generar datos paso a paso', to: '/wizard' },
    { icon: Blocks, title: 'Builder', desc: 'Crear schema personalizado', to: '/builder' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Synthetic Health DB</h1>
        <p className="text-xl text-muted-foreground">Generador de bases sintéticas para epidemiología y bioestadística</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {options.map(({ icon: Icon, title, desc, to }) => (
          <Card key={to} className="hover:border-primary transition-colors">
            <Icon className="mb-4 h-10 w-10 text-primary" />
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mb-4">{desc}</CardDescription>
            <Link to={to}><Button>Ir</Button></Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

### Catalog.tsx
```typescript
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const SCHEMAS = [
  { name: 'demographics', category: 'Medical', desc: 'Datos demográficos poblacionales', analysis: ['Descriptivos'] },
  { name: 'cie10', category: 'Medical', desc: 'Códigos CIE-10 con errores', analysis: ['Testing fuzzy'] },
  { name: 'survival', category: 'Biostatistics', desc: 'Estudio supervivencia', analysis: ['Kaplan-Meier'] },
  { name: 'sir', category: 'Epidemiology', desc: 'Modelo epidémico SIR', analysis: ['Curva R0'] },
  { name: 'logistic', category: 'Regression', desc: 'Regresión logística', analysis: ['OR', 'AUC'] },
]

export function Catalog() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Catálogo de Schemas</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SCHEMAS.map((s) => (
          <Card key={s.name}>
            <span className="mb-2 inline-block rounded bg-primary/20 px-2 py-1 text-xs">{s.category}</span>
            <CardTitle>{s.name}</CardTitle>
            <CardDescription>{s.desc}</CardDescription>
            <div className="mt-2 flex flex-wrap gap-1">
              {s.analysis.map((a) => <span key={a} className="rounded bg-secondary px-2 py-0.5 text-xs">{a}</span>)}
            </div>
            <Link to={`/wizard?schema=${s.name}`} className="mt-4 block">
              <Button size="sm">Usar</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

### Wizard.tsx y Builder.tsx
Placeholder inicial, se completan en Etapas 4 y 5.

## App.tsx actualizado
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Home } from '@/pages/Home'
import { Catalog } from '@/pages/Catalog'
import { Wizard } from '@/pages/Wizard'
import { Builder } from '@/pages/Builder'

function App() {
  return (
    <BrowserRouter basename="/synthetic-health-db">
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/wizard" element={<Wizard />} />
            <Route path="/builder" element={<Builder />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
```

## Verificación

Navegación funcional entre 4 páginas con layout compartido.
