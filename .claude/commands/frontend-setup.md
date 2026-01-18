---
description: Setup proyecto React+Vite+Tailwind para frontend
---

# /frontend-setup

Crear proyecto frontend desde cero.

## Comandos

```bash
cd synthetic-health-db
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install react-router-dom zustand react-hook-form zod @hookform/resolvers recharts class-variance-authority clsx tailwind-merge lucide-react
npm install -D tailwindcss postcss autoprefixer @types/react @types/react-dom
npx tailwindcss init -p
```

## Archivos a Crear

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  base: '/synthetic-health-db/'
})
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
      }
    }
  },
  plugins: []
}
```

### src/index.css
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
}

body {
  @apply bg-background text-foreground;
}
```

### src/lib/utils.ts
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### src/App.tsx
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter basename="/synthetic-health-db">
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<div>Home - Etapa 2</div>} />
          <Route path="/catalog" element={<div>Catalog - Etapa 2</div>} />
          <Route path="/wizard" element={<div>Wizard - Etapa 4</div>} />
          <Route path="/builder" element={<div>Builder - Etapa 5</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
```

### src/main.tsx
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### Estructura carpetas
```bash
mkdir -p src/{components/{ui,layout,catalog,wizard,builder,common},pages,generators,hooks,services,types,data,lib}
```

## Verificación

```bash
npm run dev
# Abrir http://localhost:5173/synthetic-health-db/
```

## Output Esperado

Proyecto funcional con:
- Routing básico (4 rutas placeholder)
- Tailwind CSS configurado con tema oscuro
- Alias @ para imports
- Base path para GitHub Pages
