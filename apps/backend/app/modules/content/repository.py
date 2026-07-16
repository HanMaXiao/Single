from app.modules.content.models import ScenicSpot


async def count_spots() -> int:
    return await ScenicSpot.all().count()
