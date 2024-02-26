FROM node:20.11.1-alpine3.19 as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY ./package.json /
COPY ./pnpm-lock.yaml /
COPY ./lib /lib

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod

ENTRYPOINT ["node", "/lib/feature-name.mjs"]

