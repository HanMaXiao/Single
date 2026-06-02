from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "FastAPI Next Monorepo"
    app_env: str = "local"
    debug: bool = True

    api_v1_prefix: str = "/api/v1"
    cors_origins: list[str] = ["*"]

    postgres_host: str = "postgres"
    postgres_port: int = 5432
    postgres_user: str = "app_user"
    postgres_password: str = "app_password"
    postgres_db: str = "app_db"
    db_generate_schemas: bool = True

    redis_host: str = "redis"
    redis_port: int = 6379
    redis_db: int = 0

    jwt_secret_key: str = Field(default="change-me-in-production")
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def database_url(self) -> str:
        return (
            f"postgres://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )

    @property
    def redis_url(self) -> str:
        return f"redis://{self.redis_host}:{self.redis_port}/{self.redis_db}"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
