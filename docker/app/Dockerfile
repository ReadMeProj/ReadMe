# Create server 
FROM avcosystems/golang-node
WORKDIR /app
COPY go.* ./
RUN go mod download

# Copy everything
COPY . .
# Create server 
RUN go build -o ./app ./cmd/app 

# Create client
RUN cd /app/dashboard && npm install && npm run build

CMD ["./app", "-mongo", "mongodb"]