FROM node:20.10.0 as build

# Set working directory
WORKDIR /skalarly-frontend/src/app

COPY package.json package-lock.json* ./

# install dependencies
RUN npm install

# Copy rest of app code
COPY . .

FROM node:20.10.0

WORKDIR /skalarly-frontend/src/app

RUN npm install

COPY . .

EXPOSE 3000

ENV NODE_ENV production

# Start the app
CMD ["node", "server.js"]