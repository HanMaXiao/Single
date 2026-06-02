import logging
import time
from datetime import UTC, datetime

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request


logger = logging.getLogger("app.request")


class RequestLogMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.perf_counter()
        request_time = datetime.now(UTC).isoformat()
        method = request.method
        path = request.url.path

        try:
            response = await call_next(request)
        except Exception:
            duration_ms = (time.perf_counter() - start_time) * 1000
            logger.exception(
                "[%s] %s %s failed duration=%.2fms",
                request_time,
                method,
                path,
                duration_ms,
            )
            raise

        duration_ms = (time.perf_counter() - start_time) * 1000
        logger.info(
            "[%s] %s %s status=%s duration=%.2fms",
            request_time,
            method,
            path,
            response.status_code,
            duration_ms,
        )
        return response
