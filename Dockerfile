# Juicy: Next.js 15, served from its standalone build.
#
# Build from this folder. The site reads no environment variables, so there
# are no build arguments:
#   docker build -t juicy .
#   docker run -p 3000:3000 juicy
#
# Then open http://localhost:3000. If port 3000 is taken on your machine,
# change the left number only: docker run -p 3041:3000 juicy

FROM node:24-alpine AS base
WORKDIR /app
ENV YARN_ENABLE_IMMUTABLE_INSTALLS=false \
    COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    NEXT_TELEMETRY_DISABLED=1
RUN corepack enable

FROM base AS deps
# sharp, which next/image uses, resolves to the platform it is installed on.
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install

FROM base AS build
ENV BUILD_STANDALONE=true \
    NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM base AS runtime
ENV NODE_ENV=production
RUN apk add --no-cache libc6-compat
# The standalone bundle carries its own server and only the files it traced.
# It serves public/ (the 3D models and images) and .next/static only when both
# sit beside it.
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
# next/image writes its optimised copies into .next/cache, which needs a tree
# the unprivileged user owns.
USER node
# HOSTNAME too: a server bound to localhost inside a container is unreachable
# from outside it.
ENV PORT=3000 \
    HOSTNAME=0.0.0.0
EXPOSE 3000
CMD ["node", "server.js"]
