FROM golang:1.15

# Make modules
WORKDIR /api
COPY go.* ./
RUN go mod download

# Copy everything
COPY . . 
RUN go build -o ./api ./cmd/api 

CMD ["./api"]