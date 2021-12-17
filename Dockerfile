# specify a base image
FROM node:16-alpine3.12
# create and use a working directory in the image
WORKDIR /usr/src/app

COPY /client/package*.json /usr/src/app/client/

WORKDIR /usr/src/app/client
RUN yarn install --no-cache && yarn run build && yarn install -g serve

WORKDIR /usr/src/app
# copy required files
COPY package*.json ./
# install packages
RUN yarn install
# copy source code
COPY . .
# expose port 3000 to the host
EXPOSE 3030
EXPOSE 3000
# run application
CMD [ "node", "app.js" ]