# Use an official Node runtime as a parent image
FROM node:latest

# Make port 3000 available to the world outside this container
EXPOSE 3000
# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# Copy the current directory contents to the container at /app
COPY . .

# Install app dependencies
RUN npm install


# Define environment variable
ENV REACT_APP_API_URL=http://localhost:3000

# Build the app
ENTRYPOINT [ "sh", "run.sh"]

# Run the app
# CMD ["npm", "start"]