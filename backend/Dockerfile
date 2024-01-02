FROM node:20.10.0 as build

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

# Serve the app using a lightweight Node.js server (like serve)
FROM node:20.10.0

WORKDIR /usr/src/app

# Install serve or a similar package for serving static files
RUN npm install -g serve

# Copy build artifacts from the previous stage
COPY --from=build /usr/src/app/dist/skalarly-frontend /usr/src/app/dist

EXPOSE 4200

ENV NODE_ENV production

# Start the server
CMD ["serve", "-s", "dist", "-p", "4200"]