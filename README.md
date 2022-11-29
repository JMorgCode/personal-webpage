# Jack's Personal React Web App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The idea is to create a react webapp locally and then deploy it live using Docker, Kubernetes, and AWS. Below is documentation on the steps taken to get to the final product, or at least an attempt to get to a final product.

## Deploying Simple React App to AWS

###  Local setup

1.)   create-react-app used to initialize a basic react app.

2.)   Basic app.test.js file created to test for the proper rendering of links.

3.)   created docker.dev file for local dev testing of image. creates a container that hosts the dev server.

4.)   docker-compose file created to make running 'docker run' easier.

5.)   updated docker-compose file to also have a container that runs tests. docker-compose will now start up two seperate containers, one for hosting the server and one for running tests. 

###  Set up Github repo for production

1.)   Creating prod Dockerfile. Multi-step build. Using node:19-alpine to install deps and build, then copy over build folder to a nginx container.

2.)    Push up local project to Github repository. Jmorg2397/personal-webpage

###  Set up AWS 

1.)   Created an AWS Elastic Beanstalk application and environment un US-West-2, platform = Docker running on 64bit Amazon Linux 2/3.5.1. This also initialized the S3 bucket for me. 

2.)   Set up a new user and group in IAM to be able to make API requests to the AWS account from GitHub Actions. Secrets / keys stored in GitHub repo. 

3.)   In dockerfile, exposed port 80

### Deploy project to AWS

The creation of the deploy.yaml file is what finally syncs my pushes to the main branch to the AWS Elastic Beanstalk application. Below is a list of actions needed to get this deployment to work:

1.)   Log in to docker

2.)   Build the docker image

3.)   Run the tests 

4.)   Generate a deployment package 

5.)   Use a script to assist with deploying to Elastic Beanstalk. Takes in parameters, uploads to S3, creates a new version of Elastic Beanstalk, then deploys that version to the environment. einaregilsson/beanstalk-deploy

6.)   set variables that beanstalk-deploy will use

##  Adding Complexity: Multi-Container Application

### Creating Worker Process

1.)   Created the worker process with a function that calculates fib values when it is given a specific index

2.)   Set up the Express server

3.)   Create the react app, render pages, and set up routing

### Dockerizing the react app in development

1.)   Created individual dev dockerfiles for the client, server, and worker. 

2.)   Created a docker-compose file that handles services, setting environment variables, volumes, and exposing ports.  

3.)   adding an nginx server that will route requests to either the react server or express server. 

4.)   Now have 4 seperate containers / services: the client, express server, nginx server, and worker. Each one has been dockerized with a dev dockerfile for each. 

### Setting up multi-container app for production

1.)   Created production dockerfiles for each container (very similar to dev dockerfiles)

2.)   Created docker-compose production file

3.)   Set up the deploy.yaml file for github actions to build and push docker images

### AWS Setup for multi-container app

1.)   Created Elastic Beanstalk environment and application

2.)   Created Postgres database using RDS

3.)   Created an ElastiCache Redis instance

4.)   Created a security group so that all of these istances can communicate

5.)   Set environment variables inside the EB environment

6.)   Updated the deploy.yaml file to deploy to EB
