FROM node:14-alpine

WORKDIR /home/node/app

COPY package* ./
COPY tsconfig* ./

COPY ./src /home/node/app/

RUN npm install
RUN npm run build

EXPOSE $PORT

CMD ["node", "./dist/index.js"]
