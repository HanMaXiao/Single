from tortoise import fields
from tortoise.models import Model

from app.modules.identity.enums import AdminUserStatus


class AdminUser(Model):
    id = fields.IntField(pk=True, description="管理员ID")
    username = fields.CharField(max_length=64, unique=True, index=True, description="管理员登录名")
    hashed_password = fields.CharField(max_length=255, description="加密后的登录密码")
    display_name = fields.CharField(max_length=64, null=True, description="管理员显示名称")
    status = fields.CharEnumField(
        AdminUserStatus,
        max_length=16,
        default=AdminUserStatus.ACTIVE,
        description="管理员状态",
    )
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")

    class Meta:
        table = "admin_users"
        table_description = "后台管理员账号表"
