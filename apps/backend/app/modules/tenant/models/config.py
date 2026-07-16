from tortoise import fields
from tortoise.models import Model


class ScenicAreaInfo(Model):
    id = fields.IntField(pk=True, description="景区资料ID")
    project = fields.OneToOneField(
        "models.Project",
        related_name="scenic_info",
        description="关联项目",
    )
    introduction = fields.TextField(null=True, description="景区介绍")
    guide_notes = fields.TextField(null=True, description="导览说明")
    rental_notes = fields.TextField(null=True, description="租赁说明")
    return_notes = fields.TextField(null=True, description="归还说明")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")

    class Meta:
        table = "scenic_area_infos"
        table_description = "景区资料表"


class MiniProgramConfig(Model):
    id = fields.IntField(pk=True, description="小程序配置ID")
    project = fields.OneToOneField(
        "models.Project",
        related_name="mini_program_config",
        description="关联项目",
    )
    app_id = fields.CharField(max_length=64, index=True, description="微信小程序 AppID")
    home_page_config = fields.JSONField(default=dict, description="首页展示配置")
    order_entry_config = fields.JSONField(default=dict, description="订单入口配置")
    customer_service_phone = fields.CharField(max_length=32, null=True, description="客服电话")
    enabled = fields.BooleanField(default=True, description="是否启用")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")

    class Meta:
        table = "mini_program_configs"
        table_description = "小程序项目配置表"
