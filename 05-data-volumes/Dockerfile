FROM node:latest

WORKDIR /app
# Copy the package.json to the app folder which was set as the WORKDIR
COPY package.json .
# Install the libraries referenced in the package.json
RUN npm install

# Copy the rest of this folders content into the docker container
# Currently the code is being mounted inside but for production you always want the copy on the dockerfile
# This doesn't copy everything. Anything in the .dockerignore is not copied inside.
COPY . .

# Arguments are Dockerfile unique variables, only acessible here
# They can't be used in the CMD instruction though
# Define the arguments only right before you need them to make use of the full potential of the layers in image creation
ARG DEFAULT_PORT=80

# Setting up default values for environment variables
ENV PORT $DEFAULT_PORT

# Expose the defined PORT value
EXPOSE $PORT

## Create an anonymous volume at the folder /app/feedback inside the container for permanent storage
#VOLUME [ "/app/feedback" ]
## Note: Attention with renaming files from the container to inside the volume since it's treated as a different device
## and might give an error for a cross-device link
## Example with Node rename: 
##	Error: EXDEV: cross-device link not permitted, rename '/app/temp/awesome.txt' -> '/app/feedback/awesome.txt'

## Anonymous volume to protect node_modules in case a bind mount is set
#VOLUME [ "/app/node_modules" ]

CMD ["npm", "start"]