FROM hub.hamdocker.ir/node:16 as builder
WORKDIR /app 
COPY package.json package-lock.json ./
RUN npm install --production

COPY . .
EXPOSE 80
CMD ["npm", "start"]