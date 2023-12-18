FROM node:20.10.0 as build-step

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build:prod

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/skalarly /usr/share/nginx/html

EXPOSE 80
