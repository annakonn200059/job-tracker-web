FROM node:24-alpine AS base
RUN apk add --no-cache libc6-compat
ENV NEXT_TELEMETRY_DISABLED=1

# ─── Stage 1: dependencies ───
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json turbo.json ./
COPY apps/landing/package.json ./apps/landing/
COPY packages/ui/package.json ./packages/ui/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

RUN npm ci

# ─── Stage 2: build ───
FROM base AS builder
WORKDIR /app

# Entire /app, not just root node_modules: when versions conflict, npm
# installs them into nested workspace node_modules, which would be lost.
COPY --from=deps /app ./
COPY . .

RUN npx turbo run build --filter=landing...

# ─── Stage 3: runtime ───
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN apk add --no-cache tini && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nextjs && \
    rm -rf /usr/local/lib/node_modules /usr/local/include \
           /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack

COPY --from=builder --chown=nextjs:nodejs /app/apps/landing/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/landing/.next/static ./apps/landing/.next/static

# outputFileTracingExcludes (next.config.mjs) is silently ignored by Turbopack
# builds as of Next 16.1.6, so typescript and unused sharp binaries still end
# up in the standalone bundle. Strip them here instead.
RUN rm -rf ./node_modules/typescript && \
    find ./node_modules/@img -maxdepth 1 -type d \( -name 'sharp-libvips-linux-*' -o -name 'sharp-linux-*' \) ! -name '*musl*' -exec rm -rf {} +

USER nextjs
EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "apps/landing/server.js"]