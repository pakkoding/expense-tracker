FROM node:14

RUN mkdir /usr/src/front
WORKDIR /usr/src/front

ENV PATH /usr/src/front/node_modules/.bin:$PATH

COPY package.json /usr/src/front/
#COPY node_modules /usr/src/front/

RUN npm install
RUN npm install react-scripts -g
ARG CACHEBUST=1
