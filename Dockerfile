FROM node:26-alpine

ENV PORT=8000
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --chown=node:node package.json pnpm-*.yaml ./
RUN --mount=type=cache,target=/root/.npm npm install -g corepack \
    && corepack enable
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --prod --frozen-lockfile --store-dir /pnpm/store

COPY --chown=node:node . .

USER node
EXPOSE 8000
CMD ["--import", "remix/node-tsx", "server.ts"]
