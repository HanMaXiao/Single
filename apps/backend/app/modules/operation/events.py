from pydantic import BaseModel


class OperationEvent(BaseModel):
    event_type: str
    actor_id: int | None = None


class AlertRaisedEvent(OperationEvent):
    event_type: str = "operation.alert_raised"
    alert_id: int
