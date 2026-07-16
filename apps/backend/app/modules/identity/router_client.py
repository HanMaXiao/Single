from fastapi import APIRouter, Depends

from app.middleware.auth import require_auth
from app.modules.identity.models import User
from app.modules.identity import service
from app.modules.identity.schemas import CurrentIdentityOut, ModuleInfoOut
from app.schemas.base import ApiResponse, ok


router = APIRouter(prefix="/client/identity", tags=["client-identity"])


@router.get("/module-info", response_model=ApiResponse[ModuleInfoOut])
async def get_module_info() -> ApiResponse[ModuleInfoOut]:
    return ok(service.get_module_info())


@router.get("/me", response_model=ApiResponse[CurrentIdentityOut])
async def get_current_identity(
    current_user: User = Depends(require_auth),
) -> ApiResponse[CurrentIdentityOut]:
    return ok(await service.build_current_identity(current_user))
