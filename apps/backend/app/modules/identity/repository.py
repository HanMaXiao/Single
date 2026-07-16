from app.modules.identity.models import AdminUser, UserProjectScope


async def list_admin_users() -> list[AdminUser]:
    return await AdminUser.all().order_by("-created_at")


async def list_user_scopes(admin_user_id: int) -> list[UserProjectScope]:
    return await UserProjectScope.filter(admin_user_id=admin_user_id).all()
