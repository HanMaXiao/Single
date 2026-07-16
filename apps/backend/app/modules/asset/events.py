from pydantic import BaseModel


class AssetEvent(BaseModel):
    event_type: str
    actor_id: int | None = None


class DeviceAssetCreatedEvent(AssetEvent):
    event_type: str = "asset.device_asset_created"
    device_asset_id: int
