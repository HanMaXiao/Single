from fastapi import APIRouter

from app.modules.content import service
from app.modules.content.schemas import ModuleInfoOut
from app.schemas.base import ApiResponse, ok


router = APIRouter(prefix="/admin/content", tags=["admin-content"])


@router.get("/module-info", response_model=ApiResponse[ModuleInfoOut])
async def get_module_info() -> ApiResponse[ModuleInfoOut]:
    return ok(service.get_module_info())
