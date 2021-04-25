package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	fmt.Println("Starting dashboard server")

	// Main Dashboard
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./dashboard/build/")))

	http.ListenAndServe(":8080", router)
}
