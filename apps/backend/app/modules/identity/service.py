from app.modules.identity.models import User
from app.modules.identity import repository
from app.modules.identity.schemas import (
    AdminUserOut,
    CurrentIdentityOut,
    DataScopeOut,
    ModuleInfoOut,
)


def get_module_info() -> ModuleInfoOut:
    return ModuleInfoOut(
        name="identity",
        description="账号、角色、权限与项目数据范围模块",
        tables=[
            "users",
            "admin_users",
            "roles",
            "permissions",
            "user_roles",
            "role_permissions",
            "user_project_scopes",
        ],
    )


async def list_admin_users() -> list[AdminUserOut]:
    users = await repository.list_admin_users()
    return [AdminUserOut.model_validate(user) for user in users]


async def build_current_identity(user: User) -> CurrentIdentityOut:
    return CurrentIdentityOut(
        id=user.id,
        username=user.username,
        role=user.role,
        scopes=[],
    )


async def list_data_scopes(admin_user_id: int) -> list[DataScopeOut]:
    scopes = await repository.list_user_scopes(admin_user_id)
    return [DataScopeOut.model_validate(scope) for scope in scopes]
