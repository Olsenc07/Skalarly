FROM node:20.10.0 as build-step

WORKDIR /app

COPY package*.json  ./

RUN npm install

COPY . .

RUN npm run build:prod

# Serve stage
FROM node:20.10.0
RUN npm install -g serve
WORKDIR /app
COPY --from=build-step /app/dist/skalarly /app
CMD ["serve", "-p", "80", "-s", "."]
