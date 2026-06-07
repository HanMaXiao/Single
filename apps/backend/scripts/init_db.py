import asyncio

from app.core.bootstrap import bootstrap_backend
from app.core.database import close_database


async def main() -> None:
    await bootstrap_backend()
    await close_database()


if __name__ == "__main__":
    asyncio.run(main())
