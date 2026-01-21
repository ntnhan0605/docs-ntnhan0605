FROM node:22.20-alpine AS base

COPY ./package-lock.json /app/package-lock.json
COPY ./package.json /app/package.json

WORKDIR /app

RUN npm install

FROM node:22.20-alpine AS runner
EXPOSE 3000
COPY --from=base /app/node_modules/ /app/node_modules/
COPY --from=base /app/package.json /app/package.json
COPY ./ /app

WORKDIR /app

RUN npm run build

CMD [ "npm" , "start" ]