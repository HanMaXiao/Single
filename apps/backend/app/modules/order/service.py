from app.modules.order.schemas import ModuleInfoOut


def get_module_info() -> ModuleInfoOut:
    return ModuleInfoOut(
        name="order",
        description="订单、核销、租借、归还、订单状态机与服务权益模块",
        tables=["orders", "order_items", "verification_records", "service_entitlements"],
    )
