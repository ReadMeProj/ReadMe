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

    http.Handle("/", http.FileServer(http.Dir("./dashboard/build/")))

    http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request){
        fmt.Fprintf(w, "API")
    })

    log.Fatal(http.ListenAndServe(":8080", nil))

    database := db.Database{Name: "SQL"}
    fmt.Print(database)
}