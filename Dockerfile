FROM node:20-alpine

RUN apk add --no-cache shadow

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g npm@10.9.0

COPY . .

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3001

CMD ["npm", "run", "dev"]
