FROM node:8.1.3 AS web.html

RUN mkdir -p /usr/src/web
COPY . /usr/src/web/
WORKDIR /usr/src/web

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN npm install
RUN npm run build

FROM httpd:alpine
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=web.html /usr/src/web/target/ /usr/local/apache2/htdocs/
