# Use version 14 of Node as a parent image
FROM node:14-alpine

# Set the working directory to /api
WORKDIR /api

# copy package.json into the container at /api
COPY package*.json /api/

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /api
COPY . /api/

# Make port 3600 available to the world outside this container
EXPOSE 3600

# Run the app when the container launches
CMD ["npm", "start"]
