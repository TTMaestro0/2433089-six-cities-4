FROM node:18

EXPOSE 8000

WORKDIR /app

RUN apt-get update \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

CMD ["node", "dist/main.rest.js"]
