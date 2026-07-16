from app.modules.integration.models import WebhookEvent


async def count_webhook_events() -> int:
    return await WebhookEvent.all().count()
