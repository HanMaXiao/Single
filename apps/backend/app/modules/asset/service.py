from app.modules.asset.schemas import ModuleInfoOut


def get_module_info() -> ModuleInfoOut:
    return ModuleInfoOut(
        name="asset",
        description="设备资产、耗材资产、固定资产与库存流水模块",
        tables=["device_assets", "consumable_assets", "consumable_stock_logs", "fixed_assets"],
    )
