from app.modules.payment.schemas import ModuleInfoOut


def get_module_info() -> ModuleInfoOut:
    return ModuleInfoOut(
        name="payment",
        description="支付、退款、微信支付分、支付回调与对账模块",
        tables=["payments", "refunds"],
    )
