package main

import (
    "fmt"
    "net/http"
    "encoding/json"
   
    "github.com/RonitPr/ReadMe/internal/db"
    "github.com/gorilla/mux"
)

type User struct {
    Username string
}

type Article struct {
    Name string
}

func getUser(responseWriter http.ResponseWriter, r *http.Request) {
    jsonData := User{Username: "Moshe Sinai"}
    responseWriter.Header().Set("Content-Type", "application/json")
    responseWriter.WriteHeader(http.StatusOK)
    json.NewEncoder(responseWriter).Encode(jsonData)
}

func getUsers(responseWriter http.ResponseWriter, r *http.Request) {
    jsonData := []User {
        User{Username: "Moshe Sinai"},
        User{Username: "Donald Trump"},
    }
    responseWriter.Header().Set("Content-Type", "application/json")
    responseWriter.WriteHeader(http.StatusOK)
    json.NewEncoder(responseWriter).Encode(jsonData)
}

func getArticle(responseWriter http.ResponseWriter, r *http.Request) {
    jsonData := Article{Name: "I like turtles"}
    responseWriter.Header().Set("Content-Type", "application/json")
    responseWriter.WriteHeader(http.StatusOK)
    json.NewEncoder(responseWriter).Encode(jsonData)
}

func getArticles(responseWriter http.ResponseWriter, r *http.Request) {
    jsonData := []Article {
        Article{Name: "I like turtles"},
        Article{Name: "I like turtles 2"},
    }
    responseWriter.Header().Set("Content-Type", "application/json")
    responseWriter.WriteHeader(http.StatusOK)
    json.NewEncoder(responseWriter).Encode(jsonData)
}

func main() {
    router := mux.NewRouter()
    
    var d db.ReadMeDatabase
    
    d = db.NewMongoController()
    fmt.Print(d.GetUser().Username)

    // REST API
    router.HandleFunc("/api/getUser/{userId}", getUser).Methods("GET") 
    router.HandleFunc("/api/getUsers", getUsers).Methods("GET")
    router.HandleFunc("/api/getArtickes/{articleId}", getArticle).Methods("GET") 
    router.HandleFunc("/api/getArticles", getArticles).Methods("GET")

    http.ListenAndServe(":8081", router)

}