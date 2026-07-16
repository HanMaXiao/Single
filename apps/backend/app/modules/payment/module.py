from fastapi import APIRouter

from app.modules.payment import router_admin, router_client


model_modules = ["app.modules.payment.models"]
routers: list[APIRouter] = [router_admin.router, router_client.router]
