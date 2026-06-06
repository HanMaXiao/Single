from functools import lru_cache
from urllib.parse import quote_plus

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
    postgres_user: str | None = Field(default=None, min_length=1)
    postgres_password: str | None = Field(default=None, min_length=1)
    postgres_db: str | None = Field(default=None, min_length=1)
    db_generate_schemas: bool = True

    redis_host: str = "redis"
    redis_port: int = 6379
    redis_db: int = 0

    jwt_secret_key: str | None = Field(default=None, min_length=32)
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
        postgres_user = self.postgres_user
        postgres_password = self.postgres_password
        postgres_db = self.postgres_db
        if postgres_user is None or postgres_password is None or postgres_db is None:
            missing_settings = [
                name
                for name, value in {
                    "POSTGRES_USER": postgres_user,
                    "POSTGRES_PASSWORD": postgres_password,
                    "POSTGRES_DB": postgres_db,
                }.items()
                if value is None
            ]
            raise ValueError(
                "Missing required database environment variables: "
                + ", ".join(missing_settings)
            )

        username = quote_plus(postgres_user)
        password = quote_plus(postgres_password)
        database = quote_plus(postgres_db)
        return (
            f"postgres://{username}:{password}"
            f"@{self.postgres_host}:{self.postgres_port}/{database}"
        )

    @property
    def redis_url(self) -> str:
        return f"redis://{self.redis_host}:{self.redis_port}/{self.redis_db}"

    @property
    def required_jwt_secret_key(self) -> str:
        if self.jwt_secret_key is None:
            raise ValueError("Missing required environment variable: JWT_SECRET_KEY")

        return self.jwt_secret_key


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
