# Admin 后台 - 运营管理

技术栈(对齐 `docs/景区AI眼镜业务系统排期计划.md`):

| 维度 | 选型 |
|---|---|
| 框架 | React 18 + TypeScript strict |
| 构建 | Vite 5 |
| 样式 | TailwindCSS + shared preset |
| 组件库 | shadcn/ui (Radix UI + Tailwind) |
| 状态 | Zustand (本地) + TanStack Query (服务端) |
| 路由 | React Router 6 |
| API | openapi-fetch + @cultural-tourism/shared-types |
| i18n | i18next + @cultural-tourism/shared-i18n |
| 测试 | Vitest + Testing Library |
| Lint/Format | Biome (根目录共享配置) |

## 开发命令

```bash
# 安装依赖(在 monorepo 根目录)
pnpm install

# 启动 dev server (端口 5174)
pnpm --filter @cultural-tourism/admin dev

# 类型检查
pnpm --filter @cultural-tourism/admin typecheck

# Lint
pnpm --filter @cultural-tourism/admin lint

# Lint + 自动修复
pnpm --filter @cultural-tourism/admin lint:fix

# 单元测试
pnpm --filter @cultural-tourism/admin test

# 测试覆盖率
pnpm --filter @cultural-tourism/admin test:coverage

# 生产构建
pnpm --filter @cultural-tourism/admin build

# 预览生产构建
pnpm --filter @cultural-tourism/admin preview
```

## 目录结构

```
apps/admin/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui 组件 (Button / Card / Input)
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/               # 页面级组件
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Attractions.tsx
│   │   ├── Orders.tsx
│   │   ├── Devices.tsx
│   │   ├── Content.tsx
│   │   ├── Finance.tsx
│   │   └── Settings.tsx
│   ├── layouts/
│   │   └── AdminLayout.tsx
│   ├── stores/
│   │   └── admin.ts         # Zustand store
│   ├── lib/
│   │   ├── api.ts           # API 客户端
│   │   └── utils.ts
│   ├── test/
│   │   ├── setup.ts
│   │   └── utils.test.ts
│   ├── router.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.ts
├── postcss.config.cjs
├── tsconfig.json
└── package.json
```

## 与 FastAPI 后端集成

后端 OpenAPI schema 自动生成:

```bash
# 1. 启动后端服务
cd apps/backend && uvicorn app.main:app --reload --port 8000

# 2. 在另一个终端,导出 OpenAPI 并生成 TS 类型
pnpm --filter @cultural-tourism/shared-types generate

# 3. 类型自动同步到 @cultural-tourism/shared-types/schema
# 4. admin 通过 apiClient 调用,类型完全一致
```

## 业务模块扩展点

按 `docs/景区AI眼镜业务系统排期计划.md`:

| 阶段 | 周次 | 模块 | 文件位置 |
|---|---|---|---|
| W3 | 核销与绑定 | 扫码核销 | `src/pages/Orders.tsx` |
| W4 | 管理平台 | 景区/景点/语料 CRUD | `src/pages/Attractions.tsx`, `Content.tsx` |
| W4 | 管理平台 | 设备资产管理 | `src/pages/Devices.tsx` |
| W4 | 管理平台 | 财务统计 | `src/pages/Finance.tsx` |
| W5 | UI 联调 | 全局样式替换 | `tailwind.config.ts` |

## 微信支付接入预留

admin 后台需要:
- 查看订单支付状态 (后端回调已写入)
- 手动退款审批 (调用微信退款 API)
- 对账报表

预留位置:`src/pages/Orders.tsx` + `src/lib/payment.ts` (待建)