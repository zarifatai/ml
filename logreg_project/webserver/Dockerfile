FROM node:19-slim

WORKDIR /usr/src/app

COPY package*.json ./
ENV MODEL_API_IP=modelapi:8080

RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["node", "./bin/www"]