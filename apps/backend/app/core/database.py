from tortoise import Tortoise

from app.configs.settings import settings


TORTOISE_ORM = {
    "connections": {"default": settings.database_url},
    "apps": {
        "models": {
            "models": ["app.models.user"],
            "default_connection": "default",
        }
    },
}


async def init_database() -> None:
    await Tortoise.init(config=TORTOISE_ORM)
    if settings.db_generate_schemas:
        await Tortoise.generate_schemas(safe=True)


async def close_database() -> None:
    await Tortoise.close_connections()
