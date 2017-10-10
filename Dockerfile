FROM node:8.1.3 AS web.html

RUN mkdir -p /build/front/workdir
COPY . /build/front/workdir
WORKDIR /build/front/workdir

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN npm install
RUN npm run build

FROM httpd:alpine
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=web.html /build/front/workdir/target/ /usr/local/apache2/htdocs/
