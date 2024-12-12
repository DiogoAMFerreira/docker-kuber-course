FROM php:8.3-fpm-alpine
#FPM image is required for the NGINX configuration used

WORKDIR /var/www/html

COPY src .

RUN docker-php-ext-install pdo pdo_mysql
#docker-php-ext-install is a command that exists in the PHP images and allows the easy installation of PHP extensions

#You don't need a ENTRYPOINT or a COMAND if you want to execute the BASE IMAGE command
#In this case the default command is the PHP image command

# Give owner permission
RUN chown -R www-data:www-data .