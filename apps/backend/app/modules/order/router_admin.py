from fastapi import APIRouter

from app.modules.order import service
from app.modules.order.schemas import ModuleInfoOut
from app.schemas.base import ApiResponse, ok


router = APIRouter(prefix="/admin/order", tags=["admin-order"])


@router.get("/module-info", response_model=ApiResponse[ModuleInfoOut])
async def get_module_info() -> ApiResponse[ModuleInfoOut]:
    return ok(service.get_module_info())
