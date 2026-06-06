from typing import Generic, TypeVar

from pydantic import BaseModel


T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    code: int = 0
    data: T | None = None
    msg: str = "ok"


def ok(data: T, msg: str = "ok") -> ApiResponse[T]:
    return ApiResponse(code=0, data=data, msg=msg)
