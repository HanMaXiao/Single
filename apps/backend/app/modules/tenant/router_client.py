from fastapi import APIRouter

from app.modules.tenant import service
from app.modules.tenant.schemas import CurrentProjectOut, ModuleInfoOut
from app.schemas.base import ApiResponse, ok


router = APIRouter(prefix="/client/tenant", tags=["client-tenant"])


@router.get("/module-info", response_model=ApiResponse[ModuleInfoOut])
async def get_module_info() -> ApiResponse[ModuleInfoOut]:
    return ok(service.get_module_info())


@router.get("/projects/current", response_model=ApiResponse[CurrentProjectOut])
async def get_current_project() -> ApiResponse[CurrentProjectOut]:
    return ok(await service.get_current_project())
