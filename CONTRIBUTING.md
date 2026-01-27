# Contributing to Synthetic Health Database Platform

Thank you for your interest in contributing to this project.

## Development Setup

### Prerequisites
- Python 3.11+
- Node.js 18+ (for frontend)
- R 4.4+ (optional, for R scripts)

### Backend Setup

```bash
cd synthetic-health-db/backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Running Tests

```bash
cd backend
pytest -v
pytest --cov=app --cov-report=term
```

### Code Style

- Python: Follow PEP 8
- Use type hints where possible
- Keep functions small and focused
- Vectorize operations with numpy when possible

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Make your changes
4. Run tests (`pytest -v`)
5. Commit with conventional commits (`feat:`, `fix:`, `docs:`, etc.)
6. Push and create a Pull Request

## Reporting Issues

When reporting issues, please include:
- Python version
- Operating system
- Steps to reproduce
- Expected vs actual behavior

## Adding New Generators

1. Inherit from `BaseGenerator`
2. Implement the `generate(n, **kwargs)` method
3. Use `self.rng` for all random operations
4. Add input validation using `_validate_*` methods
5. Add tests in `tests/test_*.py`

Example:

```python
from .base_generator import BaseGenerator

class MyGenerator(BaseGenerator):
    def __init__(self, seed: int = 42):
        super().__init__(seed)

    def generate(self, n: int, **kwargs) -> pd.DataFrame:
        self._validate_positive_int(n, "n")
        # Use self.rng for random operations
        data = self.rng.normal(0, 1, n)
        return pd.DataFrame({"value": data})
```

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
