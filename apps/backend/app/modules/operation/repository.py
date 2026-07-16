from app.modules.operation.models import OperationLog


async def count_operation_logs() -> int:
    return await OperationLog.all().count()
