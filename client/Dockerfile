FROM node:20 AS builder

WORKDIR /app
# WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install --production=false
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]

# FROM node:20-slim AS runner

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install --production && npm install vite

# COPY --from=builder /usr/src/app/dist ./dist

# EXPOSE 4173

# CMD ["npm", "run", "preview"]