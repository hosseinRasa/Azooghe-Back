# Stage 1: build
FROM node:20-alpine AS build

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# Copy source code and build
COPY . .
RUN pnpm run build

# Stage 2: production
FROM node:20-alpine AS production

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and install only production dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod

# Copy compiled build from Stage 1
COPY --from=build /app/dist ./dist

# Set environment variables (optional fallback)
ENV NODE_ENV=production

# Run the app
CMD ["node", "dist/src/main.js"]
