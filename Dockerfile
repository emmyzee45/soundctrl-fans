FROM node:20-alpine3.18

ARG MAX_OLD_SPACE_SIZE=2048

ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/app/node_modules/.bin

WORKDIR /app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 1000000 --silent
COPY . ./
RUN ["yarn", "start"]
