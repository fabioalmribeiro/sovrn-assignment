# Use version 14 of Node as a parent image
FROM node:14-alpine

# Set the working directory to /ui
WORKDIR /ui

# copy package.json into the container at /ui
COPY package*.json /ui/

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /ui
COPY . /ui/

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]