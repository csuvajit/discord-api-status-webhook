FROM node:18-alpine as build

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm i

COPY --chown=node:node . .

RUN npm run build

USER node

# ------ PRODUCTION BUILD ------
FROM node:18-alpine

WORKDIR /app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=build /app ./

RUN npm i --omit=dev

ENV NODE_ENV production

CMD [ "node", "index.js" ]
