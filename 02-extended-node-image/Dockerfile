# FROM Command instructs that this image will be based from the official node image
FROM node

# Since the code was moved to another folder then it's necessary to set a WORKDIR
# WORKDIR tells docker where the commands should be executed inside the container
WORKDIR /app
# If this command was executed before the COPY then that command could have been COPY . .


# Docker images are layer based (Layer based architecture). Each instruction represents a different layer. 
# An image is built on different layers. The image is read-only
# So if a layer is changed all the previous layers use the cache from the last build but the ones afterwards are re done
# as docker doesn't undertand if the changes on one layer will impact the ones after

# This is why it's important to make sure to optimize by making sure all independent layers are run first
# By running this instruction first If I change anything else on the folder the package and the install of the npm are cached and won't be run again
# when rebuilding the image
COPY package.json /app

# RUN command executes a command inside the image
RUN npm install

# COPY Command copies files from the local folder (Where the Dockerfile is located) to inside the image
# This example copies this folder into a /app folder inside the image
COPY . /app

# A docker container is always isolated from the local machine. So it also has it's own network. 
# To open it to the local machine it's necessary to expose a PORT to the local system
EXPOSE 80
# This instruction helps identify which PORTS should be mapped but only serves as documentation
# It is a best practice to use it to clearly document what ports your container needs but it's not required and can be removed
# To actually expose the ports it needs to be done on the docker compose or on the docker run command

# All commands executed inside the Dockerfile are for building the image. All instructions are to setup the template
# Don't start servers inside the image with RUN. Instead use the CMD command. 
# This means that this will be executed when the container is started and not while reating the image
# This is also required to be the last command on a Dockerfile
CMD ["node", "server.js"]
# If you don't set up a CMD then the base image CMD will be executed instead
