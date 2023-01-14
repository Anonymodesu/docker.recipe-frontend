# pull official base image
FROM node:16.17.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./
RUN npm install --silent

# add app
COPY --chown=node:node . ./

# start app
USER node
CMD ["npm", "start"]

