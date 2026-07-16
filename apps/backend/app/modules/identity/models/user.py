from tortoise import fields
from tortoise.models import Model


class User(Model):
    id = fields.IntField(pk=True, description="用户ID")
    username = fields.CharField(max_length=64, unique=True, index=True, description="登录用户名")
    hashed_password = fields.CharField(max_length=255, description="加密后的登录密码")
    is_active = fields.BooleanField(default=True, description="是否启用")
    role = fields.CharField(max_length=32, default="user", description="用户角色标识")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")

    class Meta:
        table = "users"
        table_description = "前台用户表"

    def __str__(self) -> str:
        return self.username
