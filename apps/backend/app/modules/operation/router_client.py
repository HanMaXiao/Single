from fastapi import APIRouter

from app.modules.operation import service
from app.modules.operation.schemas import ModuleInfoOut
from app.schemas.base import ApiResponse, ok


router = APIRouter(prefix="/client/operation", tags=["client-operation"])


@router.get("/module-info", response_model=ApiResponse[ModuleInfoOut])
async def get_module_info() -> ApiResponse[ModuleInfoOut]:
    return ok(service.get_module_info())
