FROM node:20.10.0 as build-step

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build:prod

# Final stage
FROM node:20.10.0

WORKDIR /app

# Copy built Angular app
COPY --from=build-step /app/dist/skalarly /app/dist/skalarly

CMD ["node", "server.js"]
