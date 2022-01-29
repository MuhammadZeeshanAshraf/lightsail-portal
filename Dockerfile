FROM node:14

WORKDIR /Portal/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

# Define environment variable
ENV NODE_ENV=local-dev PORT=5000

CMD [ "npm", "run", "prod" ]