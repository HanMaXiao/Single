from enum import StrEnum


class IntegrationProvider(StrEnum):
    WECHAT = "wechat"
    DEVICE_VENDOR = "device_vendor"
    AI_SERVICE = "ai_service"
    INTERNAL = "internal"


class WebhookStatus(StrEnum):
    RECEIVED = "received"
    PROCESSED = "processed"
    FAILED = "failed"
