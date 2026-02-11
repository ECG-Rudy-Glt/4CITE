# Use Node.js LTS (matches devcontainer)
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source and test files
COPY . .

# Run tests
CMD ["npm", "test"]
