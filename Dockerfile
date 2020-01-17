FROM node:alpine AS builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

RUN yarn run build

FROM steebchen/nginx-spa:stable
WORKDIR /app
COPY --from=builder /app/dist .

EXPOSE 80
CMD ["nginx"]
