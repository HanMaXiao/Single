import json
import sys
from pathlib import Path
from typing import Any


BACKEND_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = BACKEND_ROOT.parents[1]
OPENAPI_OUTPUT = REPO_ROOT / "apps" / "frontend" / "src" / "api" / "generated" / "openapi.json"

sys.path.insert(0, str(BACKEND_ROOT))

from app.main import app  # noqa: E402


def get_openapi_schema() -> dict[str, Any]:
    return app.openapi()


def export_openapi_schema(output_path: Path = OPENAPI_OUTPUT) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(get_openapi_schema(), ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    return output_path


def main() -> int:
    output_path = export_openapi_schema()
    print(f"OpenAPI schema exported to {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
