FROM node:14

RUN mkdir /usr/src/front
WORKDIR /usr/src/front

ENV PATH /usr/src/front/node_modules/.bin:$PATH

COPY package.json /usr/src/front/
#COPY yarn.lock /usr/src/front/
RUN yarn install
RUN npm install react-scripts -g
ARG CACHEBUST=1


#COPY . /
#CMD ["yarn", "start"]
