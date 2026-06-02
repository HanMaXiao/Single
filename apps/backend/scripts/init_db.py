import asyncio

from app.core.database import close_database, init_database
from app.core.security import hash_password
from app.models.user import User


async def main() -> None:
    await init_database()

    admin = await User.filter(username="admin").first()
    if admin is None:
        await User.create(username="admin", hashed_password=hash_password("admin123"))

    await close_database()


if __name__ == "__main__":
    asyncio.run(main())
