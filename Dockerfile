FROM node:22-alpine

WORKDIR /learn-easy
COPY ./package*.json ./
RUN npm install

COPY ./ ./
EXPOSE 3000
CMD ["npm", "start"]
