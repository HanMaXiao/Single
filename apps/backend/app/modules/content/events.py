from pydantic import BaseModel


class ContentEvent(BaseModel):
    event_type: str
    actor_id: int | None = None


class ContentPublishedEvent(ContentEvent):
    event_type: str = "content.published"
    content_id: int
