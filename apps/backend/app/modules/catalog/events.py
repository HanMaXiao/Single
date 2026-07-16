from pydantic import BaseModel


class CatalogEvent(BaseModel):
    event_type: str
    actor_id: int | None = None


class ProductPublishedEvent(CatalogEvent):
    event_type: str = "catalog.product_published"
    product_id: int
