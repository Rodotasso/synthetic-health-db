from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "Synthetic Health DB"

    # Database
    DATABASE_URL: str = "sqlite:///./synthetic.db"

    # Redis/Celery
    REDIS_URL: str = "redis://localhost:6379/0"
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"

    # R bridge
    R_ENABLED: bool = True
    R_PATH: str = "/usr/bin/Rscript"

    # Generators
    MAX_ROWS_PER_JOB: int = 10_000_000
    DEFAULT_ROWS: int = 100_000

    class Config:
        env_file = ".env"


settings = Settings()
