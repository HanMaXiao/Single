from fastapi import APIRouter

from app.modules.device import service
from app.modules.device.schemas import ModuleInfoOut
from app.schemas.base import ApiResponse, ok


router = APIRouter(prefix="/admin/device", tags=["admin-device"])


@router.get("/module-info", response_model=ApiResponse[ModuleInfoOut])
async def get_module_info() -> ApiResponse[ModuleInfoOut]:
    return ok(service.get_module_info())
