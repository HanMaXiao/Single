from enum import StrEnum


class AssetStatus(StrEnum):
    IN_STOCK = "in_stock"
    AVAILABLE = "available"
    IN_USE = "in_use"
    FAULTY = "faulty"
    RETIRED = "retired"


class ConsumableChangeType(StrEnum):
    INBOUND = "inbound"
    OUTBOUND = "outbound"
    ADJUSTMENT = "adjustment"
