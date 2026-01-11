---
description: Generar curvas epidémicas (SIR, SEIR)
usage: /epidemic-gen <model> <days> <population>
---

Genera datos de curvas epidémicas.

Modelos:
- sir: SIR (Susceptible-Infected-Recovered)
- seir: SEIR (+ Exposed)
- seird: SEIRD (+ Deaths)

Parámetros:
- model: Modelo epidémico
- days: Días a simular (default: 365)
- population: Población inicial (default: 100000)

Retorna: "✓ Generado: {rows} filas"

Sin confirmación.
