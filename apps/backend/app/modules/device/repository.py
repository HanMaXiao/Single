from app.modules.device.models import DeviceBinding


async def count_bindings() -> int:
    return await DeviceBinding.all().count()
