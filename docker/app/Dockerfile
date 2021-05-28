# Create server 
FROM avcosystems/golang-node
WORKDIR /app
COPY go.* ./
COPY dashboard/package.json /app/dashboard/package.json

# Golang installations
RUN go mod download

# Node installations
RUN cd /app/dashboard && npm install 

# Copy everything
COPY . .

# Create server 
RUN go build -o ./app ./cmd/app

# Create react app
RUN cd /app/dashboard && npm run build 

CMD ["./app", "-mongo", "mongodb"]