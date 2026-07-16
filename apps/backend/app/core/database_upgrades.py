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
    await apply_table_comments(connection)


async def upgrade_pre_2026_06_07_users_role(
    connection: BaseDBAsyncClient,
) -> None:
    if not await users_table_exists(connection):
        logger.info("Skipping users.role upgrade because the users table does not exist")
        return

    await connection.execute_script(PRE_2026_06_07_USERS_ROLE_UPGRADE_SQL)
    logger.info("Ensured users.role column exists and is backfilled")


async def users_table_exists(connection: BaseDBAsyncClient) -> bool:
    return await table_exists(connection, "users")


async def table_exists(connection: BaseDBAsyncClient, table_name: str) -> bool:
    rows = await connection.execute_query_dict(
        USERS_TABLE_EXISTS_SQL.replace("table_name = 'users'", f"table_name = '{table_name}'")
    )
    if len(rows) == 0:
        return False

    return bool(rows[0]["table_exists"])


TABLE_COMMENT_SQL: dict[str, str] = {
    "users": """
COMMENT ON TABLE "users" IS '前台用户表';
COMMENT ON COLUMN "users"."id" IS '用户ID';
COMMENT ON COLUMN "users"."username" IS '登录用户名';
COMMENT ON COLUMN "users"."hashed_password" IS '加密后的登录密码';
COMMENT ON COLUMN "users"."is_active" IS '是否启用';
COMMENT ON COLUMN "users"."role" IS '用户角色标识';
COMMENT ON COLUMN "users"."created_at" IS '创建时间';
COMMENT ON COLUMN "users"."updated_at" IS '更新时间';
""",
    "admin_users": """
COMMENT ON TABLE "admin_users" IS '后台管理员账号表';
COMMENT ON COLUMN "admin_users"."id" IS '管理员ID';
COMMENT ON COLUMN "admin_users"."username" IS '管理员登录名';
COMMENT ON COLUMN "admin_users"."hashed_password" IS '加密后的登录密码';
COMMENT ON COLUMN "admin_users"."display_name" IS '管理员显示名称';
COMMENT ON COLUMN "admin_users"."status" IS '管理员状态';
COMMENT ON COLUMN "admin_users"."created_at" IS '创建时间';
COMMENT ON COLUMN "admin_users"."updated_at" IS '更新时间';
""",
    "roles": """
COMMENT ON TABLE "roles" IS '角色表';
COMMENT ON COLUMN "roles"."id" IS '角色ID';
COMMENT ON COLUMN "roles"."code" IS '角色编码';
COMMENT ON COLUMN "roles"."name" IS '角色名称';
COMMENT ON COLUMN "roles"."description" IS '角色说明';
COMMENT ON COLUMN "roles"."created_at" IS '创建时间';
COMMENT ON COLUMN "roles"."updated_at" IS '更新时间';
""",
    "permissions": """
COMMENT ON TABLE "permissions" IS '权限点表';
COMMENT ON COLUMN "permissions"."id" IS '权限ID';
COMMENT ON COLUMN "permissions"."code" IS '权限编码';
COMMENT ON COLUMN "permissions"."name" IS '权限名称';
COMMENT ON COLUMN "permissions"."module" IS '所属业务模块';
COMMENT ON COLUMN "permissions"."created_at" IS '创建时间';
COMMENT ON COLUMN "permissions"."updated_at" IS '更新时间';
""",
    "user_roles": """
COMMENT ON TABLE "user_roles" IS '管理员与角色关系表';
COMMENT ON COLUMN "user_roles"."id" IS '用户角色关系ID';
COMMENT ON COLUMN "user_roles"."admin_user_id" IS '关联管理员ID';
COMMENT ON COLUMN "user_roles"."role_id" IS '关联角色ID';
COMMENT ON COLUMN "user_roles"."created_at" IS '创建时间';
""",
    "role_permissions": """
COMMENT ON TABLE "role_permissions" IS '角色与权限关系表';
COMMENT ON COLUMN "role_permissions"."id" IS '角色权限关系ID';
COMMENT ON COLUMN "role_permissions"."role_id" IS '关联角色ID';
COMMENT ON COLUMN "role_permissions"."permission_id" IS '关联权限ID';
COMMENT ON COLUMN "role_permissions"."created_at" IS '创建时间';
""",
    "user_project_scopes": """
COMMENT ON TABLE "user_project_scopes" IS '管理员项目数据范围表';
COMMENT ON COLUMN "user_project_scopes"."id" IS '数据范围ID';
COMMENT ON COLUMN "user_project_scopes"."admin_user_id" IS '关联管理员ID';
COMMENT ON COLUMN "user_project_scopes"."scope_type" IS '数据范围类型';
COMMENT ON COLUMN "user_project_scopes"."company_id" IS '授权公司主体ID';
COMMENT ON COLUMN "user_project_scopes"."operator_id" IS '授权运营方ID';
COMMENT ON COLUMN "user_project_scopes"."project_id" IS '授权项目ID';
COMMENT ON COLUMN "user_project_scopes"."created_at" IS '创建时间';
""",
    "companies": """
COMMENT ON TABLE "companies" IS '公司主体表';
COMMENT ON COLUMN "companies"."id" IS '公司主体ID';
COMMENT ON COLUMN "companies"."name" IS '公司主体名称';
COMMENT ON COLUMN "companies"."status" IS '公司主体状态';
COMMENT ON COLUMN "companies"."created_at" IS '创建时间';
COMMENT ON COLUMN "companies"."updated_at" IS '更新时间';
COMMENT ON COLUMN "companies"."deleted_at" IS '软删除时间';
""",
    "merchants": """
COMMENT ON TABLE "merchants" IS '支付商户表';
COMMENT ON COLUMN "merchants"."id" IS '商户ID';
COMMENT ON COLUMN "merchants"."company_id" IS '所属公司主体ID';
COMMENT ON COLUMN "merchants"."name" IS '商户名称';
COMMENT ON COLUMN "merchants"."merchant_no" IS '商户号';
COMMENT ON COLUMN "merchants"."status" IS '商户状态';
COMMENT ON COLUMN "merchants"."created_at" IS '创建时间';
COMMENT ON COLUMN "merchants"."updated_at" IS '更新时间';
COMMENT ON COLUMN "merchants"."deleted_at" IS '软删除时间';
""",
    "operators": """
COMMENT ON TABLE "operators" IS '运营方表';
COMMENT ON COLUMN "operators"."id" IS '运营方ID';
COMMENT ON COLUMN "operators"."company_id" IS '所属公司主体ID';
COMMENT ON COLUMN "operators"."name" IS '运营方名称';
COMMENT ON COLUMN "operators"."contact_name" IS '联系人姓名';
COMMENT ON COLUMN "operators"."contact_phone" IS '联系人电话';
COMMENT ON COLUMN "operators"."status" IS '运营方状态';
COMMENT ON COLUMN "operators"."created_at" IS '创建时间';
COMMENT ON COLUMN "operators"."updated_at" IS '更新时间';
COMMENT ON COLUMN "operators"."deleted_at" IS '软删除时间';
""",
    "projects": """
COMMENT ON TABLE "projects" IS '景区运营项目表';
COMMENT ON COLUMN "projects"."id" IS '项目ID';
COMMENT ON COLUMN "projects"."company_id" IS '所属公司主体ID';
COMMENT ON COLUMN "projects"."merchant_id" IS '收款商户ID';
COMMENT ON COLUMN "projects"."operator_id" IS '运营方ID';
COMMENT ON COLUMN "projects"."name" IS '项目名称';
COMMENT ON COLUMN "projects"."scenic_name" IS '景区名称';
COMMENT ON COLUMN "projects"."scenic_address" IS '景区地址';
COMMENT ON COLUMN "projects"."contact_name" IS '项目联系人';
COMMENT ON COLUMN "projects"."contact_phone" IS '项目联系电话';
COMMENT ON COLUMN "projects"."status" IS '项目状态';
COMMENT ON COLUMN "projects"."created_at" IS '创建时间';
COMMENT ON COLUMN "projects"."updated_at" IS '更新时间';
COMMENT ON COLUMN "projects"."deleted_at" IS '软删除时间';
""",
    "scenic_area_infos": """
COMMENT ON TABLE "scenic_area_infos" IS '景区资料表';
COMMENT ON COLUMN "scenic_area_infos"."id" IS '景区资料ID';
COMMENT ON COLUMN "scenic_area_infos"."project_id" IS '关联项目ID';
COMMENT ON COLUMN "scenic_area_infos"."introduction" IS '景区介绍';
COMMENT ON COLUMN "scenic_area_infos"."guide_notes" IS '导览说明';
COMMENT ON COLUMN "scenic_area_infos"."rental_notes" IS '租赁说明';
COMMENT ON COLUMN "scenic_area_infos"."return_notes" IS '归还说明';
COMMENT ON COLUMN "scenic_area_infos"."created_at" IS '创建时间';
COMMENT ON COLUMN "scenic_area_infos"."updated_at" IS '更新时间';
""",
    "mini_program_configs": """
COMMENT ON TABLE "mini_program_configs" IS '小程序项目配置表';
COMMENT ON COLUMN "mini_program_configs"."id" IS '小程序配置ID';
COMMENT ON COLUMN "mini_program_configs"."project_id" IS '关联项目ID';
COMMENT ON COLUMN "mini_program_configs"."app_id" IS '微信小程序 AppID';
COMMENT ON COLUMN "mini_program_configs"."home_page_config" IS '首页展示配置';
COMMENT ON COLUMN "mini_program_configs"."order_entry_config" IS '订单入口配置';
COMMENT ON COLUMN "mini_program_configs"."customer_service_phone" IS '客服电话';
COMMENT ON COLUMN "mini_program_configs"."enabled" IS '是否启用';
COMMENT ON COLUMN "mini_program_configs"."created_at" IS '创建时间';
COMMENT ON COLUMN "mini_program_configs"."updated_at" IS '更新时间';
""",
}


async def apply_table_comments(connection: BaseDBAsyncClient) -> None:
    for table_name, comment_sql in TABLE_COMMENT_SQL.items():
        if not await table_exists(connection, table_name):
            logger.info("Skipping comments for missing table %s", table_name)
            continue

        await connection.execute_script(comment_sql)
        logger.info("Ensured comments for table %s", table_name)
