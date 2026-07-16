from app.modules.payment.models import PaymentRecord


async def count_payments() -> int:
    return await PaymentRecord.all().count()
