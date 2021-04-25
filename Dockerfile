FROM golang:1.15

# Make modules
WORKDIR /api
COPY go.* ./
RUN go mod download

# Copy everything
COPY . . 
RUN go build -v -o api 

EXPOSE 8081

CMD ["/api"]