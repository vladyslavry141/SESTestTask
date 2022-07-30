FROM node:16-alpine

WORKDIR /usr/
COPY . /usr/

RUN npm ci --production

CMD ["npm", "start"]
EXPOSE 3000