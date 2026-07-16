from app.modules.content.schemas import ModuleInfoOut


def get_module_info() -> ModuleInfoOut:
    return ModuleInfoOut(
        name="content",
        description="景点、导览说明、游客须知与项目展示内容模块",
        tables=["scenic_spots", "guide_contents"],
    )
