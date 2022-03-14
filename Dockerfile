FROM node:15.4

WORKDIR /app
COPY package.json .
RUN yarn config set ignore-engines true
RUN yarn install

COPY . .

CMD yarn start:dev
