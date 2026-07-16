from fastapi import APIRouter

from app.modules.order import router_admin, router_client


model_modules = ["app.modules.order.models"]
routers: list[APIRouter] = [router_admin.router, router_client.router]
