from pydantic import BaseModel


class OrderEvent(BaseModel):
    event_type: str
    actor_id: int | None = None


class OrderPaidEvent(OrderEvent):
    event_type: str = "order.paid"
    order_id: int


class OrderDeviceBoundEvent(OrderEvent):
    event_type: str = "order.device_bound"
    order_id: int
    device_id: int
