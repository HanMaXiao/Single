from enum import StrEnum


class OrderStatus(StrEnum):
    PENDING_PAYMENT = "pending_payment"
    PAID = "paid"
    VERIFIED = "verified"
    IN_USE = "in_use"
    PENDING_RETURN = "pending_return"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    REFUNDING = "refunding"
    REFUNDED = "refunded"
    EXPIRED = "expired"
    ABNORMAL = "abnormal"


class EntitlementStatus(StrEnum):
    ACTIVE = "active"
    EXPIRED = "expired"
    REVOKED = "revoked"


class EntitlementType(StrEnum):
    TIME_LIMITED = "time_limited"
    PERMANENT = "permanent"
