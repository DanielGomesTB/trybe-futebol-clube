FROM node:16.14-alpine
WORKDIR /app-backend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
ENTRYPOINT [ "npm", "start", "dev" ]
#Estava dando problema e achei a solução no PR do Lauro Pereira