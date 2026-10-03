# Stage 1: Build
FROM node:24-alpine AS build-stage

WORKDIR /app
COPY ./Modelab/package*.json ./
RUN npm install
COPY ./Modelab/ .

ARG VITE_API_PATH
ARG VITE_CLIENT_ID
ARG VITE_DEV_LOGIN

ENV VITE_API_PATH=$VITE_API_PATH
ENV VITE_CLIENT_ID=$VITE_CLIENT_ID
ENV VITE_DEV_LOGIN=$VITE_DEV_LOGIN

RUN npm run build

# Stage 2: Setup API and serve
FROM php:8.3-apache

RUN apt-get update

# Setup PHP
RUN docker-php-ext-install pdo pdo_mysql

RUN apt-get install libzip-dev -y
RUN docker-php-ext-install zip

RUN apt-get install libpng-dev libjpeg-dev libfreetype6-dev -y
RUN docker-php-ext-configure gd --with-jpeg --with-freetype
RUN docker-php-ext-install gd

# Enable apache rewrite for htaccecss
RUN a2enmod rewrite
RUN service apache2 restart

WORKDIR /var/www/html

# Use production PHP config
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

COPY ./Modelab-api/src /var/www/html/api

# Fix permissions...
RUN chown -R www-data:www-data /var/www/html
USER www-data

# Prepare app
RUN cd /var/www/html/api/ && mkdir logs && chmod 777 logs && mkdir data && chmod 777 data

# Copy build over
COPY --from=build-stage /app/dist /var/www/html/

CMD ["sh", "-c", "cd api && make setup && apache2-foreground"]