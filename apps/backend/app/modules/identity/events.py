from pydantic import BaseModel


class IdentityEvent(BaseModel):
    event_type: str
    actor_id: int | None = None


class AdminUserCreatedEvent(IdentityEvent):
    event_type: str = "identity.admin_user_created"
    admin_user_id: int
