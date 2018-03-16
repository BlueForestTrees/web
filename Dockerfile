#!/bin/bash
FROM node:alpine AS trees-web

RUN mkdir -p /build/trees-web
COPY . /build/trees-web
WORKDIR /build/trees-web

RUN npm install
RUN npm run build

FROM tobi312/rpi-apache2
COPY --from=trees-web /build/dist/ /var/www
COPY ./000-default.conf /etc/apache2/sites-available
COPY ./mods-available /etc/apache2/mods-enabled