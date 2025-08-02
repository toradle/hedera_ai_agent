# Use Node.js LTS version
FROM node:20.19.4-bookworm

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Install dependencies
RUN npm install --ignore-scripts

# Remove devDependencies after build scripts have run
RUN npm prune --omit=dev

# Start the server
CMD ["npm", "run", "server"]
