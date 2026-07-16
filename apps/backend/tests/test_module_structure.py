from app.main import app
from app.modules.tenant.models import Company
from app.modules.registry import get_model_modules, get_routers


BUSINESS_MODULES = [
    "identity",
    "tenant",
    "catalog",
    "asset",
    "order",
    "payment",
    "device",
    "content",
    "operation",
    "integration",
]


def test_modular_models_are_registered() -> None:
    models = get_model_modules()

    assert "app.models.user" not in models
    for module_name in BUSINESS_MODULES:
        assert f"app.modules.{module_name}.models" in models


def test_module_routers_are_registered_through_registry() -> None:
    route_prefixes = [router.prefix for router in get_routers()]

    for module_name in BUSINESS_MODULES:
        assert f"/admin/{module_name}" in route_prefixes
        assert f"/client/{module_name}" in route_prefixes


def test_identity_and_tenant_routes_are_registered() -> None:
    paths = app.openapi()["paths"]

    assert "/api/v1/admin/identity/admin-users" in paths
    assert "/api/v1/client/identity/me" in paths
    assert "/api/v1/admin/tenant/companies" in paths
    assert "/api/v1/admin/tenant/projects" in paths
    assert "/api/v1/client/tenant/projects/current" in paths
    for module_name in BUSINESS_MODULES:
        assert f"/api/v1/admin/{module_name}/module-info" in paths
        assert f"/api/v1/client/{module_name}/module-info" in paths


def test_model_table_and_field_descriptions_are_defined() -> None:
    assert Company._meta.table_description == "公司主体表"
    assert Company._meta.fields_map["name"].description == "公司主体名称"
