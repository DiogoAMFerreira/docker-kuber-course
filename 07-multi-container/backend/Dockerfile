FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Default port for the app is 80
ARG DEFAULT_PORT=80
# Set the environment variable for the port
ENV PORT $DEFAULT_PORT
# Expose the port
EXPOSE $PORT

ENV MONGODB_ROOT_USER=root
ENV MONGODB_ROOT_PASSWORD=secret

CMD ["npm", "start"]
