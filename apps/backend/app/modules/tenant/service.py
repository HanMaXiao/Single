from app.modules.tenant import repository
from app.modules.tenant.schemas import CompanyCreate, CompanyOut, CurrentProjectOut, ModuleInfoOut, ProjectOut


def get_module_info() -> ModuleInfoOut:
    return ModuleInfoOut(
        name="tenant",
        description="公司主体、商户、运营方、项目、景区资料与小程序配置模块",
        tables=[
            "companies",
            "merchants",
            "operators",
            "projects",
            "scenic_area_infos",
            "mini_program_configs",
        ],
    )


async def create_company(payload: CompanyCreate) -> CompanyOut:
    company = await repository.create_company(name=payload.name)
    return CompanyOut.model_validate(company)


async def list_companies() -> list[CompanyOut]:
    companies = await repository.list_companies()
    return [CompanyOut.model_validate(company) for company in companies]


async def list_projects() -> list[ProjectOut]:
    projects = await repository.list_projects()
    return [ProjectOut.model_validate(project) for project in projects]


async def get_current_project() -> CurrentProjectOut:
    return CurrentProjectOut()
