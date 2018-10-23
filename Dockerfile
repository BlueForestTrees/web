FROM node AS build

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:stable
COPY --from=build /app/dist/www/ /var/www
COPY /app/dist/nginx/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx -g 'daemon off;'"]