from tortoise import fields
from tortoise.models import Model

from app.modules.catalog.enums import PricingMode, ProductStatus


class Product(Model):
    id = fields.IntField(pk=True, description="商品ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    name = fields.CharField(max_length=128, description="商品名称")
    description = fields.TextField(null=True, description="商品说明")
    status = fields.CharEnumField(
        ProductStatus, max_length=16, default=ProductStatus.DRAFT, description="商品状态"
    )
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")
    deleted_at = fields.DatetimeField(null=True, description="软删除时间")

    class Meta:
        table = "products"
        table_description = "项目商品表"


class Sku(Model):
    id = fields.IntField(pk=True, description="SKU ID")
    product_id = fields.IntField(index=True, description="所属商品ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    name = fields.CharField(max_length=128, description="SKU 名称")
    price_cents = fields.IntField(description="价格，单位分")
    deposit_cents = fields.IntField(default=0, description="押金，单位分")
    stock_limit = fields.IntField(null=True, description="可售库存上限")
    status = fields.CharEnumField(
        ProductStatus, max_length=16, default=ProductStatus.ACTIVE, description="SKU 状态"
    )
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")
    deleted_at = fields.DatetimeField(null=True, description="软删除时间")

    class Meta:
        table = "skus"
        table_description = "商品 SKU 表"


class PricingRule(Model):
    id = fields.IntField(pk=True, description="计费规则ID")
    project_id = fields.IntField(index=True, description="所属项目ID")
    sku_id = fields.IntField(null=True, index=True, description="关联 SKU ID")
    mode = fields.CharEnumField(PricingMode, max_length=16, description="计费模式")
    duration_minutes = fields.IntField(null=True, description="计费时长，单位分钟")
    overtime_price_cents = fields.IntField(default=0, description="超时费用，单位分")
    buyout_price_cents = fields.IntField(null=True, description="买断价格，单位分")
    config = fields.JSONField(default=dict, description="规则扩展配置")
    created_at = fields.DatetimeField(auto_now_add=True, description="创建时间")
    updated_at = fields.DatetimeField(auto_now=True, description="更新时间")

    class Meta:
        table = "pricing_rules"
        table_description = "商品计费与租赁规则表"
