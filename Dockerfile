FROM node:17

WORKDIR "/opt/RTIRLAPIRelay/"
COPY package*.json ./

RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libpangocairo-1.0-0 \
    libxss1 \
    libgbm1 \
    libgtk-3-0 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN npm install

COPY . .

EXPOSE 18209
CMD [ "npm", "start" ]
