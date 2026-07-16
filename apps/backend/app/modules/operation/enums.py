from enum import StrEnum


class OperationLevel(StrEnum):
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"


class AlertStatus(StrEnum):
    OPEN = "open"
    ACKNOWLEDGED = "acknowledged"
    RESOLVED = "resolved"
