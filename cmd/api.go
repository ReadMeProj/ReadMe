package main

import (
    "fmt"
    "net/http"
   
    "ReadMe/internal/db"
    "github.com/gorilla/mux"
    "ReadMe/internal/api"
)

func getUser(responseWriter http.ResponseWriter, r *http.Request) {
    jsonData := dBase.GetUser(
        db.ID(api.ExtractIDStringFromRequest(r)),
    )
    api.GenerateHandler(responseWriter, r, jsonData)
}

func getUsers(responseWriter http.ResponseWriter, r *http.Request) {
    jsonData := dBase.GetUsers()
    api.GenerateHandler(responseWriter, r, jsonData)
}

func getArticle(responseWriter http.ResponseWriter, r *http.Request) {
    jsonData := dBase.GetArticle(
        db.ID(api.ExtractIDStringFromRequest(r)),
    )
    api.GenerateHandler(responseWriter, r, jsonData)
}

func getArticles(responseWriter http.ResponseWriter, r *http.Request) {
    jsonData := dBase.GetArticles()
    api.GenerateHandler(responseWriter, r, jsonData)
}

var dBase db.ReadMeDatabase

func main() {
    router := mux.NewRouter()
    
    dBase = db.NewMongoController()
    fmt.Print(dBase.GetUser("Oved").Username)

    // REST API
    router.HandleFunc("/api/getUser/{id}", getUser).Methods("GET") 
    router.HandleFunc("/api/getUsers", getUsers).Methods("GET")
    router.HandleFunc("/api/getArtickes/{id}", getArticle).Methods("GET") 
    router.HandleFunc("/api/getArticles", getArticles).Methods("GET")

    http.ListenAndServe(":8081", router)

}