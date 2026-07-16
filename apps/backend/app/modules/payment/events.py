from pydantic import BaseModel


class PaymentEvent(BaseModel):
    event_type: str
    actor_id: int | None = None


class PaymentSucceededEvent(PaymentEvent):
    event_type: str = "payment.succeeded"
    payment_id: int
    order_id: int
