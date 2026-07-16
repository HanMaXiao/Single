# Backend Module Standard

The backend is a modular monolith. Each business module owns its models,
schemas, service layer, repositories, routers, enums, and events.

Do not add new business models under `app/models/`. Models belong to the
module that owns the table.

## Required Layout

```text
modules/<module_name>/
├── __init__.py
├── module.py
├── models/
│   ├── __init__.py
│   └── ...
├── schemas.py
├── service.py
├── repository.py
├── router_admin.py
├── router_client.py
├── enums.py
└── events.py
```

## File Responsibilities

- `module.py`: module metadata, including model modules and routers.
- `models/`: Tortoise ORM models owned by this module.
- `schemas.py`: Pydantic request and response DTOs.
- `repository.py`: database access and complex query composition.
- `service.py`: business orchestration and cross-module use cases.
- `router_admin.py`: `/admin/**` endpoints for operators and platform staff.
- `router_client.py`: `/client/**` endpoints for miniapp/client callers.
- `enums.py`: stable business state values.
- `events.py`: domain events emitted by this module.

Routers should stay thin. They validate HTTP concerns, call `service.py`, and
wrap results with the shared `ApiResponse` format.

Services may call another module's public service function, but should avoid
directly mutating another module's ORM model. This keeps future extraction into
independent services realistic.

## Module Registration

Each module exposes its model packages and routers from `module.py`:

```python
from fastapi import APIRouter

from app.modules.order import router_admin, router_client

model_modules = ["app.modules.order.models"]
routers: list[APIRouter] = [router_admin.router, router_client.router]
```

Register the module once in `app/modules/registry.py`. `main.py` and
`core/database.py` read the registry, so feature modules do not need edits in
application bootstrap files.
