from tortoise import fields
from tortoise.models import Model

from app.modules.order.enums import EntitlementStatus, EntitlementType, OrderStatus


class RentalOrder(Model):
    id = fields.IntField(pk=True, description="订单ID")
    order_no = fields.CharField(max_length=64, unique=True, index=True, description="订单号")
    project_id = fields.IntField(index=True, description="所属项目ID")
    user_id = fields.IntField(null=True, index=True, description="游客用户ID")
    status = fields.CharEnumField(
        OrderStatus, max_length=24, default=OrderStatus.PENDING_PAYMENT, description="订单状态"
    )
    total_amount_cents = fields.IntField(default=0, description="订单总金额，单位分")
    deposit_amount_cents = fields.IntField(default=0, description="押金金额，单位分")
    paid_at = fields.DatetimeField(null=True, description="支付时间")
    verified_at = fields.DatetimeField(null=True, description="核销时间")
    started_at = fields.DatetimeField(null=True, description="租赁开始时间")
    finished_at = fields.DatetimeField(null=True, description="订单完成时间")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")
    deleted_at = fields.DatetimeField(null=True, description="软删除时间")

    class Meta:
        table = "orders"
        table_description = "租赁订单表"
        indexes = (("project_id", "created_at"), ("status", "created_at"))


class OrderItem(Model):
    id = fields.IntField(pk=True, description="订单项ID")
    order_id = fields.IntField(index=True, description="订单ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    product_id = fields.IntField(null=True, description="商品ID")
    sku_id = fields.IntField(null=True, description="SKU ID")
    name = fields.CharField(max_length=128, description="订单项名称")
    quantity = fields.IntField(default=1, description="购买数量")
    unit_price_cents = fields.IntField(default=0, description="单价，单位分")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")

    class Meta:
        table = "order_items"
        table_description = "订单明细表"


class VerificationRecord(Model):
    id = fields.IntField(pk=True, description="核销记录ID")
    order_id = fields.IntField(index=True, description="订单ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    operator_user_id = fields.IntField(null=True, description="核销人员ID")
    code = fields.CharField(max_length=128, index=True, description="核销码")
    verified_at = fields.DatetimeField(auto_now_add=True, description="核销时间")
    remark = fields.TextField(null=True, description="备注")

    class Meta:
        table = "verification_records"
        table_description = "订单核销记录表"


class ServiceEntitlement(Model):
    id = fields.IntField(pk=True, description="服务权益ID")
    order_id = fields.IntField(index=True, description="订单ID")
    user_id = fields.IntField(null=True, index=True, description="游客用户ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    entitlement_type = fields.CharEnumField(EntitlementType, max_length=24, description="权益类型")
    status = fields.CharEnumField(
        EntitlementStatus, max_length=16, default=EntitlementStatus.ACTIVE, description="权益状态"
    )
    valid_from = fields.DatetimeField(null=True, description="权益生效时间")
    valid_until = fields.DatetimeField(null=True, description="权益到期时间")
    device_id = fields.IntField(null=True, index=True, description="绑定设备资产ID")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")

    class Meta:
        table = "service_entitlements"
        table_description = "租赁与买断服务权益表"
