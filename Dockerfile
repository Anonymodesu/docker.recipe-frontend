# pull official base image
FROM node:16.17.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN mkdir node_modules && chown node:node node_modules
RUN npm install


# add app
COPY . ./


# start app
USER node
CMD ["npm", "start"]

