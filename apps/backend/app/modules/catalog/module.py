from fastapi import APIRouter

from app.modules.catalog import router_admin, router_client


model_modules = ["app.modules.catalog.models"]
routers: list[APIRouter] = [router_admin.router, router_client.router]
