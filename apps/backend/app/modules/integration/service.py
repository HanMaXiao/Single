from app.modules.integration.schemas import ModuleInfoOut


def get_module_info() -> ModuleInfoOut:
    return ModuleInfoOut(
        name="integration",
        description="微信、小程序、MQ、定时任务、硬件和 AI 服务适配模块",
        tables=["integration_configs", "webhook_events", "scheduled_task_records"],
    )
