# pull official base image
FROM node:21.5-bookworm

# Add Tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT  ["/tini", "--", "docker-entrypoint.sh"]

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json package-lock.json ./
RUN mkdir node_modules && chown node:node node_modules
RUN npm install


# add app
COPY src ./src/


# start app
USER node
CMD ["npm", "start"]

