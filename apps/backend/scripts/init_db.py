import asyncio

from app.core.database import close_database, init_database


async def main() -> None:
    await init_database()
    await close_database()


if __name__ == "__main__":
    asyncio.run(main())
