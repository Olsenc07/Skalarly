# Build stage
FROM node:20.10.0 as build-step

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build:ssr

# Serve stage
FROM node:20.10.0

WORKDIR /app

# Copy the SSR build output
COPY --from=build-step /app/dist/server /app/dist/server

# Copy the client build output
COPY --from=build-step /app/dist/skalarly-frontend /app/dist/skalarly-frontend

# Copy production node_modules necessary for SSR
COPY --from=build-step /app/node_modules /app/node_modules

# Heroku sets port dynamically via PORT environment variable
ENV PORT=4200

# Expose the port the app runs on
EXPOSE $PORT

# Start the server with SSR
CMD ["node", "dist/server/main.js"]

#Backend
FROM node:20.10.0 as build

# Set working directory
# WORKDIR /usr/src/app
WORKDIR /app


COPY package.json package-lock.json* ./

# install dependencies
RUN npm install

# Copy rest of app code
COPY . .

FROM node:20.10.0

# WORKDIR /usr/src/app
WORKDIR /app


# Copy the built app and node_modules from the previous stage
# COPY --from=build /usr/src/app .
COPY --from=build /app .


EXPOSE 3000

ENV NODE_ENV production

# Start the app
CMD ["node", "server.js"]