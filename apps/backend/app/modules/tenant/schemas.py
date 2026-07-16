from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.modules.tenant.enums import ProjectStatus, TenantStatus


class CompanyCreate(BaseModel):
    name: str


class CompanyOut(BaseModel):
    id: int
    name: str
    status: TenantStatus
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ProjectOut(BaseModel):
    id: int
    company_id: int
    merchant_id: int | None = None
    operator_id: int | None = None
    name: str
    scenic_name: str
    scenic_address: str | None = None
    status: ProjectStatus
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CurrentProjectOut(BaseModel):
    id: int | None = None
    name: str | None = None
    status: ProjectStatus | None = None


class ModuleInfoOut(BaseModel):
    name: str
    description: str
    tables: list[str]
