FROM arm64v8/node:19-alpine

WORKDIR /app

COPY . .

# Install dependencies
COPY package.json ./
COPY prisma ./prisma/
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

# Build the application
RUN pnpm run build

# Expose the server port
EXPOSE 50051

CMD ["npm", "run", "start:prod"]