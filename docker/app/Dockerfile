# Create server 
FROM avcosystems/golang-node
WORKDIR /app
COPY go.* ./
RUN go mod download
# Copy everything
COPY . .
RUN ls -lha
RUN pwd
RUN go build -o ./app ./cmd/app 
#COPY /app/dashobard/ /app/dashboard/

# Create client
#FROM node as node_builder
#COPY --from=builder /app/dashobard/ . 
RUN cd /app/dashboard && npm install && npm run build
#RUN npm install /app/dashboard/
#RUN npm build /app/dashboard/
RUN ls -lha
RUN ls -lha /app/dashboard/build/

CMD ["./app", "-mongo", "mongodb"]