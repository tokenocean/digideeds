FROM node:17-alpine3.13

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ENV NODE_OPTIONS --openssl-legacy-provider

RUN apk add git ffmpeg python3 build-base vips-dev
RUN npm i -g pnpm

WORKDIR /app
COPY package.json .

RUN chmod +x create-config.sh
RUN ./create-config.sh -c lPisyETZDe4KFXulqf0S

RUN pnpm install

COPY . .

CMD ["pnpm", "start"]
