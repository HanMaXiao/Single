from app.modules.tenant.models import Company, Project


async def create_company(name: str) -> Company:
    return await Company.create(name=name)


async def list_companies() -> list[Company]:
    return await Company.filter(deleted_at=None).order_by("-created_at")


async def list_projects() -> list[Project]:
    return await Project.filter(deleted_at=None).order_by("-created_at")


async def get_project(project_id: int) -> Project | None:
    return await Project.filter(id=project_id, deleted_at=None).first()
