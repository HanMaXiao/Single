from pydantic import BaseModel


class TenantEvent(BaseModel):
    event_type: str
    actor_id: int | None = None


class ProjectCreatedEvent(TenantEvent):
    event_type: str = "tenant.project_created"
    project_id: int
