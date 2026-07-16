from enum import StrEnum


class ProjectStatus(StrEnum):
    PREPARING = "preparing"
    OPERATING = "operating"
    PAUSED = "paused"
    CLOSED = "closed"


class TenantStatus(StrEnum):
    ACTIVE = "active"
    DISABLED = "disabled"
