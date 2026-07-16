from app.modules.catalog.models import Product


async def count_products() -> int:
    return await Product.all().count()
