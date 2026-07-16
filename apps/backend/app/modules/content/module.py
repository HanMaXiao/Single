from fastapi import APIRouter

from app.modules.content import router_admin, router_client


model_modules = ["app.modules.content.models"]
routers: list[APIRouter] = [router_admin.router, router_client.router]
