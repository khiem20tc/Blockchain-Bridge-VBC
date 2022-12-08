FROM node:18-alpine
WORKDIR /src
RUN npm install -g serve
COPY build /src/build
COPY package.json package-lock.json /src/
CMD ["npx", "serve", "-s", "build/", "-l", "3006"]
EXPOSE 3006