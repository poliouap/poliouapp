# Use a lightweight Node.js image
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Generate Prisma client and build the app
RUN npx prisma generate
RUN npm run build

# Expose the port the backend runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
