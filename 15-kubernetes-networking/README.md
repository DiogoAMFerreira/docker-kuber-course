# Kubernetes Service Env Variables

Kubernetes automatically generates Environment variables for their services. 
They can be accessed using the automatic name which is the service name all in uppercase where dashes are replaced with underscores and after the rest of the specific Environment variable. 
For example if you want the IP address of a service called service-auth you would use:
```
SERVICE_AUTH_SERVICE_HOST
```
Where SERVICE_AUTH is the service name and SERVICE_HOST the specific Environment variable.

# Kubernetes DNS for Service to Service communication

You can use CoreDNS to create Domains inside the Cluster for communication between the pods

Read more about it here: https://kubernetes.io/docs/tasks/administer-cluster/coredns/

The domain is usually the name of the service dot namespace the service belongs to. 
Namespaces is a concept that allows you to assign services and deployments and other things inside the same cluster to for example teams. It's a way to group things inside the cluster

To get the list of available namespaces you can use the following command:
```sh
kubectl get namespaces
```

By default the services and deployments are assigned to the "default" namespace