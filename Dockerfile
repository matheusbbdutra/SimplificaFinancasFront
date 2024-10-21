FROM node:20-alpine

RUN apk add --no-cache shadow

RUN groupadd -g 1001 appgroup && \
    useradd -u 1001 -g appgroup -m appuser

WORKDIR /app

COPY package*.json ./

RUN yarn install --force

COPY . .

RUN chown -R appuser:appgroup /app

USER appuser

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000

CMD ["yarn", "dev"]
