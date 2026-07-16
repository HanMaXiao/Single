from fastapi import APIRouter

from app.modules.identity import service
from app.modules.identity.schemas import AdminUserOut, ModuleInfoOut
from app.schemas.base import ApiResponse, ok


router = APIRouter(prefix="/admin/identity", tags=["admin-identity"])


@router.get("/module-info", response_model=ApiResponse[ModuleInfoOut])
async def get_module_info() -> ApiResponse[ModuleInfoOut]:
    return ok(service.get_module_info())


@router.get("/admin-users", response_model=ApiResponse[list[AdminUserOut]])
async def list_admin_users() -> ApiResponse[list[AdminUserOut]]:
    return ok(await service.list_admin_users())
