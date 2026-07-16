from app.modules.catalog.schemas import ModuleInfoOut


def get_module_info() -> ModuleInfoOut:
    return ModuleInfoOut(
        name="catalog",
        description="商品、SKU、套餐、计费规则与租赁规则模块",
        tables=["products", "skus", "pricing_rules"],
    )
