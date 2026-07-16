from tortoise import fields
from tortoise.models import Model

from app.modules.integration.enums import IntegrationProvider, WebhookStatus


class IntegrationConfig(Model):
    id = fields.IntField(pk=True, description="集成配置ID")
    project_id = fields.IntField(null=True, index=True, description="项目ID")
    provider = fields.CharEnumField(IntegrationProvider, max_length=32, description="集成提供方")
    name = fields.CharField(max_length=128, description="配置名称")
    config = fields.JSONField(default=dict, description="集成配置")
    enabled = fields.BooleanField(default=True, description="是否启用")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")

    class Meta:
        table = "integration_configs"
        table_description = "外部系统集成配置表"


class WebhookEvent(Model):
    id = fields.IntField(pk=True, description="Webhook 事件ID")
    provider = fields.CharEnumField(IntegrationProvider, max_length=32, description="来源提供方")
    event_key = fields.CharField(max_length=128, index=True, description="事件键")
    status = fields.CharEnumField(WebhookStatus, max_length=16, default=WebhookStatus.RECEIVED, description="处理状态")
    payload = fields.JSONField(default=dict, description="事件原始数据")
    received_at = fields.DatetimeField(auto_now_add=True, description="接收时间")
    processed_at = fields.DatetimeField(null=True, description="处理时间")

    class Meta:
        table = "webhook_events"
        table_description = "外部回调事件表"


class ScheduledTaskRecord(Model):
    id = fields.IntField(pk=True, description="定时任务记录ID")
    task_name = fields.CharField(max_length=128, index=True, description="任务名称")
    status = fields.CharField(max_length=32, description="执行状态")
    payload = fields.JSONField(default=dict, description="任务参数")
    started_at = fields.DatetimeField(null=True, description="开始时间")
    finished_at = fields.DatetimeField(null=True, description="结束时间")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")

    class Meta:
        table = "scheduled_task_records"
        table_description = "定时任务执行记录表"
