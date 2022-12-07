FROM node:18-alpine
WORKDIR /src
COPY package-lock.json package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 3006