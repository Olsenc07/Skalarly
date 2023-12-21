FROM node:20.10.0 as build-step

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:prod

# Serve stage
FROM node:20.10.0

# Install 'serve' to serve the app
RUN npm install -g serve

WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build-step /app/dist/skalarly .

# Heroku sets port dynamically via PORT environment variable
CMD serve -s . -l tcp://0.0.0.0:${PORT}
