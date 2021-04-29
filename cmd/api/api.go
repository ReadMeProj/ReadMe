package main

import (
	"ReadMe/internal/api"
	"flag"
)


func main() {
	mongoIP := flag.String("mongo", "0.0.0.0", "One of '0.0.0.0', 'localhost' (running local) or 'mongodb' (running with Docker)")

	flag.Parse()

	api.StartAPIServer(*mongoIP)
}
