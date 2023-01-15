# Use an official Python runtime as the base image
FROM python:3.9.0-alpine as python-stage

# Set the working directory in the container
WORKDIR /server

# Copy python script
COPY fetch.py .

# Build Node.js files
FROM node:latest as node-stage

# Set the working directory in the container
WORKDIR /server

# Install python
RUN apt-get update && apt-get install -y python

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files and run the Node.js server
COPY ./ ./
EXPOSE 3001
CMD ["npm", "start"]
