package main

import (
    "fmt"
    //"html"
    "log"
    "net/http"
    "github.com/RonitPr/ReadMe/internal/db"
)

func getDashboard(w http.ResponseWriter, r *http.Request) {

}

func main() {

    //http.HandleFunc("/", http.FileServer(http.Dir("./src/dashboard/static/index.html")))

    http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request){
        fmt.Fprintf(w, "API")
    })

    log.Fatal(http.ListenAndServe(":8080", nil))

    Database := db.Database("SQL")

}