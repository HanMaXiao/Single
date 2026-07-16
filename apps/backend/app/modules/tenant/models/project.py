from tortoise import fields
from tortoise.models import Model

from app.modules.tenant.enums import ProjectStatus


class Project(Model):
    id = fields.IntField(pk=True, description="项目ID")
    company = fields.ForeignKeyField(
        "models.Company",
        related_name="projects",
        description="所属公司主体",
    )
    merchant = fields.ForeignKeyField(
        "models.Merchant",
        related_name="projects",
        null=True,
        description="收款商户",
    )
    operator = fields.ForeignKeyField(
        "models.Operator",
        related_name="projects",
        null=True,
        description="运营方",
    )
    name = fields.CharField(max_length=128, index=True, description="项目名称")
    scenic_name = fields.CharField(max_length=128, description="景区名称")
    scenic_address = fields.CharField(max_length=255, null=True, description="景区地址")
    contact_name = fields.CharField(max_length=64, null=True, description="项目联系人")
    contact_phone = fields.CharField(max_length=32, null=True, description="项目联系电话")
    status = fields.CharEnumField(
        ProjectStatus,
        max_length=16,
        default=ProjectStatus.PREPARING,
        description="项目状态",
    )
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")
    deleted_at = fields.DatetimeField(null=True, description="软删除时间")

    class Meta:
        table = "projects"
        table_description = "景区运营项目表"
        indexes = (("company_id", "status"),)
