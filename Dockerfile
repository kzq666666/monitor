FROM node:latest
WORKDIR /monitor
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
CMD cnpm install && npm run build
