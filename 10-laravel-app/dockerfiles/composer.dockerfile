FROM composer:latest

WORKDIR /var/www/html
#The ignore-platform-reqs flag ensures that we can run the command without any warning or errors even when dependecies are missing
ENTRYPOINT [ "composer", "--ignore-platform-reqs" ]