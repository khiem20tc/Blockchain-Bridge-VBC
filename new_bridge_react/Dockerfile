# Containerize Build
FROM node:18-alpine
WORKDIR /src
RUN npm install -g serve
COPY build /src/build
COPY package.json package-lock.json /src/
CMD ["npx", "serve", "-s", "build/", "-l", "3006"]
EXPOSE 3006

#docker run --env SERVER_LINK=http://20.24.190.187:3001 -dp 3006:3006 khangluong2004/new-bridge-react:latest

#Containerize App
# FROM node:18-alpine
# WORKDIR /src
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# CMD ["npm", "start"]
# EXPOSE 3006