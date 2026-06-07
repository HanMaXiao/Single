from app.configs.settings import settings
from app.core.admin_seed import seed_admin_user_from_environment
from app.core.database import init_database


async def bootstrap_backend() -> None:
    _ = settings.required_jwt_secret_key
    await init_database()
    await seed_admin_user_from_environment()
