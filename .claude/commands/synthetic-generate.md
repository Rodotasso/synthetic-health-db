---
description: Generar base sintética desde schema
usage: /synthetic-gen <schema> <rows> <output>
---

Genera base sintética usando config en `schemas/<schema>.yaml`.

Parámetros:
- schema: Nombre del schema YAML
- rows: Número de filas (default: 100000)
- output: Archivo de salida (default: data/output/<schema>.csv)

Ejecuta backend API o R scripts según configuración.

Sin confirmación. No verbose. Solo retorna: "✓ Generado: output_path"
