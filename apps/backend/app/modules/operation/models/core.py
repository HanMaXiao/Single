from tortoise import fields
from tortoise.models import Model

from app.modules.operation.enums import AlertStatus, OperationLevel


class OperationLog(Model):
    id = fields.IntField(pk=True, description="操作日志ID")
    actor_id = fields.IntField(null=True, index=True, description="操作人ID")
    company_id = fields.IntField(null=True, index=True, description="公司主体ID")
    project_id = fields.IntField(null=True, index=True, description="项目ID")
    module = fields.CharField(max_length=64, index=True, description="业务模块")
    action = fields.CharField(max_length=128, description="操作动作")
    level = fields.CharEnumField(
        OperationLevel, max_length=16, default=OperationLevel.INFO, description="日志级别"
    )
    target_type = fields.CharField(max_length=64, null=True, description="操作对象类型")
    target_id = fields.CharField(max_length=64, null=True, description="操作对象ID")
    detail = fields.JSONField(default=dict, description="操作详情")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")

    class Meta:
        table = "operation_logs"
        table_description = "后台操作日志表"


class AlertRecord(Model):
    id = fields.IntField(pk=True, description="告警记录ID")
    project_id = fields.IntField(null=True, index=True, description="项目ID")
    module = fields.CharField(max_length=64, index=True, description="告警模块")
    title = fields.CharField(max_length=128, description="告警标题")
    message = fields.TextField(description="告警内容")
    status = fields.CharEnumField(
        AlertStatus, max_length=16, default=AlertStatus.OPEN, description="告警状态"
    )
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    resolved_at = fields.DatetimeField(null=True, description="解决时间")

    class Meta:
        table = "alert_records"
        table_description = "系统告警记录表"
