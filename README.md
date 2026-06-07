# FastAPI + Next.js 单仓库项目

这是一个 `FastAPI + Next.js + Docker Compose` 的单仓库项目骨架。后端使用 FastAPI、Tortoise ORM、PostgreSQL、Gunicorn/Uvicorn Worker；前端使用 Next.js、openapi-ts-fetch、pnpm、Turborepo。

## 📦 技术栈

| 模块 | 技术 | 说明 |
| --- | --- | --- |
| 前端 | Next.js 15 | 页面与 API 代理 |
| 前端请求 | openapi-ts-fetch | 基于 OpenAPI 类型的 Fetch 客户端，自动携带 token |
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
    scripts/init_db.py    # 初始化数据库结构与可选账号种子
  frontend/
    src/
      api/                # API 函数、生成类型、Fetch 客户端
      configs/            # 前端环境配置
      types/              # 通用类型
docker-compose.yml
package.json
pnpm-workspace.yaml
turbo.json
```

## ⚙️ 环境变量

复制模板并按实际环境修改。`POSTGRES_PASSWORD` 和 `JWT_SECRET_KEY` 不提供源码内默认值，必须在 `.env` 中设置。可选的管理员种子账号也只从 `.env` 读取，不在源码中提供默认账号或默认密码：

```powershell
Copy-Item .env.example .env
```

本地开发可以用初始化脚本创建 `.env` 并自动生成数据库密码和 JWT 密钥：

```powershell
.\scripts\init.ps1
```

| 变量 | 示例 | 说明 |
| --- | --- | --- |
| `POSTGRES_HOST` | `postgres` | PostgreSQL 地址；Docker 本地默认使用内置 PostgreSQL 服务 |
| `POSTGRES_PORT` | `5432` | 后端连接 PostgreSQL 的端口 |
| `POSTGRES_BIND_HOST` | `127.0.0.1` | 本地 PostgreSQL 映射到宿主机的绑定地址 |
| `POSTGRES_HOST_PORT` | `5432` | 本地 PostgreSQL 映射到宿主机的端口 |
| `POSTGRES_USER` | `solo_local` | 数据库用户名；必须通过环境变量提供 |
| `POSTGRES_PASSWORD` | 空 | 数据库密码；必须通过环境变量提供 |
| `POSTGRES_DB` | `solo_local` | 数据库名称；必须通过环境变量提供 |
| `JWT_SECRET_KEY` | 空 | token 签名密钥；必须通过环境变量提供，至少 32 个字符 |
| `ADMIN_USERNAME` | 空 | 可选管理员种子账号；与 `ADMIN_PASSWORD` 同时设置才会创建或更新 |
| `ADMIN_PASSWORD` | 空 | 可选管理员种子密码；与 `ADMIN_USERNAME` 同时设置才会创建或更新 |
| `ENABLE_SELF_REGISTRATION` | `false` | 后端自助注册开关；默认禁用 `/api/v1/auth/register` |
| `FRONTEND_PORT` | `3000` | 前端映射到宿主机的端口 |
| `BACKEND_PORT` | `8000` | 后端映射到宿主机的端口 |
| `BACKEND_BIND_HOST` | `127.0.0.1` | 后端默认只绑定本机，避免公网暴露 |
| `NEXT_PUBLIC_API_BASE_URL` | 空 | 空表示浏览器使用同源 `/api` |
| `NEXT_PUBLIC_ENABLE_SELF_REGISTRATION` | `false` | 前端自助注册 UI 开关；默认隐藏“创建本地账号” |
| `INTERNAL_API_BASE_URL` | `http://backend:8000` | Next.js 在 Docker 内部代理后端 |
| `NPM_REGISTRY` | `https://registry.npmmirror.com` | 前端依赖安装源 |

## 🚀 启动方式

### 一键启动

```powershell
cd D:\XiaoProject\Single
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
| OpenAPI JSON | http://localhost:8000/openapi.json |
| 健康检查 | http://localhost:8000/api/v1/health |

系统不会自动创建默认账号，也不会默认开放自助注册。需要预置管理员账号时，在 `.env` 中设置 `ADMIN_USERNAME` 和 `ADMIN_PASSWORD` 后启动；后端启动时会创建该账号，若账号已存在则更新密码并启用账号。两个变量都留空时不会创建任何账号，`ENABLE_SELF_REGISTRATION` 未显式开启时 `/api/v1/auth/register` 会返回禁用错误，登录页也不会显示“创建本地账号”。

本地开发如需临时创建账号，必须在 `.env` 中同时开启后端和前端开关，然后重新构建/启动服务：

```env
ENABLE_SELF_REGISTRATION=true
NEXT_PUBLIC_ENABLE_SELF_REGISTRATION=true
```

账号创建完成后，建议把两个开关改回 `false` 并重启服务。

### 数据库升级：`users.role`

2026-06-07 之前初始化过的数据库可能已经存在 `users` 表，但没有 `role` 列。Tortoise 的 `generate_schemas(safe=True)` 只会安全创建缺失的表，不会修改已有表结构，所以后端启动流程现在包含一个显式、幂等的升级步骤：

```sql
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" VARCHAR(32);
UPDATE "users" SET "role" = 'user' WHERE "role" IS NULL;
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user';
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;
```

升级会在后端连接数据库并完成安全建表之后、管理员账号种子逻辑之前执行。已有用户行会保留，缺失的 `role` 会回填为 `user`；如果 `.env` 中配置了 `ADMIN_USERNAME` 和 `ADMIN_PASSWORD`，管理员种子逻辑随后会把该账号的 `role` 设置为 `admin`。

已有环境升级步骤：

```powershell
docker compose pull
docker compose up --build -d backend
docker compose logs -f backend
```

建议在生产环境升级前备份 PostgreSQL 数据库。升级 SQL 可重复执行；新数据库会直接按当前模型创建 `role` 列，旧数据库会在首次启动新后端时补齐并回填。

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

前端构建会先从 FastAPI 导出 OpenAPI，并重新生成 `apps/frontend/src/api/generated/schema.ts`。

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
| `apps/frontend/src/api/client.ts` | openapi-ts-fetch 实例、token header 中间件 |
| `apps/frontend/src/api/generated/schema.ts` | 从 OpenAPI 自动生成的 TypeScript 类型 |
| `apps/frontend/src/api/types.ts` | 基于生成类型导出的业务别名 |
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

## 🧾 Swagger 与客户端生成

FastAPI 会在后端服务启动后暴露 Swagger UI 和 OpenAPI JSON：

```text
http://localhost:8000/docs
http://localhost:8000/openapi.json
```

新增或修改后端接口后，可以手动重新生成前端类型和 Fetch 客户端：

```powershell
.\.venv\Scripts\Activate.ps1
python -m pip install -r apps/backend/requirements.txt
pnpm api:generate
```

生成流程会先导出 `apps/frontend/src/api/generated/openapi.json`，再用 `openapi-typescript` 生成 `apps/frontend/src/api/generated/schema.ts`。`pnpm build --filter=next-frontend` 和 `pnpm dev --filter=next-frontend` 会自动执行这一步；`pnpm lint --filter=next-frontend` 会重新生成并通过 Git diff 验证生成文件已提交。业务代码通过 `openapi-ts-fetch` 调用接口，不再手写前后端重复 DTO。

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
  -Body '{"username":"<your-username>","password":"<your-password>"}'
```

默认注册接口应被禁用：

```powershell
Invoke-WebRequest -UseBasicParsing `
  -Method Post `
  -Uri http://localhost:3000/api/v1/auth/register `
  -ContentType "application/json" `
  -Body '{"username":"local-user","password":"local-password"}'
```

需要本地注册时，先在 `.env` 中设置 `ENABLE_SELF_REGISTRATION=true` 和 `NEXT_PUBLIC_ENABLE_SELF_REGISTRATION=true`，再重新构建/启动。
