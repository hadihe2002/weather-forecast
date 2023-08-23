FROM hub.hamdocker.ir/node:16 as builder
WORKDIR /app 
COPY package.json package-lock.json ./
RUN npm install 
COPY . .
EXPOSE 8000
CMD ["npm", "start"]