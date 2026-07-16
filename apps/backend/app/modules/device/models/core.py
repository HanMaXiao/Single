from tortoise import fields
from tortoise.models import Model

from app.modules.device.enums import BindingStatus, DeviceOnlineStatus, FaultStatus


class DeviceBinding(Model):
    id = fields.IntField(pk=True, description="设备绑定记录ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    order_id = fields.IntField(index=True, description="订单ID")
    device_id = fields.IntField(index=True, description="设备资产ID")
    device_sn = fields.CharField(max_length=64, index=True, description="设备 SN")
    status = fields.CharEnumField(BindingStatus, max_length=16, default=BindingStatus.BOUND, description="绑定状态")
    bound_at = fields.DatetimeField(auto_now_add=True, description="绑定时间")
    unbound_at = fields.DatetimeField(null=True, description="解绑时间")
    operator_user_id = fields.IntField(null=True, description="操作人员ID")

    class Meta:
        table = "device_bindings"
        table_description = "订单设备绑定记录表"


class DeviceAuthorization(Model):
    id = fields.IntField(pk=True, description="设备授权ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    device_id = fields.IntField(index=True, description="设备资产ID")
    order_id = fields.IntField(null=True, index=True, description="订单ID")
    entitlement_id = fields.IntField(null=True, index=True, description="服务权益ID")
    valid_from = fields.DatetimeField(null=True, description="授权开始时间")
    valid_until = fields.DatetimeField(null=True, description="授权到期时间")
    permanent = fields.BooleanField(default=False, description="是否永久授权")
    revoked_at = fields.DatetimeField(null=True, description="撤销时间")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")

    class Meta:
        table = "device_authorizations"
        table_description = "设备服务授权表"


class DeviceStatusLog(Model):
    id = fields.IntField(pk=True, description="设备状态记录ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    device_id = fields.IntField(index=True, description="设备资产ID")
    device_sn = fields.CharField(max_length=64, index=True, description="设备 SN")
    online_status = fields.CharEnumField(DeviceOnlineStatus, max_length=16, description="在线状态")
    battery_percent = fields.IntField(null=True, description="电量百分比")
    payload = fields.JSONField(default=dict, description="设备上报原始数据")
    reported_at = fields.DatetimeField(auto_now_add=True, description="上报时间")

    class Meta:
        table = "device_status_logs"
        table_description = "设备状态与心跳记录表"


class DeviceFaultLog(Model):
    id = fields.IntField(pk=True, description="设备故障记录ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    device_id = fields.IntField(index=True, description="设备资产ID")
    device_sn = fields.CharField(max_length=64, index=True, description="设备 SN")
    status = fields.CharEnumField(FaultStatus, max_length=16, default=FaultStatus.OPEN, description="故障处理状态")
    description = fields.TextField(description="故障描述")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    resolved_at = fields.DatetimeField(null=True, description="解决时间")

    class Meta:
        table = "device_fault_logs"
        table_description = "设备故障记录表"
