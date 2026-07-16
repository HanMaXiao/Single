from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.modules.identity.enums import AdminUserStatus, DataScopeType


class AdminUserOut(BaseModel):
    id: int
    username: str
    display_name: str | None = None
    status: AdminUserStatus
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class DataScopeOut(BaseModel):
    scope_type: DataScopeType
    company_id: int | None = None
    operator_id: int | None = None
    project_id: int | None = None

    model_config = ConfigDict(from_attributes=True)


class CurrentIdentityOut(BaseModel):
    id: int
    username: str
    role: str
    scopes: list[DataScopeOut] = []

    model_config = ConfigDict(from_attributes=True)


class ModuleInfoOut(BaseModel):
    name: str
    description: str
    tables: list[str]
