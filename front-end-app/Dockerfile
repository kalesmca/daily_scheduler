FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM httpd:2.4-alpine

# Enable Apache modules and allow .htaccess overrides
RUN sed -i \
    -e 's/^#LoadModule rewrite_module/LoadModule rewrite_module/' \
    -e 's/AllowOverride None/AllowOverride All/' \
    /usr/local/apache2/conf/httpd.conf

COPY --from=build /app/build/ /usr/local/apache2/htdocs/

COPY public/.htaccess /usr/local/apache2/htdocs/.htaccess

EXPOSE 80

CMD ["httpd-foreground"]