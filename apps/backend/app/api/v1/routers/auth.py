from fastapi import APIRouter, HTTPException, status

from app.configs.settings import settings
from app.core.security import create_access_token, hash_password, verify_password
from app.modules.identity.models import User
from app.schemas.base import ApiResponse, ok
from app.schemas.user import LoginRequest, RegisterRequest, TokenData, UserOut


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=ApiResponse[UserOut])
async def register(payload: RegisterRequest) -> ApiResponse[UserOut]:
    if not settings.enable_self_registration:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Self-registration is disabled",
        )

    existing = await User.filter(username=payload.username).first()
    if existing is not None:
        raise HTTPException(status_code=400, detail="Username already exists")

    user = await User.create(
        username=payload.username,
        hashed_password=hash_password(payload.password),
    )
    return ok(UserOut.model_validate(user, from_attributes=True), msg="registered")


@router.post("/login", response_model=ApiResponse[TokenData])
async def login(payload: LoginRequest) -> ApiResponse[TokenData]:
    user = await User.filter(username=payload.username, is_active=True).first()
    if user is None or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid username or password")

    token = create_access_token(subject=str(user.id))
    return ok(TokenData(access_token=token), msg="logged in")
