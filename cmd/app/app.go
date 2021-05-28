package main

import (
	"ReadMe/internal/api"
	"flag"
)


func main() {
	mongoIP := flag.String("mongo", "0.0.0.0", "One of '0.0.0.0', 'localhost' (running local) or 'mongodb' (running with Docker)")
	recommendationsIPort := flag.String("recommendations", "http://20.71.92.74:8081", "One of 'http://localhost:8081' (local) or 'http://20.71.92.74:8081' (server)")

	flag.Parse()

	api.StartAPIServer(*mongoIP, *recommendationsIPort)
}
