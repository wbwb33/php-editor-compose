# Create node image
FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Copy file to /app directory
COPY . /app

# install dependencies
RUN npm install pm2 -g \
  # Remove dev dependencies
  && npm prune --production --silent \
  # Remove unused file/folder
  && rm Dockerfile .dockerignore

# Expose port
EXPOSE 3000

# run node
CMD [ "pm2-runtime", "./server.js" ]