FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-slim AS runner

WORKDIR /app

COPY package*.json ./
RUN npm install --production
RUN npm install vite --save

COPY --from=builder /app/dist ./dist

EXPOSE 4173

CMD ["npm", "run", "preview"]