FROM node:20.10.0

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4200

ENV NODE_ENV production

CMD ["node", "server.js"]
