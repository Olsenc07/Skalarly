# Build stage
FROM node:20.10.0 as build-step

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:ssr

# Serve stage
FROM node:20.10.0

WORKDIR /app

# Copy the build output
COPY --from=build-step /app/dist /app/dist

# Copy production node_modules necessary for SSR
COPY --from=build-step /app/node_modules /app/node_modules

# Heroku sets port dynamically via PORT environment variable
ENV PORT=3000

# Expose the port the app runs on
EXPOSE $PORT

# Start the server with SSR
CMD ["node", "dist/server/main.js"]
