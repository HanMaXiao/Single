# FastAPI + Next.js 单仓库项目

这是一个 `FastAPI + Next.js + Docker Compose` 的单仓库项目骨架。后端使用 FastAPI、Tortoise ORM、PostgreSQL、Gunicorn/Uvicorn Worker；前端使用 Next.js、axios、pnpm、Turborepo。

## 📦 技术栈

| 模块 | 技术 | 说明 |
| --- | --- | --- |
| 前端 | Next.js 15 | 页面与 API 代理 |
| 前端请求 | axios | 统一封装 HTTP 请求，自动携带 token |
| 前端包管理 | pnpm | workspace 依赖安装 |
| 构建工具 | Turborepo | 单仓库任务编排与缓存 |
| 后端 | FastAPI | RESTful API 服务 |
| 后端运行 | Gunicorn + Uvicorn Worker | 生产环境进程管理与 ASGI 服务 |
| ORM | Tortoise ORM | 数据库模型与表初始化 |
| 数据库 | PostgreSQL | 主关系型数据库 |
| 缓存 | Redis | 可选服务，默认不启动 |
| 容器 | Docker Compose | 一键构建与启动 |

## 🗂️ 目录结构

```text
apps/
  backend/
    app/
      api/v1/routers/     # RESTful 路由
      configs/settings.py # 统一配置
      core/               # 数据库、安全工具
      middleware/auth.py  # token 中间件与鉴权依赖
      models/             # Tortoise ORM 模型
      schemas/            # 请求与响应结构
    scripts/init_db.py    # 初始化数据库和默认账号
  frontend/
    src/
      api/                # API 函数、请求参数、响应类型
      configs/            # 前端环境配置
      lib/http.ts         # axios 全局封装
      types/              # 通用类型
docker-compose.yml
package.json
pnpm-workspace.yaml
turbo.json
```

## ⚙️ 环境变量

复制模板并按实际环境修改：

```powershell
Copy-Item .env.example .env
```

| 变量 | 示例 | 说明 |
| --- | --- | --- |
| `POSTGRES_HOST` | `8.218.40.52` | PostgreSQL 地址 |
| `POSTGRES_PORT` | `5432` | PostgreSQL 端口 |
| `POSTGRES_USER` | `solo` | 数据库用户名 |
| `POSTGRES_PASSWORD` | `******` | 数据库密码 |
| `POSTGRES_DB` | `solo_db` | 数据库名称 |
| `FRONTEND_PORT` | `3000` | 前端映射到宿主机的端口 |
| `BACKEND_PORT` | `8000` | 后端映射到宿主机的端口 |
| `BACKEND_BIND_HOST` | `127.0.0.1` | 后端默认只绑定本机，避免公网暴露 |
| `NEXT_PUBLIC_API_BASE_URL` | 空 | 空表示浏览器使用同源 `/api` |
| `INTERNAL_API_BASE_URL` | `http://backend:8000` | Next.js 在 Docker 内部代理后端 |
| `NPM_REGISTRY` | `https://registry.npmmirror.com` | 前端依赖安装源 |

## 🚀 启动方式

### 一键启动

```powershell
cd D:\project\demo\solo
docker compose up --build
```

后台启动：

```powershell
docker compose up --build -d
```

启动后访问：

| 服务 | 地址 |
| --- | --- |
| 前端页面 | http://localhost:3000 |
| 后端文档 | http://localhost:8000/docs |
| 健康检查 | http://localhost:8000/api/v1/health |

默认账号：

```text
admin / admin123
```

### 停止服务

```powershell
docker compose down
```

### 查看状态和日志

```powershell
docker compose ps
docker compose logs -f
```

只看后端日志：

```powershell
docker compose logs -f backend
```

只看前端日志：

```powershell
docker compose logs -f frontend
```

## 🧱 构建方式

### Docker 构建

构建全部服务：

```powershell
docker compose build
```

只构建前端：

```powershell
docker compose build frontend
```

只构建后端：

```powershell
docker compose build backend
```

### 本地前端构建

```powershell
corepack enable
pnpm install
pnpm build --filter=next-frontend
```

本地前端开发：

```powershell
pnpm dev --filter=next-frontend
```

## 🌐 前后端接口关系

前端浏览器不会直接写死请求 `localhost:8000`。当前设计是：

```text
浏览器 -> http://localhost:3000/api/... -> Next.js rewrite -> http://backend:8000/api/...
```

这样部署到服务器时，公网只需要暴露前端端口，后端端口可以只绑定服务器本机。

| 场景 | 配置 |
| --- | --- |
| 本地访问前端 | `FRONTEND_PORT=3000` |
| 后端只给本机调试 | `BACKEND_BIND_HOST=127.0.0.1` |
| 前端同源调用 API | `NEXT_PUBLIC_API_BASE_URL=` |
| Docker 内部代理后端 | `INTERNAL_API_BASE_URL=http://backend:8000` |

## 🛡️ 后端响应规范

正常响应：

```json
{
  "code": 0,
  "data": {},
  "msg": "ok"
}
```

业务异常：

```python
raise HTTPException(status_code=400, detail="错误信息")
```

token 无效或过期：

```python
raise HTTPException(status_code=401, detail="Invalid or expired token")
```

需要鉴权的接口：

```python
@router.get("/me")
async def get_me(current_user: User = Depends(require_auth)):
    ...
```

## 🔐 前端请求规范

| 文件 | 说明 |
| --- | --- |
| `apps/frontend/src/lib/http.ts` | axios 实例、token header、响应拦截 |
| `apps/frontend/src/api/types.ts` | 请求参数与响应类型 |
| `apps/frontend/src/api/auth.ts` | 登录、注册接口 |
| `apps/frontend/src/api/user.ts` | 用户接口 |

页面调用接口使用：

```ts
try {
  const response = await login({ username, password });
} catch (error) {
  setMessage(getHttpErrorMessage(error));
}
```

## 🧩 Redis 说明

Redis 当前是可选服务，默认不会启动，也不会影响后端主进程。

默认启动服务：

```powershell
docker compose config --services
```

输出：

```text
backend
frontend
```

如果以后需要 Redis 容器：

```powershell
docker compose --profile cache up -d redis
```

并把 `.env` 改成：

```env
REDIS_HOST=redis
```

如果宿主机本地已经有 Redis，可以保持：

```env
REDIS_HOST=host.docker.internal
REDIS_BIND_HOST=127.0.0.1
REDIS_PORT=6379
```

## 🖥️ 服务器部署流程

### 1. 准备服务器

服务器需要安装：

| 工具 | 用途 |
| --- | --- |
| Docker | 运行容器 |
| Docker Compose | 编排服务 |
| Git | 拉取代码 |
| Nginx | 可选，用于域名和 HTTPS |

### 2. 拉取代码

```bash
git clone <your-repo-url>
cd solo
cp .env.example .env
```

编辑 `.env`，填写服务器环境的数据库、端口、密钥。

### 3. 启动服务

```bash
docker compose up --build -d
```

### 4. 配置端口

如果服务器 `3000` 被占用，修改：

```env
FRONTEND_PORT=8080
```

然后重启：

```bash
docker compose down
docker compose up --build -d
```

访问：

```text
http://服务器IP:8080
```

### 5. 域名部署建议

生产环境推荐使用 Nginx 暴露 `80/443`，反向代理到前端容器端口。

示例：

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

后端 `8000` 不需要公网开放，因为前端会通过 Docker 内部地址代理到后端。

## 🧯 常见问题

| 问题 | 处理方式 |
| --- | --- |
| 前端能打开，接口不通 | 查看 `docker compose logs -f backend` |
| `/api` 代理 500 | 确认前端已重新构建，`INTERNAL_API_BASE_URL=http://backend:8000` |
| Docker 拉镜像失败 | 检查 Docker Desktop 镜像源配置 |
| 登录接口 bcrypt 报错 | 确认 `requirements.txt` 中有 `bcrypt==4.0.1` 并重建后端 |
| 端口被占用 | 修改 `.env` 中的 `FRONTEND_PORT` 或 `BACKEND_PORT` |

## 🧪 快速验证

后端健康检查：

```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:8000/api/v1/health
```

前端代理健康检查：

```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:3000/api/v1/health
```

登录接口：

```powershell
Invoke-WebRequest -UseBasicParsing `
  -Method Post `
  -Uri http://localhost:3000/api/v1/auth/login `
  -ContentType "application/json" `
  -Body '{"username":"admin","password":"admin123"}'
```
