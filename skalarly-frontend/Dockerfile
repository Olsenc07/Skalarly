# Build stage
FROM node:20.10.0 as build-step

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the SSR application
RUN npm run build:ssr

# Serve stage
FROM node:20.10.0

WORKDIR /app

# Copy the client build output
COPY --from=build-step /app/dist/skalarly-frontend/browser /app/dist/browser

# Copy the build output and node modules from the previous stage
COPY --from=build-step /app/dist/skalarly-frontend/server /app/dist/server
COPY --from=build-step /app/node_modules /app/node_modules

# Heroku sets port dynamically via PORT environment variable
ENV PORT=3000

# Expose the port the app runs on
EXPOSE $PORT

# Start the server with SSR
CMD ["node", "dist/skalarly-frontend/main.js"] 
