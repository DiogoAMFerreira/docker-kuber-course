# Fun Facts 

If you search for "github node docker" you can find the official repository with the Dockerfiles for the node images


# Repository

## Login and Logout of repository

To login or logout from a repository or from DockerHub it's possible to use the following commands:

```sh
#Login
docker login

#Logout
docker logout
```


# Start the app
This looks for any available Dockerfile on the given folder folder
In this case the local folder (.) was given

```sh
docker build .
```

At the end the command returns an image id
Ex.: sha256:b07da50e54d13c476fd33d28426179bf89e5f0fc200136c3308fdda034854831

To run this image as a container run:

```sh
docker run -p 3000:3000 {docker_image_id}
```

To list all the running containers use:

```sh
docker ps
```

This command returns a list of running containers. Since the previous container was not named then docker gives it a randomly generated name

To stop the container use:

```sh
docker stop {container_name}
```

It's possible to download and run any official image from DockerHub using the comand

```sh
docker run {official_image_name}
#Example for node
docker run node
```

The following command shows the information of all the created containers, even the ones not currently running

```sh 
docker ps -a
```

If we want to expose the terminal for a given container when launching it we can add the -it option to enter it

```sh
#Example
docker run -it node
```

Containers are always a running instance of an image

Another side note: For all docker commands where an ID can be used, it's not required to always use/write the full id. It's possible to use just the first (few) character(s) as long as they work as a unique identifier

So instead of:

```sh
docker run abcdefg
```

It's possible to just use:

```sh
docker run abc
```

When you are attached to a container you can't do other commands on the same terminal but you get to see all that was printed as output of your container
But it's possible to detach from the container so the terminal doesn't get stuck you can use the option to detach (-d)

```sh
docker run -p 80:80 -d {docker_image_id}
```

Running a container in detach mode returns to the terminal the ID of the container. To attach back into a running container it's possible with the container id or name and the command:

```sh
docker container attach {docker_container_name}
```

The docker start command starts an already existing container that's stopped in detached mode:

```sh
docker start {docker_container_name}
```

If you want to start it already in attached mode then it's possible with an option:

```sh
docker start -a {docker_container_name}
```


Another way to see the output of a container instead of attaching to it it's possible to use the logs command:

```sh
docker logs {docker_container_name}
```

And it's even possible to keep listening to the logs with an option:

```sh
docker logs -f {docker_container_name}
```

The options to any docker command can be seen if the --help option is given

## Interactive containers

When trying to run an interactive container if docker run is executed then some extra options are required

The first option is the interactive option (-i or --interactive). This allows the launch of a container in interactive mode. This will keep STDIN open for input from the user

Normally this option is followed with the pseudo-TTY option (-t or --tty). This creates a terminal for input from the user

This will work out in a command like:

```sh
docker run -it {docker_image_id}
```

If an interactive container is run without this options it will most probably return an error or fail to launch. Use the 3 folder for an example of an interactive python program.

To start an existing interactive container it's necessary to use the attach option on the start command. Plus it's also required to use the interactive option -i

If this is not used the container will not be interactive.

```sh
docker start -ai {docker_container_name}
```

## Removing containers

First it's impossible to remove a running container

To remove containers it's possible to use the comand. It's also possible to pass multiple containers into the command

```sh
docker rm {docker_container_name} {docker_container_name_2} {docker_container_name_3}
```

## Copy files to a container or Download files from a container

To copy files into a container you can use the docker command cp. It works just like a cp command on Linux

```sh
docker cp {path_to_folder_or_file} {docker_container_name}:/{path_inside_container}
```

### Automatically remove stopped containers

There is an option to remove a container as soon as it's no longer in use. 

```sh
#Example
docker run -p 3000:80 -d --rm {docker_image_name_or_id}
```

## Name a container

When lauching a new container it's possible to give it a name instead of allowing docker to set a random generated one. 
To do that it's necessary to use the option --name on the run command like:

```sh
docker run -p 3000:80 -d --rm --name examplename {docker_image_name_or_id}
```

This will help to start and stop the container too since now it's possible to do it without having to list all running containers

## Inspect a container

With a container running it's possible to inspect it's details. 
Inspecting a container can be pretty usefull because it allows for example to see the IP Address.

```sh
docker container inspect {container_name}
```


# Images

To list images that were created use the command:

```sh
docker images
```

This will display the repository, the tags, the image id, the date to which it was created and the size of the image

To inspect an iamge use the command:

```sh
docker image inspect {docker_image_name_or_id}
```

This command is used to see the configuration of an image and display useful information on how it was built
Some usefull information given by this command are the Ports that are exposed, the Environment variables, the Layers and the OS used


## Naming an image

Similarly to the containers it's also possible to name an image during the build command. But in this case it's not called a name but a Tag.
Tags are divided into two parts:
	- Name or repository - The actual name of the image
	- Tag (Optional) - The version of the same image

This allows to store multiple versions of the same image which can be useful.
This is what we see on the public images on docker hub.

To define the Tag for your own image you can use the option --tag and then give it a "name:tag" combination as seen in the following example:

```sh
#Make sure you have a Dockerfile on this folder
docker build --tag examplename:exampleversion .
```

### Renaming the image

It's also possible to rename or retag an image for publishing. This requires you to use the comand:

```sh
docker tag {current_image_name} {new_image_name}
```

## Removing an image

To delete an image it's possible to use the command

```sh
docker rmi {docker_image_name_or_id}
```

It's not necessary to write the full name and it's also possible to delete multiple images at once
It's impossible to remove images that are still in use by a container even if the container it's stopped. To remove an image it's necessary to remove the container first

To delete all images that are not being used anymore then it's possible with the following command

```sh
docker image prune
```

To delete all images including the different tagged ones it's necessary to add an extra option to the prune command

```sh
docker image prune -a
```

# Publishing images to DockerHub or other providers

## Publish image

To publish an image you can use the following command:

```sh
docker push {image_name}
```

If your objective is to push to a private registry then you need to provide the host together with the image_name {host_address:image_name}



## Pull image

To download an image you can use the following command:

```sh
docker pull {image_name}
```

If your objective is to pull from a private registry then you need to provide the host together with the image_name {host_address:image_name}

Docker pull will always pull the latest image with that name from the container registry. 
So care that pulling twice can bring different versions at different times

# External Data Storage (Volumes & Bind Mounts)

There are two types of external data storage for a container:
- Volumes - Managed by Docker
- Bind Mounts - Managed by the user

## Volumes

Volumes are managed by docker. Docker sets up a folder or path on your host machine, the exact location is "unknown" to you. 
To manage the volumes you use the comands listed by this

```sh
docker volume --help
```

There are two types of volumes:
- Anonymous volumes 
	- The name is defined by Docker. 
	- This volume only will be deleted if the container is deleted by the --rm option 
	- Can be created in the Dockerfile
- Named volumes 
	- The name is defined by the user. 
	- This volume is persistent and even if the container is removed it exists 
	- Cannot be created in the Dockerfile

### List volumes

To list the existing volumes use the following command:

```sh 
docker volume ls
```

### Create a container with a named volume

To create a container with a named volume you need to use the -v option. Ahead of this option you must write the volume name then double colon then the path inside the container that's mapped to the volume.

The following command is an example of creating a named volume:

```sh
docker run -p 3000:80 -d --rm --name {my_app_name} -v {volume_name}:{volume_path} {my_app_image}
```

Note: You can create multiple volumes by just adding more -v options to the command

### Remove a volume

For anonymous and named volumes that are no longer in use there is two ways to delete them. 
The first option is to delete a specific volume using it's name or, in case it's anonymous, it's hashed name. For that use the following command:

```sh
docker volume rm {volume_name}
```

To remove all the volumes that are currently not in use you can use the following command:

```sh
docker volume prune
```

Remember that if you delete a container that has anonymous volumes, that wasn't created with the -rm option, the volumes won't be deleted and even if you re-create the container a new anonymous volume will be created. The old volume will not be helpful anymore and must be deleted using the previous commands.

## Bind mounts

Bind mounts have a similarity with volumes but in this case the user defines the folder or path in the host machine. This allows the user to set the app source code as a bind mount which allows that changes made outside the container on the original source code affect the code inside the container. 
This makes the bind mounts perfect for persistent and editable data inside the container

Bind mounts can't be defined inside the Dockerfile. They are also not volumes

To create a bind mount it's possible to use the same command as to create a named volume, but instead of a name, you use a absolute path on the host machine like in the following example:

```sh
docker run -p 3000:80 -d --rm --name {my_app_name} -v {absolute_host_path}:{bind_mount_path} {my_app_image}
```

Note: You can use quotes (") in case the path has spaces or any other special characters

Make sure Docker has access to the folder you are binding to inside the docker. This can be done inside the options in the Docker Desktop App on the Resources tab (Not necessary on Windows with WSL intergration)

Note: Be careful with binding mounts because the fully replace files created by the Dockerfile on the given path. For that you need to combine/merge the volume

## Merge volumes

To protect folders or files created by the Dockerfile from being replaced by the bind mounts it's possible to use anonymous volume. For that you just need to create a anonymous volume with the folder you don't want to be deleted. 
That can be done on the docker run command or inside the dockerfile

```sh
docker run -p 3000:80 -d --rm --name {my_app_name} -v {absolute_host_path}:{bind_mount_path} -v {protected_path} {my_app_image}
```

This would work when the folder you want to retain is more specific than the bind mount defined, because it will override the folder created by the bind_mount.

## Making a volume/bind mount read-only

It's possible to make a volume or bind mount read only. To do that it's only necessary to add ":ro" after the identification of the volume like in the following example:

```sh
docker run -p 3000:80 -d --rm --name {my_app_name} -v {volume_name}:{volume_path}:ro {my_app_image}
```

Attention: If there are folders inside the volume that need writte permission then you need to create anonymous volumes for those specific folders

## Manually create a volume

To manually create a new volume you can use the following command:

```sh
docker volume create {volume_name}
```

## Inspect a volume

Inspecting a volume gives usefull information from the volume like the creation date or the mountpoint where it's located

To inspect a volume use the following command:

```sh
docker volume inspect {volume_name}
```

# ENVironment variables

While running a new container you can defined environment variables by using the option -e or --env and using a KEY=VALUE to define it. The following example helps understand how you can do it:

```sh
docker run -p 3000:8000 -d --rm --env {env_key}={env_value} --name {my_app_name} {my_app_image}
```

You can use multiple environment variables by just adding another -e option like it's done with the volumes.

Another way to specify the environment variables is by creating a .env file which contains all the environment variables. For that you use the --env-file option followed by the path to the .env file. Can be a relative path to the location where the command is run

```sh
docker run -p 3000:8000 -d --rm --env-file {path_to_env_file} --name {my_app_name} {my_app_image}
```

### Important note in security with ENV variables
Depending on which kind of data you are sotring in your environment variables, you might not want to include the secure data directly in your Dockerfile

Instead, go for a different environment variables file which is then only used at runtime (docker run). This is mainly because the values are backed into the image when it's created and can be seen by anyone with the command:

```sh
docker history {my_app_image}
```

For some values, this might not be a problem, but with credentials and private keys you want to avoid that. By using a separate file, the values are not part of the image since you point at that file when you run the container. Also make sure you don't commit the environment variables file into the source control repository.

# ARGument variables

Similar to environment variables, arguments are a image unique concept that allows the definition of variables specific to the image. This arguments only exist in the context of the image and can be seen using the docker history command refered previously. This means you shouldn't use them for sensitive variables like passwords or keys.

To set the image arguments use the option --build-arg followed by KEY=VALUE to define it. The following example helps understand how you can do it:

```sh
docker build -t {image_name}:{image_tag} --build-arg {arg_key}={arg_value} .
```

On the Dockerfile you might want to set the arguments right before they needed because of the order in which the layers of the image are created. 

# Network


To set a network with multiple containers you use the --network option and give a name for the network like the following example:

```sh
docker run -p 3000:8000 -d --rm --network {network_name} --name {my_app_name} {my_app_image}
```

Within a network all containers can communicate between themselves and the addresses are resolved automatically.
Unlike volumes, docker does not automatically create a network when it's set creating a container.

To see the available network commands you can use the following help command:

```sh
docker network --help
```

## Creating a network

To create a new network you can use the following command:

```sh
docker network create {network_name}
```

This is an internal network fully managed by Docker.

## List networks

To list all existing networks use the following command:

```sh
docker network ls
```

## Drivers

Docker Networks actually support different kinds of "Drivers" which influence the behavior of the Network.
The default driver is the "bridge" driver - Containers can find each other by name if they are in the same Network.

The driver can be set when a Network is created, simply by adding the --driver option as shown in the following example:

```sh
docker network create --driver {driver_name} {network_name}
```

Docker also supports these alternative drivers - though you will use the "bridge" driver in most cases:
- **host** : For standalone containers, isolation between container and host system is removed (i.e. they share localhost as a network)
- **overlay** : Multiple Docker daemons (i.e. Docker running on different machines) are able to connect with each other. Only works in "Swarm" mode which is a dated / almost deprecatd way of connecting multiple containers.
- **macvlan** : You can set a custom MAC address to a container, this address can then be used for communication with that container
- **none** : All networking is disabled
- **Third-party plugins** : You can install third-party plugins which then may add all kinds of behaviors and functionalities

As mentioned before, the bridge driver makes most sense in the majority of the scenarios.

# Compose tool

A compose file must be of the type .yml or .yaml and it's organized by it's indentation. Yaml indentation defines dependence inside the file. To create dependencies make sure you use two blank spaces

It's important while writting your docker compose file to respect the correct *key names* exactly as they are documented (Case sensitive). 
For knowledge on the key names check the documentation on docker compose.

A compose file must start with the **version** which indicates to docker in what version and what features are available on that file

After that you need so specify the **services** which are the containers you want to create. 

Another thing you can and might need to add is the named volumes used in your compose file. For that you need to list them inside **volumes**
Other types of volumes like annonymous volumes or the bind mounts (which technically are not volumes) don't need the same treatment.
Also, multiple services can use the same volumes.

## Installing Docker Compose on Linux

On some Linux installations you might need to install it separately from docker

These steps should get you there:

```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
# To verify if it's properlly installed
docker-compose --version
```

Also see: https://docs.docker.com/compose/install/


## Starting a service with compose tool

To start all services in a docker compose file you can run the up command like:

```sh
docker-compose up
```

If you want to start the services in detached mode you can add the option **-d** to the command like the following example:

```sh
docker-compose up -d
```

To force the rebuild of an image when starting up a service then you can add the option **--build** like the following example:

```sh
docker-compose up --build
```

### Building the images without starting the services

There's also an option to just build the images without needing to start the app. For that you use the command build instead of up, like the following example:

```sh
docker-compose build
```

## Shutdown a service with compose tool

To shutdown all services in a docker compose file can use the down command like:

```sh
docker-compose down
```

This command removes all containers created by the service, but does not remove volumes created by it. To force the removal of the volumes you can add the option **-v** like the following example:

```sh
docker-compose down -v
```

By default the volumes are not deleted because typically their are the persistant data from your applications.

## Creating a service

The first step to create a service is to indent in a new line after the *key name* services in the docker compose file the name of the service you want to create.

After that indent again to set the configuration of the new service.

### Images

The first thing you need is to specify which image you want to use. For that you use the *key name* **image** followed by the name or address of the image you want to create.
It's important to note that the name of the image can be for a locally created image or for a image on the Dockerhub.

### Build

If instead of an image you want to build your own using a Dockerfile you also can. To do that use the *key name* **build** then there are multiple options. You can just specify a path to a folder where a Dockerfile exists like:

```yaml
myservice:
  build: path_to_folder_containing_a_dockerfile
```

But there's also a longer form to write the build command. For that you need to add a nested key below the **build** *key name*. In this longer form you can give a path using the **context** *key name* and then specify a Dockerfile with the **dockerfile** *key name* like in the following example:

```yaml
myservice:
  build: 
    context: path_to_folder_containing_a_dockerfile
	dockerfile: dockerfile_file_name
```

This might be useful if the name of the Dockerfile isn't Dockerfile. 

Also note that if the Dockerfile is copying files from the current folder it will use the context path to determine what is the correct folder. So be careful that the Dockerfile does not require folders outside the context.

Lastly, in this extended syntax you can also define the values for ARGs used inside the Dockerfile. To do that you add they *key name* **args** followed by the list of arguments. Those arguments can be defined in two different sintax options like: 

```yaml
myservice:
  build: 
    context: path_to_folder_containing_a_dockerfile
	dockerfile: dockerfile_file_name
	args:
		argument-one: arg-value-1
		argument-two: arg-value-2
```

Or like:

```yaml
myservice:
  build: 
    context: path_to_folder_containing_a_dockerfile
	dockerfile: dockerfile_file_name
	args:
		- argument-one=arg-value-1
		- argument-two=arg-value-2
```

### Container names

By default containers created by the compose command will have their names defined using the name of the folder you are running it from plus the name of the service and and in the end an incrementing number starting by 1.

But it's also possible to define your own names for the containers. For that you had the *key name* **container_name** followed by the name you want for the container

### Volumes

On the services you can also add specific volumes you want to map from the container. For that you use the **volumes** *key name* followed by the list of volumes set with a - before them. Note that named volumes must also be specified on the **volumes** global *key name* of the docker compose file. 
The syntax for the list of volumes used by the service must follow the following rule:

```yaml
volumes:
  - volumename:pathinsidecontainer
  - volumename2:pathinsidecontainer:extraoptions(permissions)
```

### Environment variables

Another thing you might need for a service is the environment variables. For that you have multiple ways to do it but if you already know which are the ones you need then you can specify them inside the *key name* **environment**
There are two ways - two syntax options - to write the list of environment variables.
The first one is like this:

```yaml
environment:
  EXAMPLE_ENV_VARIABLE_1: ENV_VALUE_1
  EXAMPLE_ENV_VARIABLE_2: ENV_VALUE_2
```

The second one is like this:

```yaml
environment:
  - EXAMPLE_ENV_VARIABLE_1=ENV_VALUE_1
  - EXAMPLE_ENV_VARIABLE_2=ENV_VALUE_2
```

It's up to you which one you prefer.
Another option is to write the environment variables using a file. For that it's sugested to create a env file for each service and the use the *key name* **env_file** to specify the variable file.

### Services Network
By default you don't need to create a network because docker compose creates a network by default with all services. But you still can specify other networks to which the service belongs. To do that add the *key name* **network** followed by the list of networks

### Ports

To publish ports from your service you add the *key name* **ports** to your docker file followed by the list of ports you want to expose. The sintax for exposing a port is: 

```yaml
ports:
  - 'local_port:container_port'
```

### Dependencies

When a container/service depends on another container/service, for example a backend of a service depends on a database container, then you can use the *key name* **depends_on** followed by the list of services on which it depends, like in the following example:

```yaml
depends_on:
  - my_other_service
```

### Interactive services

If your service needs to be interactive there's two options you need to add to your service configuration in the docker compose file.

The first option is to open the standard input. For that you use the *key name* **stdin_open** and set it's value to true

The second option is to add the pseudo-TTY option. For that you can use the *key name* **tty** and in the same way just set it's value to true
