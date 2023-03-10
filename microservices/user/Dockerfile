# Use an official Golang runtime as a parent image
FROM golang:1.17.3-alpine3.15 AS builder

# Set the working directory to /app
WORKDIR /app

# Copy the necessary files into the container at /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .

# Build the binary with support for CGO_ENABLED=0
RUN CGO_ENABLED=0 go build -o book-store ./main.go

# Start from a smaller base image for production
FROM alpine:3.15

# Set the working directory to /app
WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/book-store .

# Copy the App.yaml file from the project directory to the container
COPY infrastructure/config/App.yaml /app/infrastructure/config/App.yaml

# Expose port 5000
EXPOSE 5000

# Run the binary
CMD ["./book-store"]