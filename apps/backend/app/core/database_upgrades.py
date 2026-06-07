import logging

from tortoise import Tortoise
from tortoise.backends.base.client import BaseDBAsyncClient


logger = logging.getLogger(__name__)

USERS_TABLE_EXISTS_SQL = """
SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = current_schema()
      AND table_name = 'users'
) AS table_exists;
"""

PRE_2026_06_07_USERS_ROLE_UPGRADE_SQL = """
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" VARCHAR(32);
UPDATE "users" SET "role" = 'user' WHERE "role" IS NULL;
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user';
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;
"""


async def apply_database_upgrades() -> None:
    connection = Tortoise.get_connection("default")
    await upgrade_pre_2026_06_07_users_role(connection)


async def upgrade_pre_2026_06_07_users_role(
    connection: BaseDBAsyncClient,
) -> None:
    if not await users_table_exists(connection):
        logger.info("Skipping users.role upgrade because the users table does not exist")
        return

    await connection.execute_script(PRE_2026_06_07_USERS_ROLE_UPGRADE_SQL)
    logger.info("Ensured users.role column exists and is backfilled")


async def users_table_exists(connection: BaseDBAsyncClient) -> bool:
    rows = await connection.execute_query_dict(USERS_TABLE_EXISTS_SQL)
    if len(rows) == 0:
        return False

    return bool(rows[0]["table_exists"])
