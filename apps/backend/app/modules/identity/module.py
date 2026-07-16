from fastapi import APIRouter

from app.modules.identity import router_admin, router_client


model_modules = ["app.modules.identity.models"]
routers: list[APIRouter] = [router_admin.router, router_client.router]
