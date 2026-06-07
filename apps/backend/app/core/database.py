from tortoise import Tortoise

from app.configs.settings import settings


def get_tortoise_orm_config() -> dict[str, object]:
    return {
        "connections": {"default": settings.database_url},
        "apps": {
            "models": {
                "models": ["app.models.user"],
                "default_connection": "default",
            }
        },
    }


async def init_database() -> None:
    await Tortoise.init(config=get_tortoise_orm_config())
    if settings.db_generate_schemas:
        await Tortoise.generate_schemas(safe=True)


async def close_database() -> None:
    await Tortoise.close_connections()
