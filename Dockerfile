FROM node AS build
WORKDIR /app
COPY . .
RUN yarn build

FROM nginx:stable
COPY --from=build /app/dist/files/etc/var/www/blueforest.org/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx -g 'daemon off;'"]