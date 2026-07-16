from app.modules.asset.models import DeviceAsset


async def count_device_assets() -> int:
    return await DeviceAsset.all().count()
