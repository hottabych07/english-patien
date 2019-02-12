FROM node:10

RUN mkdir -p /project
WORKDIR /project

COPY package.json /project
RUN yarn install

COPY . /project
RUN yarn build
