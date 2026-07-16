from tortoise import fields
from tortoise.models import Model

from app.modules.content.enums import ContentStatus


class ScenicSpot(Model):
    id = fields.IntField(pk=True, description="景点ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    name = fields.CharField(max_length=128, description="景点名称")
    introduction = fields.TextField(null=True, description="景点介绍")
    sort_order = fields.IntField(default=0, description="排序值")
    status = fields.CharEnumField(ContentStatus, max_length=16, default=ContentStatus.DRAFT, description="内容状态")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")
    deleted_at = fields.DatetimeField(null=True, description="软删除时间")

    class Meta:
        table = "scenic_spots"
        table_description = "景区景点表"


class GuideContent(Model):
    id = fields.IntField(pk=True, description="导览内容ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    spot_id = fields.IntField(null=True, index=True, description="关联景点ID")
    title = fields.CharField(max_length=128, description="内容标题")
    body = fields.TextField(description="内容正文")
    content_type = fields.CharField(max_length=32, description="内容类型")
    status = fields.CharEnumField(ContentStatus, max_length=16, default=ContentStatus.DRAFT, description="内容状态")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")
    deleted_at = fields.DatetimeField(null=True, description="软删除时间")

    class Meta:
        table = "guide_contents"
        table_description = "景区导览内容表"
