from tortoise import Tortoise

from app.configs.settings import settings
from app.core.database_upgrades import apply_database_upgrades
from app.modules.registry import get_model_modules


def get_tortoise_orm_config() -> dict[str, object]:
    return {
        "connections": {"default": settings.database_url},
        "apps": {
            "models": {
                "models": get_model_modules(),
                "default_connection": "default",
            }
        },
    }


async def init_database() -> None:
    await Tortoise.init(config=get_tortoise_orm_config())
    if settings.db_generate_schemas:
        await Tortoise.generate_schemas(safe=True)
    await apply_database_upgrades()


async def close_database() -> None:
    await Tortoise.close_connections()
