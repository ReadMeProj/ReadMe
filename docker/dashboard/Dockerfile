FROM golang:1.15

# Make modules
WORKDIR /board
COPY go.* ./
RUN go mod download

# Copy everything
COPY . . 
RUN go build -o ./board ./cmd/dashboard 

CMD ["./board"]