from app.modules.device.schemas import ModuleInfoOut


def get_module_info() -> ModuleInfoOut:
    return ModuleInfoOut(
        name="device",
        description="设备绑定、授权、心跳、状态监控与故障记录模块",
        tables=["device_bindings", "device_authorizations", "device_status_logs", "device_fault_logs"],
    )
