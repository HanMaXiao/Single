from app.modules.operation.schemas import ModuleInfoOut


def get_module_info() -> ModuleInfoOut:
    return ModuleInfoOut(
        name="operation",
        description="操作日志、审计、后台看板与告警模块",
        tables=["operation_logs", "alert_records"],
    )
