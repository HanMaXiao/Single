from pydantic import BaseModel


class ModuleInfoOut(BaseModel):
    name: str
    description: str
    tables: list[str]
