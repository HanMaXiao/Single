from tortoise import fields
from tortoise.models import Model


class Role(Model):
    id = fields.IntField(pk=True, description="角色ID")
    code = fields.CharField(max_length=64, unique=True, index=True, description="角色编码")
    name = fields.CharField(max_length=64, description="角色名称")
    description = fields.TextField(null=True, description="角色说明")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")

    class Meta:
        table = "roles"
        table_description = "角色表"


class Permission(Model):
    id = fields.IntField(pk=True, description="权限ID")
    code = fields.CharField(max_length=128, unique=True, index=True, description="权限编码")
    name = fields.CharField(max_length=64, description="权限名称")
    module = fields.CharField(max_length=64, index=True, description="所属业务模块")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")

    class Meta:
        table = "permissions"
        table_description = "权限点表"


class UserRole(Model):
    id = fields.IntField(pk=True, description="用户角色关系ID")
    admin_user = fields.ForeignKeyField(
        "models.AdminUser",
        related_name="user_roles",
        description="关联管理员",
    )
    role = fields.ForeignKeyField("models.Role", related_name="user_roles", description="关联角色")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")

    class Meta:
        table = "user_roles"
        table_description = "管理员与角色关系表"
        unique_together = (("admin_user_id", "role_id"),)


class RolePermission(Model):
    id = fields.IntField(pk=True, description="角色权限关系ID")
    role = fields.ForeignKeyField(
        "models.Role",
        related_name="role_permissions",
        description="关联角色",
    )
    permission = fields.ForeignKeyField(
        "models.Permission",
        related_name="role_permissions",
        description="关联权限",
    )
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")

    class Meta:
        table = "role_permissions"
        table_description = "角色与权限关系表"
        unique_together = (("role_id", "permission_id"),)
