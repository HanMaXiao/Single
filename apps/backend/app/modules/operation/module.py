from fastapi import APIRouter

from app.modules.operation import router_admin, router_client


model_modules = ["app.modules.operation.models"]
routers: list[APIRouter] = [router_admin.router, router_client.router]
