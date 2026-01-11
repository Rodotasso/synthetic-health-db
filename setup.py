from setuptools import setup, find_packages

setup(
    name="synthetic_db",
    version="0.1.0",
    packages=["backend", "backend.app", "backend.tests"],
    install_requires=[
        "click",
        "pydantic",
        "pydantic-settings",
        "pyyaml",
        "pandas",
        "numpy",
    ],
    entry_points={
        "console_scripts": [
            "synthetic_db=cli:cli",
        ],
    },
)
