from tortoise import fields
from tortoise.models import Model

from app.modules.tenant.enums import TenantStatus


class Merchant(Model):
    id = fields.IntField(pk=True, description="商户ID")
    company = fields.ForeignKeyField(
        "models.Company",
        related_name="merchants",
        description="所属公司主体",
    )
    name = fields.CharField(max_length=128, description="商户名称")
    merchant_no = fields.CharField(max_length=64, unique=True, index=True, description="商户号")
    status = fields.CharEnumField(
        TenantStatus,
        max_length=16,
        default=TenantStatus.ACTIVE,
        description="商户状态",
    )
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")
    deleted_at = fields.DatetimeField(null=True, description="软删除时间")

    class Meta:
        table = "merchants"
        table_description = "支付商户表"
