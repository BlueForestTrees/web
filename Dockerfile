FROM node:8.1.3 AS trees.web.html

RUN mkdir -p /usr/src/trees.web
COPY . /usr/src/trees.web/
WORKDIR /usr/src/trees.web

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN npm install
RUN npm run build

FROM httpd:alpine
COPY --from=trees.web.html /usr/src/trees.web/target/ /usr/local/apache2/htdocs/
