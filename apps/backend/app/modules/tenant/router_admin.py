from fastapi import APIRouter

from app.modules.tenant import service
from app.modules.tenant.schemas import CompanyCreate, CompanyOut, ModuleInfoOut, ProjectOut
from app.schemas.base import ApiResponse, ok


router = APIRouter(prefix="/admin/tenant", tags=["admin-tenant"])


@router.get("/module-info", response_model=ApiResponse[ModuleInfoOut])
async def get_module_info() -> ApiResponse[ModuleInfoOut]:
    return ok(service.get_module_info())


@router.post("/companies", response_model=ApiResponse[CompanyOut])
async def create_company(payload: CompanyCreate) -> ApiResponse[CompanyOut]:
    return ok(await service.create_company(payload), msg="created")


@router.get("/companies", response_model=ApiResponse[list[CompanyOut]])
async def list_companies() -> ApiResponse[list[CompanyOut]]:
    return ok(await service.list_companies())


@router.get("/projects", response_model=ApiResponse[list[ProjectOut]])
async def list_projects() -> ApiResponse[list[ProjectOut]]:
    return ok(await service.list_projects())
