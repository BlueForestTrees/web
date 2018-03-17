FROM node:alpine AS web-builder

RUN mkdir -p /build
COPY package*.json /build/
COPY src/ /build/src

WORKDIR /build
RUN npm install

ENTRYPOINT "cd /build" && /bin/bash
#RUN npm run build
#
#FROM tobi312/rpi-apache2
#COPY --from=web-builder /build/dist/ /var/www
#COPY ./000-default.conf /etc/apache2/sites-available
#COPY ./mods-available /etc/apache2/mods-enabled