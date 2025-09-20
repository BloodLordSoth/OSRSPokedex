FROM node:22-bullseye

# Create app dir
WORKDIR /app

# Install Chromium + fonts for Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    ca-certificates \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Copy package files and install deps
COPY package*.json ./
RUN npm install --only=production

# Copy app code
COPY . .

# Expose app port
EXPOSE 4000

# Run app
CMD ["node", "server.js"]
