---
description: Deploy frontend a GitHub Pages
dependencies: [frontend-setup, frontend-pages, frontend-generators, frontend-wizard]
---

# /frontend-deploy

Configurar y ejecutar deploy a GitHub Pages.

## Verificar vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  base: '/synthetic-health-db/'  // IMPORTANTE para GitHub Pages
})
```

## src/index.css (dark mode)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 222 84% 5%;
    --foreground: 210 40% 98%;
    --card: 222 84% 5%;
    --card-foreground: 210 40% 98%;
    --primary: 217 91% 60%;
    --primary-foreground: 222 84% 5%;
    --secondary: 217 33% 17%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217 33% 17%;
    --muted-foreground: 215 20% 65%;
    --accent: 217 33% 17%;
    --accent-foreground: 210 40% 98%;
    --border: 217 33% 17%;
  }

  .light {
    --background: 0 0% 100%;
    --foreground: 222 84% 5%;
    --card: 0 0% 100%;
    --card-foreground: 222 84% 5%;
    --primary: 217 91% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222 84% 5%;
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
    --accent: 210 40% 96%;
    --accent-foreground: 222 84% 5%;
    --border: 214 32% 91%;
  }
}

body {
  @apply bg-background text-foreground;
}
```

## src/components/layout/ThemeToggle.tsx
```typescript
import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark)
  }, [dark])

  return (
    <Button variant="ghost" size="sm" onClick={() => setDark(!dark)}>
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
```

## Agregar ThemeToggle al Header
```typescript
import { ThemeToggle } from './ThemeToggle'

// En el header, después del nav:
<ThemeToggle />
```

## .github/workflows/deploy-frontend.yml
```yaml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths: ['frontend/**']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        run: npm ci
        working-directory: frontend
      
      - name: Build
        run: npm run build
        working-directory: frontend
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: frontend/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Test local antes de deploy

```bash
cd frontend
npm run build
npm run preview
# Verificar http://localhost:4173/synthetic-health-db/
```

## Responsive CSS adicional

Agregar en index.css si es necesario:
```css
@layer utilities {
  .container {
    @apply px-4 sm:px-6 lg:px-8;
  }
}

/* Mobile-first breakpoints ya cubiertos por Tailwind */
```

## Checklist pre-deploy

- [ ] `base` en vite.config.ts = '/synthetic-health-db/'
- [ ] `basename` en BrowserRouter = '/synthetic-health-db'
- [ ] Build local sin errores
- [ ] Preview local funciona
- [ ] Navegación entre páginas OK
- [ ] Generación y descarga funciona
- [ ] Dark/light mode toggle funciona

## Deploy

```bash
git add frontend/
git commit -m "feat: frontend React complete"
git push origin main
```

El workflow se ejecutará automáticamente.

## Verificación final

URL: https://rodotasso.github.io/synthetic-health-db/

Probar:
1. Home → 3 opciones visibles
2. Catálogo → cards con filtros
3. Wizard → 4 pasos → generar → descargar
4. Theme toggle funciona
5. Mobile responsive
