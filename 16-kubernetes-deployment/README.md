# Create an Amazon VPC for your Amazon EKS cluster

The guide can be found here:
https://docs.aws.amazon.com/eks/latest/userguide/creating-a-vpc.html#create-vpc

# Connect Kubectl to AWS

In your User folder after installing minikube there will be a .kube folder. It's an hidden folder so make sure you can see hidden folders
In there you will have a config file. You can open it with any text editor, and this holds information that allows kubectl to connect to the minikube that runs on your VM or Docker. 
Copy that file and save it as config.minikube to prevent losing this configuration.

AWS offers a tool called AWS CLI (Command line interface) that will allow you to run commands inside your command line in the local machine into your AWS machine.
You need to install it, and it's a straight forward installer.
This will set a command line tool in your local machine.

After it's installed you can use it. But before you use it you need to generate, in your account Security, a new Access Key. Download it and save it. Don't lose it!
You then can use the following command:
```sh
aws configure
```
Enter the configuration you want and authenticate with the AccessKey you downloaded.

## Enter into Cluster

To access your cluster you can use the following command

```sh
aws eks --region {region} update-kubeconfig --name {Cluster Name}
```

This will update the Kube config file to allow your kubectl commands to communicate with your Cluster. That's why it's important to save the original.

You can then try to use the Kubernetes commands freely into the AWS Cluster

# Volumes in AWS

Since our application will probably be running in multiple nodes you can't use the hostPath like in the previous examples. You will mostly use csi volume type for this persistent volumes. In AWS you use AWS EFS. You can check it's configuration here:

https://github.com/kubernetes-sigs/aws-efs-csi-driver

And more details about creating an AWS EFS volume here:

https://aws.amazon.com/pt/efs/

Follow the installation guide to set it up.
