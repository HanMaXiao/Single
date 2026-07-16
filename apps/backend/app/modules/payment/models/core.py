from tortoise import fields
from tortoise.models import Model

from app.modules.payment.enums import PaymentStatus, RefundStatus


class PaymentRecord(Model):
    id = fields.IntField(pk=True, description="支付记录ID")
    payment_no = fields.CharField(max_length=64, unique=True, index=True, description="支付单号")
    order_id = fields.IntField(index=True, description="订单ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    merchant_id = fields.IntField(null=True, index=True, description="商户ID")
    channel = fields.CharField(max_length=32, description="支付渠道")
    amount_cents = fields.IntField(description="支付金额，单位分")
    status = fields.CharEnumField(
        PaymentStatus, max_length=16, default=PaymentStatus.PENDING, description="支付状态"
    )
    external_transaction_id = fields.CharField(
        max_length=128, null=True, index=True, description="外部交易号"
    )
    paid_at = fields.DatetimeField(null=True, description="支付完成时间")
    callback_payload = fields.JSONField(default=dict, description="支付回调原始数据")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")

    class Meta:
        table = "payments"
        table_description = "支付记录表"


class RefundRecord(Model):
    id = fields.IntField(pk=True, description="退款记录ID")
    refund_no = fields.CharField(max_length=64, unique=True, index=True, description="退款单号")
    payment_id = fields.IntField(index=True, description="支付记录ID")
    order_id = fields.IntField(index=True, description="订单ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    amount_cents = fields.IntField(description="退款金额，单位分")
    status = fields.CharEnumField(
        RefundStatus, max_length=16, default=RefundStatus.PENDING, description="退款状态"
    )
    reason = fields.TextField(null=True, description="退款原因")
    external_refund_id = fields.CharField(
        max_length=128, null=True, index=True, description="外部退款号"
    )
    callback_payload = fields.JSONField(default=dict, description="退款回调原始数据")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")

    class Meta:
        table = "refunds"
        table_description = "退款记录表"
