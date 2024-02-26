FROM node:20.11.1-alpine3.19 as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base as builder
WORKDIR /build
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./build.sh ./
COPY ./lib ./lib

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN chmod +x ./build.sh && ./build.sh
RUN pnpm prune --prod

FROM base as runner

COPY --from=builder /build/package.json /
COPY --from=builder /build/node_modules /node_modules
COPY --from=builder /build/build /build

ENTRYPOINT ["node", "/build/feature-name.mjs"]

