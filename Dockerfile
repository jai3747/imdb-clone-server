# FROM node:18-alpine

# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # First remove any existing modules and lock file
# RUN rm -rf node_modules
# RUN rm -f package-lock.json

# # Install dependencies
# RUN npm install
# RUN npm install --save-dev babel-jest
# # Copy the rest of the application
# COPY . .

# # Set environment
# ENV NODE_ENV=production

# # Expose port
# EXPOSE 5000

# # Start the application
# CMD ["node", "index.js"]
FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force && \
    npm install --no-package-lock && \
    npm install --save morgan cors dotenv express mongoose && \
    npm install --save-dev nodemon

# Copy application code
COPY . .

# Create .env file if it doesn't exist
RUN touch .env

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Add health check
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider http://localhost:5000/health || exit 1

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
