from fastapi import APIRouter

from app.schemas.base import ApiResponse, ok


router = APIRouter(prefix="/health", tags=["health"])


@router.get("", response_model=ApiResponse[dict[str, str]])
async def health_check():
    return ok({"status": "healthy"})
