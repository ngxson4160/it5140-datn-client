FROM node:18-alpine  as builder

WORKDIR /usr/src/nuxt-app

COPY . .

RUN yarn install

RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3002

ENTRYPOINT ["node", ".output/server/index.mjs"]