FROM node:22-alpine AS deps
WORKDIR /repo
ARG NPM_REGISTRY=https://registry.npmmirror.com
ENV COREPACK_NPM_REGISTRY=${NPM_REGISTRY}
RUN corepack enable
RUN npm config set registry ${NPM_REGISTRY} && corepack prepare pnpm@9.15.4 --activate
COPY package.json pnpm-workspace.yaml turbo.json .npmrc ./
COPY apps/frontend/package.json ./apps/frontend/
RUN pnpm install --no-frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /repo
ARG NPM_REGISTRY=https://registry.npmmirror.com
ENV COREPACK_NPM_REGISTRY=${NPM_REGISTRY}
RUN corepack enable
RUN npm config set registry ${NPM_REGISTRY} && corepack prepare pnpm@9.15.4 --activate
ARG NEXT_PUBLIC_API_BASE_URL=
ARG NEXT_PUBLIC_ENABLE_SELF_REGISTRATION=false
ARG INTERNAL_API_BASE_URL=http://backend:8000
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_ENABLE_SELF_REGISTRATION=${NEXT_PUBLIC_ENABLE_SELF_REGISTRATION}
ENV INTERNAL_API_BASE_URL=${INTERNAL_API_BASE_URL}
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache python3 py3-pip
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/apps/frontend/node_modules ./apps/frontend/node_modules
COPY --from=deps /repo/pnpm-lock.yaml ./pnpm-lock.yaml
COPY package.json pnpm-workspace.yaml turbo.json .npmrc ./
COPY scripts ./scripts
COPY apps/backend/requirements.txt ./apps/backend/requirements.txt
RUN python3 -m pip install --break-system-packages -r apps/backend/requirements.txt
COPY apps/backend ./apps/backend
COPY apps/frontend ./apps/frontend
RUN pnpm turbo run build --filter=next-frontend

FROM node:22-alpine AS runner
WORKDIR /repo
ARG NEXT_PUBLIC_API_BASE_URL=
ARG NEXT_PUBLIC_ENABLE_SELF_REGISTRATION=false
ARG INTERNAL_API_BASE_URL=http://backend:8000
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_ENABLE_SELF_REGISTRATION=${NEXT_PUBLIC_ENABLE_SELF_REGISTRATION}
ENV INTERNAL_API_BASE_URL=${INTERNAL_API_BASE_URL}
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3100

COPY --from=builder /repo/apps/frontend/.next/standalone ./
COPY --from=builder /repo/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder /repo/apps/frontend/public ./apps/frontend/public

EXPOSE 3100

CMD ["node", "apps/frontend/server.js"]
