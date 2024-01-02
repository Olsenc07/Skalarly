FROM node:20.10.0 as build

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

#Build Angular App
RUN npm install

COPY . .

# Install serve or a similar package for serving static files
RUN npm run build

FROM node:20.10.0

WORKDIR /usr/src/app

RUN npm install -g serve

COPY --from=build /usr/src/app/dist/skalarly-frontend /usr/src/app/dist

EXPOSE 4200

ENV NODE_ENV production

# Start the server
CMD ["serve", "-s", "dist", "-p", "4200"]