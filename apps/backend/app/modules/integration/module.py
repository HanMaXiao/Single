from fastapi import APIRouter

from app.modules.integration import router_admin, router_client


model_modules = ["app.modules.integration.models"]
routers: list[APIRouter] = [router_admin.router, router_client.router]
