FROM node:latest

# Create app directory
WORKDIR /client

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY ./ ./

# Expose port 3000
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
