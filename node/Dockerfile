FROM node:alpine

RUN apk add bash
WORKDIR /usr/src/app

COPY . .

RUN npm install
ENTRYPOINT [ "node", "index.js" ]