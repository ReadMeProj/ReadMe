package main

import (
    "net/http"
   
    "github.com/gorilla/mux"
)

func main() {
    router := mux.NewRouter()

    // Main Dashboard
    router.PathPrefix("/").Handler(http.FileServer(http.Dir("./dashboard/build/")))

    http.ListenAndServe(":8080", router)
}