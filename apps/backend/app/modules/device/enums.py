from enum import StrEnum


class BindingStatus(StrEnum):
    BOUND = "bound"
    UNBOUND = "unbound"


class DeviceOnlineStatus(StrEnum):
    ONLINE = "online"
    OFFLINE = "offline"


class FaultStatus(StrEnum):
    OPEN = "open"
    REPAIRING = "repairing"
    RESOLVED = "resolved"
