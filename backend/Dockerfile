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