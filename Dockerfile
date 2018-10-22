FROM nginx:stable
COPY ./dist/files/etc/var/www/blueforest.org/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx -g 'daemon off;'"]