from fastapi import APIRouter

from app.modules.asset import router_admin, router_client


model_modules = ["app.modules.asset.models"]
routers: list[APIRouter] = [router_admin.router, router_client.router]
