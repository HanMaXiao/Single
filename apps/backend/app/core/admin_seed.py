from app.configs.settings import settings
from app.core.security import hash_password, verify_password
from app.models.user import User


async def seed_admin_user_from_environment() -> User | None:
    admin_username = settings.admin_username
    admin_password = settings.admin_password
    if admin_username is None or admin_password is None:
        return None

    password = admin_password.get_secret_value()
    user = await User.filter(username=admin_username).first()
    if user is None:
        return await User.create(
            username=admin_username,
            hashed_password=hash_password(password),
            is_active=True,
        )

    fields_to_update: list[str] = []
    if not verify_password(password, user.hashed_password):
        user.hashed_password = hash_password(password)
        fields_to_update.append("hashed_password")

    if not user.is_active:
        user.is_active = True
        fields_to_update.append("is_active")

    if len(fields_to_update) == 0:
        return user

    await user.save(update_fields=[*fields_to_update, "updated_at"])
    return user
