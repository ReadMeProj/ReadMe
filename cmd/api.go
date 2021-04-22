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


func __convert(jsonData interface{}) func(responseWriter http.ResponseWriter, r *http.Request) {
    return func(responseWriter http.ResponseWriter, r *http.Request) {
        responseWriter.Header().Set("Content-Type", "application/json")
        responseWriter.WriteHeader(http.StatusOK)
        json.NewEncoder(responseWriter).Encode(jsonData)
    }
}

func convertWithID(f func(id db.ID) db.User) func(responseWriter http.ResponseWriter, r *http.Request) {
    return func(responseWriter http.ResponseWriter, r *http.Request) {
        vars := mux.Vars(r)
        var id string
        id = vars["id"]

        jsonData := f(db.ID(id))

        responseWriter.Header().Set("Content-Type", "application/json")
        responseWriter.WriteHeader(http.StatusOK)

        json.NewEncoder(responseWriter).Encode(jsonData)
    }
}


var d db.ReadMeDatabase

func main() {
    router := mux.NewRouter()
    
    d = db.NewMongoController()
    fmt.Print(d.GetUser("Oved").Username)

    // REST API
    router.HandleFunc("/api/getUser/{id}", convertWithID(d.GetUser)).Methods("GET") 
    router.HandleFunc("/api/getUsers", getUsers).Methods("GET")
    router.HandleFunc("/api/getArtickes/{id}", getArticle).Methods("GET") 
    router.HandleFunc("/api/getArticles", getArticles).Methods("GET")

    http.ListenAndServe(":8081", router)

}