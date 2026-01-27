# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-01-26

### Added
- BaseGenerator abstract class with thread-safe RNG (`np.random.default_rng`)
- Input validation methods in BaseGenerator
- Vectorized implementations for surveillance and patient_id generators
- Zenodo integration files (LICENSE, CITATION.cff, .zenodo.json)
- pytest configuration and expanded test suite

### Changed
- All 11 generator classes now inherit from BaseGenerator
- Replaced `np.random.seed()` with local RNG instances
- Replaced `np.random.randint()` with `rng.integers()`
- Replaced `np.random.choice()` with `rng.choice()`
- Optimized `_add_encounters()` in patient_id.py (removed iterrows)
- Optimized `generate_alert_system()` in surveillance.py (vectorized triple loop)

### Fixed
- api.py: `schema_name` -> `request.schema_name` (lines 55, 76)
- requirements.txt: Added scipy, removed 8 unused dependencies

### Removed
- Empty `regression_generator/` directory

## [0.1.0] - 2025-01-11

### Added
- Initial release
- Patient ID system with SHDB format
- CIE-10 generator with error injection
- Demographics generator for Chile
- Epidemic models (SIR, SEIR)
- Survival analysis generator (Kaplan-Meier)
- Regression generators (linear, logistic, Poisson, Cox)
- Surveillance system generators
- Outbreak generators (point-source, continuous, propagated)
- Time series generators with seasonality
- FastAPI backend
- React frontend with Vite
