# Launch utility container to generate Laravel application

```sh
docker-compose run --rm composer create-project --prefer-dist laravel/laravel .
``` 

# Launch Artisan

```sh
docker-compose run --rm  artisan migrate
``` 

# Launch App

Use dependencies:

```sh
docker-compose up -d --build server
```

When using Docker on Linux, you might face permission errors when adding a bind mount as shown in the next lecture. If you do, try these steps:

Change the php.dockerfile so that it looks like that:

```dockerfile
    FROM php:8.2.4-fpm-alpine
     
    WORKDIR /var/www/html
     
    COPY src .
     
    RUN docker-php-ext-install pdo pdo_mysql
     
    RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -s /bin/sh -D laravel
     
    USER laravel
```

Please note that the RUN chown instruction was removed here, instead we now create a user "laravel" which we use (with the USER instruction) for commands executed inside of this image / container).

Also edit the composer.dockerfile to look like this:

```dockerfile
    FROM composer:2.5.7
     
    RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -s /bin/sh -D laravel
     
    USER laravel
     
    WORKDIR /var/www/html
     
    ENTRYPOINT [ "composer", "--ignore-platform-reqs" ]
```

Here, we add that same "laravel" user and use it for creating the project therefore.

These steps should ensure that all files which are created by the Composer container are assigned to a user named "laravel" which exists in all containers which have to work on the files. 