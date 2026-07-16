from fastapi import APIRouter

from app.modules.asset import service
from app.modules.asset.schemas import ModuleInfoOut
from app.schemas.base import ApiResponse, ok


router = APIRouter(prefix="/client/asset", tags=["client-asset"])


@router.get("/module-info", response_model=ApiResponse[ModuleInfoOut])
async def get_module_info() -> ApiResponse[ModuleInfoOut]:
    return ok(service.get_module_info())
