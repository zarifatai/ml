FROM node:19-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["node", "./bin/www"]