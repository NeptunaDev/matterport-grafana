FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production=false

COPY . .

RUN npm run build

FROM node:20-slim AS runner

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8000

CMD ["npm", "run", "start:prod"]
