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
# Pass a dummy DATABASE_URL just so the generate command doesn't crash during the Docker build phase
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate
RUN npm run build

# Expose the port the backend runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
