# Build stage
FROM node:20.10.0 as build-step

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:prod

# Debugging: List build output
RUN ls -la dist/skalarly

# Serve stage
FROM node:20.10.0

# Install 'serve' to serve the app
RUN npm install -g serve

WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build-step /dist/skalarly .

# Heroku sets the port dynamically via the PORT environment variable
CMD ["serve", "-s", ".", "-l", "tcp://0.0.0.0:${PORT:-4200}"]
