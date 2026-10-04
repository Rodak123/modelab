# Stage 1: Build
FROM node:24-alpine AS build-stage

WORKDIR /app
COPY ./modelab-web/package*.json ./
RUN npm install
COPY ./modelab-web/ .

ARG DEV_MODE
ARG VITE_API_PATH
ARG VITE_CLIENT_ID

ENV VITE_API_PATH=api
ENV VITE_CLIENT_ID=$VITE_CLIENT_ID
ENV VITE_DEV_LOGIN=$DEV_MODE

RUN npm run build

# Stage 2: Setup API and serve
FROM php:8.3-apache

RUN apt-get update

# Setup PHP (zip and gd are needed extensions)
RUN docker-php-ext-install pdo pdo_mysql

RUN apt-get install libzip-dev -y
RUN docker-php-ext-install zip

RUN apt-get install libpng-dev libjpeg-dev libfreetype6-dev -y
RUN docker-php-ext-configure gd --with-jpeg --with-freetype
RUN docker-php-ext-install gd

# Enable apache rewrite for htaccess
RUN a2enmod rewrite
RUN service apache2 restart

WORKDIR /var/www/html

# Use production PHP config
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

COPY ./modelab-api/src /var/www/html/api

# Prepare app directories
RUN mkdir -p /var/www/html/api/logs /var/www/html/api/data
RUN chmod 777 /var/www/html/api/logs /var/www/html/api/data

# Put the .env in the api
ARG DEV_MODE
ARG DATA_MAX_SIZE_MB
ARG DB_SERVERNAME
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_DATABASE

RUN cat <<EOF > /var/www/html/api/.env
DEV_MODE=${DEV_MODE}

LOG_PATH=/logs

DATA_PATH=/data
DATA_MAX_SIZE_MB=${DATA_MAX_SIZE_MB}

DB_SERVERNAME=${DB_SERVERNAME}
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}
DB_DATABASE=${DB_DATABASE}
EOF

# Copy vite build over
COPY --from=build-stage /app/dist /var/www/html/

# Fix permissions...
RUN chown -R www-data:www-data /var/www/html

USER www-data

ARG ADMIN_EMAIL

CMD ["sh", "-c", "cd api && make setup && make create-admin ADMIN_EMAIL=${ADMIN_EMAIL} && apache2-foreground"]