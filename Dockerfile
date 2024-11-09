FROM node:20-alpine

RUN apk add --no-cache shadow

RUN groupadd -g 1001 appgroup && \
    useradd -u 1001 -g appgroup -m appuser

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g npm@10.9.0

COPY . .

RUN chown -R appuser:appgroup /app

USER appuser

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000

CMD ["npm", "run", "dev"]
