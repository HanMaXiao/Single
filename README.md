# FastAPI + Next.js 单仓库项目

这是一个 `FastAPI + Next.js + Vite` 的 pnpm monorepo 项目。后端使用 FastAPI、Tortoise ORM、PostgreSQL；Web 前端使用 Next.js 16；Admin 后台使用 React 19 + Vite + Tailwind CSS。

## 技术栈

| 模块 | 技术 | 说明 |
| --- | --- | --- |
| Web 前端 | Next.js 16 (App Router) | 面向 C 端的页面与 API 代理 |
| Admin 后台 | React 19 + Vite 5 + Tailwind CSS 3 | 运营管理后台 SPA |
| 包管理 | pnpm 11 + Turborepo | workspace 依赖安装与任务编排 |
| 共享类型 | packages/shared-types | TypeScript 类型 & API 客户端工厂 |
| 共享国际化 | packages/shared-i18n | i18next 多语言 (zh-CN / en-US) |
| 共享样式 | packages/tailwind-preset | Tailwind CSS 统一预设 |
| 后端 | FastAPI | RESTful API 服务 |
| ORM | Tortoise ORM | 数据库模型与表初始化 |
| 数据库 | PostgreSQL 16 | 主关系型数据库 |
| 缓存 | Redis 7 | 可选服务，默认不启动 |
| 容器 | Docker Compose | 一键构建与启动 |

## 目录结构

```text
apps/
  admin/                         # React + Vite 管理后台
    src/
      components/                # 通用 UI 组件 (Button, Card, Input, Header, Sidebar)
        ui/                      # Radix UI 封装组件
      layouts/                   # AdminLayout 布局
      lib/                       # api.ts (API 客户端), utils.ts
      pages/                     # 页面: Dashboard, Orders, Content, Finance, Devices...
      stores/                    # Zustand 状态管理
      test/                      # Vitest 测试
  backend/                       # Python FastAPI 后端
    app/
      api/v1/routers/            # identity 路由 (auth, health, users)
      configs/settings.py        # 统一配置 (Pydantic Settings)
      core/                      # 数据库连接、安全工具、admin 种子、数据库升级
      middleware/                 # auth token 中间件、请求日志
      modules/                   # 领域模块（独立路由、模型、服务、仓库）
        asset/                   # 资产管理
        catalog/                 # 商品/目录
        content/                 # 内容管理
        device/                  # 设备管理
        identity/                # 身份认证与权限 (User, Role, Permission)
        integration/             # 第三方集成
        operation/               # 运营管理
        order/                   # 订单管理
        payment/                 # 支付管理
        tenant/                  # 多租户 (Company, Merchant, Operator, Project)
      schemas/                   # 通用请求/响应 Schema
    scripts/                     # init_db.py, export_openapi.py
    tests/                       # 测试
  web/                           # Next.js 前端 (App Router)
    src/
      api/                       # API 函数 (auth, user) + openapi-ts-fetch 客户端
        generated/               # OpenAPI JSON + 自动生成的 TypeScript 类型
      app/                        # Next.js App Router 页面
        auth/session/            # 会话管理 API Route
        dashboard/               # 控制台页面
      auth/                      # 会话常量与验证逻辑
      configs/                   # 前端环境变量 (env.ts)
      types/                     # HTTP 错误类型
packages/
  shared-i18n/                   # 国际化包 (i18next + react-i18next)
  shared-types/                  # 共享类型 & API 客户端工厂
  tailwind-preset/               # Tailwind CSS 统一预设
scripts/
  init.ps1                       # 本地初始化脚本
  install.ps1                    # 依赖安装脚本
  run-python.mjs                 # Node.js 调 Python 脚本
docker-compose.yml
package.json                     # 根 workspace 配置
pnpm-workspace.yaml              # pnpm workspace 声明
turbo.json                       # Turborepo 任务配置
tsconfig.base.json               # 共享 TypeScript 基础配置
```

## 环境变量

复制模板并按实际环境修改：

```powershell
Copy-Item .env.example .env
```

本地开发可以用初始化脚本创建 `.env` 并自动生成数据库密码和 JWT 密钥：

```powershell
.\scripts\init.ps1
```

| 变量 | 示例 | 说明 |
| --- | --- | --- |
| `POSTGRES_HOST` | `localhost` | PostgreSQL 地址；本地开发用 `localhost`，Docker 内用 `postgres` |
| `POSTGRES_PORT` | `5432` | 后端连接 PostgreSQL 的端口 |
| `POSTGRES_BIND_HOST` | `127.0.0.1` | 本地 PostgreSQL 映射到宿主机的绑定地址 |
| `POSTGRES_HOST_PORT` | `5432` | 本地 PostgreSQL 映射到宿主机的端口 |
| `POSTGRES_USER` | `solo_local` | 数据库用户名 |
| `POSTGRES_PASSWORD` | 空 | 数据库密码 |
| `POSTGRES_DB` | `solo_local` | 数据库名称 |
| `JWT_SECRET_KEY` | 空 | token 签名密钥，至少 32 个字符 |
| `ADMIN_USERNAME` | 空 | 可选管理员种子账号 |
| `ADMIN_PASSWORD` | 空 | 可选管理员种子密码 |
| `ENABLE_SELF_REGISTRATION` | `false` | 后端自助注册开关 |
| `REDIS_HOST` | `localhost` | Redis 地址；本地开发用 `localhost` |
| `REDIS_PORT` | `6379` | Redis 端口 |
| `FRONTEND_PORT` | `3000` | 前端映射到宿主机的端口 |
| `BACKEND_PORT` | `8000` | 后端映射到宿主机的端口 |
| `BACKEND_BIND_HOST` | `127.0.0.1` | 后端默认只绑定本机 |
| `NEXT_PUBLIC_API_BASE_URL` | 空 | 空表示浏览器使用同源 `/api` |
| `NEXT_PUBLIC_ENABLE_SELF_REGISTRATION` | `false` | 前端自助注册 UI 开关 |
| `INTERNAL_API_BASE_URL` | `http://localhost:8001` | 本地开发时后端地址 |
| `NPM_REGISTRY` | `https://registry.npmmirror.com` | 前端依赖安装源 |

## 启动方式

### Docker 一键启动

```powershell
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

### 本地开发启动

本地开发时需要分别启动基础设施和三个应用：

**1. 启动 PostgreSQL + Redis（Docker）**

```powershell
docker compose up -d postgres
docker compose --profile cache up -d redis
```

**2. 启动后端 (FastAPI, port 8001)**

```powershell
cd apps/backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

**3. 安装前端依赖**

```powershell
corepack enable
pnpm install
pnpm approve-builds esbuild sharp
```

**4. 启动 Web 前端 (Next.js, port 3100)**

```powershell
cd apps/web
npx next dev --turbo --port 3100
```

**5. 启动 Admin 后台 (Vite, port 5174)**

```powershell
cd apps/admin
npx vite --port 5174
```

本地开发服务地址：

| 服务 | 地址 |
| --- | --- |
| Web 前端 | http://localhost:3100 |
| Admin 后台 | http://localhost:5174 |
| 后端 API | http://localhost:8001/docs |
| OpenAPI JSON | http://localhost:8001/openapi.json |
| 健康检查 | http://localhost:8001/api/v1/health |

### 账号创建

系统不会自动创建默认账号。需要预置管理员账号时，在 `.env` 中设置 `ADMIN_USERNAME` 和 `ADMIN_PASSWORD` 后启动；后端启动时会创建该账号，若账号已存在则更新密码并启用账号。

本地开发如需临时创建账号，在 `.env` 中同时开启后端和前端开关：

```env
ENABLE_SELF_REGISTRATION=true
NEXT_PUBLIC_ENABLE_SELF_REGISTRATION=true
```

账号创建完成后，建议把两个开关改回 `false` 并重启服务。

### 停止服务

```powershell
docker compose down
```

### 查看状态和日志

```powershell
docker compose ps
docker compose logs -f
```

## 数据库升级：`users.role`

2026-06-07 之前初始化过的数据库可能缺少 `role` 列。后端启动流程包含显式、幂等的升级步骤：

```sql
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" VARCHAR(32);
UPDATE "users" SET "role" = 'user' WHERE "role" IS NULL;
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user';
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;
```

升级 SQL 可重复执行；新数据库会直接按当前模型创建 `role` 列。

## 构建方式

### 本地前端构建

```powershell
pnpm build --filter=next-frontend
```

构建会自动从后端导出 OpenAPI，并重新生成 `apps/web/src/api/generated/schema.ts`。

Admin 构建：

```powershell
pnpm build --filter=@cultural-tourism/admin
```

## 前后端接口关系

```text
浏览器 -> http://localhost:3100/api/... -> Next.js rewrite -> http://localhost:8001/api/...
```

这样部署到服务器时，公网只需要暴露前端端口，后端端口可以只绑定服务器本机。

| 场景 | 配置 |
| --- | --- |
| 本地访问 Web | `http://localhost:3100` |
| 本地访问 Admin | `http://localhost:5174` |
| 后端只给本机调试 | `BACKEND_BIND_HOST=127.0.0.1` |
| 前端同源调用 API | `NEXT_PUBLIC_API_BASE_URL=` |
| Docker 内部代理后端 | `INTERNAL_API_BASE_URL=http://backend:8000` |

## 后端响应规范

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

需要鉴权的接口：

```python
@router.get("/me")
async def get_me(current_user: User = Depends(require_auth)):
    ...
```

## 前端请求规范

| 文件 | 说明 |
| --- | --- |
| `apps/web/src/api/client.ts` | openapi-ts-fetch 实例、token header 中间件 |
| `apps/web/src/api/generated/schema.ts` | 从 OpenAPI 自动生成的 TypeScript 类型 |
| `apps/web/src/api/generated/openapi.json` | 导出的 OpenAPI 规范文件 |
| `apps/web/src/api/auth.ts` | 登录、注册接口 |
| `apps/web/src/api/user.ts` | 用户接口 |
| `apps/web/src/api/types.ts` | 基于生成类型导出的业务别名 |

## Swagger 与客户端生成

FastAPI 后端启动后暴露 Swagger UI 和 OpenAPI JSON：

```text
http://localhost:8001/docs
http://localhost:8001/openapi.json
```

新增或修改后端接口后，可以手动重新生成前端类型和 Fetch 客户端：

```powershell
pnpm api:generate
```

生成流程会先导出 `apps/web/src/api/generated/openapi.json`，再用 `openapi-typescript` 生成 `apps/web/src/api/generated/schema.ts`。

## Redis 说明

Redis 当前是可选服务，默认不会启动。如果需要 Redis 容器：

```powershell
docker compose --profile cache up -d redis
```

并把 `.env` 中的 `REDIS_HOST` 改为 `redis`（Docker 内）或 `localhost`（宿主机已有 Redis）。

## 服务器部署流程

### 1. 准备服务器

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

如果服务器端口被占用，修改 `.env`：

```env
FRONTEND_PORT=8080
BACKEND_PORT=8081
```

然后重启：

```bash
docker compose down
docker compose up --build -d
```

### 5. 域名部署建议

生产环境推荐使用 Nginx 暴露 `80/443`，反向代理到前端容器端口：

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

## 常见问题

| 问题 | 处理方式 |
| --- | --- |
| 前端能打开，接口不通 | 查看 `docker compose logs -f backend` |
| `/api` 代理 500 | 确认 `INTERNAL_API_BASE_URL` 配置正确 |
| Docker 拉镜像失败 | 检查 Docker Desktop 镜像源配置 |
| 登录接口 bcrypt 报错 | 确认 `requirements.txt` 中有 `bcrypt==4.0.1` |
| 端口被占用 | 修改 `.env` 中的端口配置 |
| pnpm 依赖安装报错 | 运行 `pnpm install`；如需原生构建，执行 `pnpm approve-builds esbuild sharp` |
| `node_modules` 损坏 | 删除 `node_modules` 和 `pnpm-lock.yaml`，重新 `pnpm install` |

## 快速验证

后端健康检查：

```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:8001/api/v1/health
```

前端代理健康检查：

```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:3100/api/v1/health
```

登录接口：

```powershell
Invoke-WebRequest -UseBasicParsing `
  -Method Post `
  -Uri http://localhost:3100/api/v1/auth/login `
  -ContentType "application/json" `
  -Body '{"username":"<your-username>","password":"<your-password>"}'
```
