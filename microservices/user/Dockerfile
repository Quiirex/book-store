# Use a small Golang image for the builder stage
FROM golang:1.17.3-alpine3.15 AS builder
ENV CGO_ENABLED=0
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download && \
    go mod verify
COPY . .
RUN go build -o user-service ./main.go

# Use a smaller base image for the production stage
FROM scratch
WORKDIR /app
COPY --from=builder /app/user-service /app/
COPY infrastructure/config/App.yaml /app/infrastructure/config/App.yaml
EXPOSE 5000
CMD ["./user-service"]