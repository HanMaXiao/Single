from pydantic import BaseModel


class IntegrationEvent(BaseModel):
    event_type: str
    actor_id: int | None = None


class WebhookReceivedEvent(IntegrationEvent):
    event_type: str = "integration.webhook_received"
    webhook_event_id: int
