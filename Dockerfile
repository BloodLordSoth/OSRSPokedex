FROM node:22-bullseye
WORKDIR /app
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    ca-certificates \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 4000
CMD ["node", "server.js"]
