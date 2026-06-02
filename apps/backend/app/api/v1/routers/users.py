from fastapi import APIRouter, Depends

from app.middleware.auth import require_auth
from app.models.user import User
from app.schemas.base import ApiResponse, ok
from app.schemas.user import UserOut


router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=ApiResponse[UserOut])
async def get_me(current_user: User = Depends(require_auth)):
    return ok(UserOut.model_validate(current_user, from_attributes=True))
