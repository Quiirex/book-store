FROM arm64v8/node:19-alpine

WORKDIR /app

COPY . .

# Install dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

# Build the application
RUN pnpm run build

# Copy proto file from src/proto/services.proto to build/proto/services.proto
COPY src/proto/services.proto build/proto/services.proto

# Expose the server port
EXPOSE 3000

CMD ["pnpm", "run", "start"]