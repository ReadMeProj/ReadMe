FROM node

WORKDIR /app

COPY ["./dashboard/package.json", "./dashboard/package-lock.json", "./"]

RUN npm install --production

COPY ./dashboard/ .

CMD ["npm", "start"]