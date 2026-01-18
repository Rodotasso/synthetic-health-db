import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header, Footer } from '@/components/layout'
import { Home, Catalog, Wizard, Builder, Docs } from '@/pages'

function App() {
  return (
    <BrowserRouter basename="/synthetic-health-db">
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/wizard" element={<Wizard />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
