# Jack's Personal React Web App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The idea is to create a react webapp locally and then deploy it live using Docker, Kubernetes, and AWS. Below is documentation on the steps taken to get to the final product, or at least an attempt to get to a final product.

##  Local setup

1.)   create-react-app used to initialize a basic react app. 

2.)   Basic app.test.js file created to test for the proper rendering of links.

3.)   created docker.dev file for local dev testing of image. creates a container that hosts the dev server.

4.)   docker-compose file created to make running 'docker run' easier.

5.)   updated docker-compose file to also have a container that runs tests. docker-compose will now start up two seperate containers, one for hosting the server and one for running tests. 

##  Set up for production

1.)   Creating prod Dockerfile. Multi-step build. Using node:19-alpine to install deps and build, then copy over build folder to a nginx container.

2.)    Push up local project to Github repository. Jmorg2397/personal-webpage