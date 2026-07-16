from pydantic import BaseModel


class DeviceEvent(BaseModel):
    event_type: str
    actor_id: int | None = None


class DeviceHeartbeatReceivedEvent(DeviceEvent):
    event_type: str = "device.heartbeat_received"
    device_id: int
