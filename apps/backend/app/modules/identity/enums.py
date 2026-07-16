from enum import StrEnum


class AdminUserStatus(StrEnum):
    ACTIVE = "active"
    DISABLED = "disabled"


class DataScopeType(StrEnum):
    ALL = "all"
    COMPANY = "company"
    OPERATOR = "operator"
    PROJECT = "project"
