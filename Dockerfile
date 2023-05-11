FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY listener.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm run start:dev", "npm run listen"]