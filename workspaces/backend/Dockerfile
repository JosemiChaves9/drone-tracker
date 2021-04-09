FROM node:current-alpine3.10

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.ts ./

COPY src node/home/app

RUN npm install
RUN npm run build

EXPOSE $PORT

CMD ["nodemon ./src/index.ts"]