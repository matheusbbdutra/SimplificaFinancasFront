FROM node:21-alpine

WORKDIR /app

RUN npm install -g yarn --force

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]
