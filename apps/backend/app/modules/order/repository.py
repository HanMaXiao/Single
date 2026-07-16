from app.modules.order.models import RentalOrder


async def count_orders() -> int:
    return await RentalOrder.all().count()
