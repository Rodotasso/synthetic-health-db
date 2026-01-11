#!/usr/bin/env python
"""Test simple de generación"""

from backend.app.generators import CIE10Generator

gen = CIE10Generator(seed=42)
df = gen.generate(10, {"spaces": 0.3})
print(df)
