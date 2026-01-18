export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <p>Grupo CDSP - Universidad de Chile</p>
            <p>Datos sintéticos para epidemiología y bioestadística</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href="https://github.com/Rodotasso/synthetic-health-db"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <span>|</span>
            <span>MIT License</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
