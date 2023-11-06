FROM node:alpine

RUN apk add bash

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

ENTRYPOINT [ "node", "index.js" ]