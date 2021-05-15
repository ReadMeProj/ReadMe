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
	router.PathPrefix("/dashboard").Handler(http.FileServer(http.Dir("./dashboard/build/")))

	serv := &http.Server{
        Addr:         "0.0.0.0:8080",
        Handler:      router,
    }

	serv.ListenAndServe()
}
