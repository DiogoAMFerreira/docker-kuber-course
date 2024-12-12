# Create the Network for the Containers

Use the following example command to create a network for the containers

```sh
docker network create goals-net
```

# Launching MongoDB Container

Use the following example command to launch the mongodb container for this case

```sh
docker run --name mongodb -v goals-data:/data/db --rm -d --network goals-net -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=mongosecret mongo
```

Note: Setting an authentication for root user will not work if the data volume already exists

Useful links:
https://hub.docker.com/_/mongo
https://www.mongodb.com/docs/manual/reference/connection-string/


# Launching Backend Container

There is a bind mount:
- Used to link the container app folder with the code, so the changes made to the code are applied instantly inside the container. This also requires the installation of the devdependecy nodemon so the server can auto restart when changes are made
There are 2 volumes: 
- The first one is a named volume for the logs folder so they aren't replaced by the logs folder inside the code
- The second one is a volume to prevent the node_modules to be replaced by the node_modules on the code folder

Use the following example command to launch the Backend container for this case:

```sh
docker build -t goals-node .
docker run --name goals-backend -v "/mnt/c/Code/Formações/Docker&Kubernetes/07-multi-container/backend":/app -v logs:/app/logs -v /app/node_modules -e MONGODB_ROOT_USER=mongoadmin -e MONGODB_ROOT_PASSWORD=mongosecret --rm -d --network goals-net -p 80:80 goals-node
```

# Launching Frontend Container


There is a bind mount:
- Used to link the container app folder with the code, so the changes made to the code are applied instantly inside the container. 

In this case there's no need of nodemon because this project already watches for file changes and reloads. Instead it's necessary to add the CHOKIDAR_USEPOLLING env variable in windows. With react-script v5.0.0 onward the command is WATCHPACK_POLLING instead of CHOKIDAR_USEPOLLING. This is a temporary fix and for a definitive fix make sure you do everything from creating a folder to running the commands from inside the WSL terminal instead of Windows

Use the following example command to launch the Frontend container for this case
The frontend container does not need to be part of the network since it's run on the browser which is outside the Docker system

```sh
docker build -t goals-react .
docker run -e WATCHPACK_POLLING=true --name goals-frontend -v "/mnt/c/Code/Formações/Docker&Kubernetes/07-multi-container/frontend/src":/app/src --rm -it -p 3000:3000 goals-react
```