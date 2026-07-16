from tortoise import fields
from tortoise.models import Model

from app.modules.identity.enums import DataScopeType


class UserProjectScope(Model):
    id = fields.IntField(pk=True, description="数据范围ID")
    admin_user = fields.ForeignKeyField(
        "models.AdminUser",
        related_name="project_scopes",
        description="关联管理员",
    )
    scope_type = fields.CharEnumField(DataScopeType, max_length=16, description="数据范围类型")
    company_id = fields.IntField(null=True, index=True, description="授权公司主体ID")
    operator_id = fields.IntField(null=True, index=True, description="授权运营方ID")
    project_id = fields.IntField(null=True, index=True, description="授权项目ID")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")

    class Meta:
        table = "user_project_scopes"
        table_description = "管理员项目数据范围表"
