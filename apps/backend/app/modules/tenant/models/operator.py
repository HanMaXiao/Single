from tortoise import fields
from tortoise.models import Model

from app.modules.tenant.enums import TenantStatus


class Operator(Model):
    id = fields.IntField(pk=True, description="运营方ID")
    company = fields.ForeignKeyField(
        "models.Company",
        related_name="operators",
        null=True,
        description="所属公司主体",
    )
    name = fields.CharField(max_length=128, description="运营方名称")
    contact_name = fields.CharField(max_length=64, null=True, description="联系人姓名")
    contact_phone = fields.CharField(max_length=32, null=True, description="联系人电话")
    status = fields.CharEnumField(
        TenantStatus,
        max_length=16,
        default=TenantStatus.ACTIVE,
        description="运营方状态",
    )
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")
    deleted_at = fields.DatetimeField(null=True, description="软删除时间")

    class Meta:
        table = "operators"
        table_description = "运营方表"
