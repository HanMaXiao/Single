from tortoise import fields
from tortoise.models import Model

from app.modules.asset.enums import AssetStatus, ConsumableChangeType


class DeviceAsset(Model):
    id = fields.IntField(pk=True, description="设备资产ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    sn = fields.CharField(max_length=64, unique=True, index=True, description="设备 SN")
    model_name = fields.CharField(max_length=128, null=True, description="设备型号")
    batch_no = fields.CharField(max_length=64, null=True, description="设备批次")
    status = fields.CharEnumField(AssetStatus, max_length=16, default=AssetStatus.IN_STOCK, description="资产状态")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")
    deleted_at = fields.DatetimeField(null=True, description="软删除时间")

    class Meta:
        table = "device_assets"
        table_description = "设备资产表"


class ConsumableAsset(Model):
    id = fields.IntField(pk=True, description="耗材ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    name = fields.CharField(max_length=128, description="耗材名称")
    unit = fields.CharField(max_length=32, description="计量单位")
    stock_quantity = fields.IntField(default=0, description="当前库存数量")
    safety_stock = fields.IntField(default=0, description="安全库存数量")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")
    deleted_at = fields.DatetimeField(null=True, description="软删除时间")

    class Meta:
        table = "consumable_assets"
        table_description = "运营耗材资产表"


class ConsumableStockLog(Model):
    id = fields.IntField(pk=True, description="耗材库存流水ID")
    consumable_id = fields.IntField(index=True, description="耗材ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    change_type = fields.CharEnumField(ConsumableChangeType, max_length=16, description="库存变更类型")
    quantity = fields.IntField(description="变更数量")
    remark = fields.TextField(null=True, description="备注")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")

    class Meta:
        table = "consumable_stock_logs"
        table_description = "耗材库存流水表"


class FixedAsset(Model):
    id = fields.IntField(pk=True, description="固定资产ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    asset_no = fields.CharField(max_length=64, unique=True, index=True, description="资产编号")
    name = fields.CharField(max_length=128, description="资产名称")
    location = fields.CharField(max_length=255, null=True, description="所在点位")
    status = fields.CharEnumField(AssetStatus, max_length=16, default=AssetStatus.AVAILABLE, description="资产状态")
    remark = fields.TextField(null=True, description="备注")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")
    deleted_at = fields.DatetimeField(null=True, description="软删除时间")

    class Meta:
        table = "fixed_assets"
        table_description = "固定资产表"
