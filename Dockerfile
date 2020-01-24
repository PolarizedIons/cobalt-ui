FROM node:alpine AS builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

ENV VUE_APP_API_DOMAIN api.cobalt.polarizedions.net

RUN yarn run build

FROM steebchen/nginx-spa:stable
WORKDIR /app
COPY --from=builder /app/dist .

EXPOSE 80
CMD ["nginx"]
