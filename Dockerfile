# syntax=docker/dockerfile:1

ARG NODE_VERSION=20-alpine

FROM node:${NODE_VERSION} AS base
WORKDIR /app
EXPOSE 3000

# Устанавливаем переменные окружения для оптимизации
ENV NODE_OPTIONS="--max-old-space-size=512"
ENV NITRO_PRESET=node-server

FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm
# Ограничиваем количество параллельных процессов
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --frozen-lockfile --fetch-timeout=300000

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm
# Ограничиваем память для сборки
ENV NODE_OPTIONS="--max-old-space-size=512"
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
# Ограничиваем память для runtime
ENV NODE_OPTIONS="--max-old-space-size=256"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output
COPY --from=builder --chown=nuxtjs:nodejs /app/package.json ./package.json

USER nuxtjs

CMD ["node", ".output/server/index.mjs"] 