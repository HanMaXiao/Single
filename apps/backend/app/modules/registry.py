from collections.abc import Iterable

from fastapi import APIRouter

from app.modules.asset import module as asset_module
from app.modules.catalog import module as catalog_module
from app.modules.content import module as content_module
from app.modules.device import module as device_module
from app.modules.identity import module as identity_module
from app.modules.integration import module as integration_module
from app.modules.operation import module as operation_module
from app.modules.order import module as order_module
from app.modules.payment import module as payment_module
from app.modules.tenant import module as tenant_module


MODULES = [
    identity_module,
    tenant_module,
    catalog_module,
    asset_module,
    order_module,
    payment_module,
    device_module,
    content_module,
    operation_module,
    integration_module,
]


def get_model_modules() -> list[str]:
    model_modules = []
    for module in MODULES:
        model_modules.extend(module.model_modules)
    return model_modules


def get_routers() -> Iterable[APIRouter]:
    for module in MODULES:
        yield from module.routers
