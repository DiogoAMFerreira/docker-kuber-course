FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .


# Default port for the app is 3000
ARG DEFAULT_PORT=3000
# Set the environment variable for the port
ENV PORT $DEFAULT_PORT
# Expose the port
EXPOSE $PORT

CMD ["npm", "start"];