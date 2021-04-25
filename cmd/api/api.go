package main

import (
	"fmt"
	"net/http"

	"ReadMe/internal/api"
	"ReadMe/internal/db"

	"github.com/gorilla/mux"
)

func getUser(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := dBase.GetUser(
		db.ID(api.ExtractIDStringFromRequest(r)),
	)
	response := api.Response{Error: err, Data: jsonData}

	api.GenerateHandler(responseWriter, r, response)
}

func getUsers(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := dBase.GetUsers()
	response := api.Response{Error: err, Data: jsonData}

	api.GenerateHandler(responseWriter, r, response)
}

func getArticle(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := dBase.GetArticle(
		db.ID(api.ExtractIDStringFromRequest(r)),
	)
	response := api.Response{Error: err, Data: jsonData}
	api.GenerateHandler(responseWriter, r, response)
}

func getArticles(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := dBase.GetArticles()
	response := api.Response{Error: err, Data: jsonData}
	api.GenerateHandler(responseWriter, r, response)
}

func newUser(responseWriter http.ResponseWriter, r *http.Request) {
	user := db.User{}
	user.Username = api.TokenGenerator(6) 
	user.ID = db.ID(api.TokenGenerator(10))
	
	err := dBase.NewUser(user)
	response := api.Response{Error:err, Data: nil}
	api.GenerateHandler(responseWriter, r, response)
}

func newArticle(responseWriter http.ResponseWriter, r *http.Request) {
	article := db.Article{}
	article.Name = api.TokenGenerator(6) 
	article.ID = db.ID(api.TokenGenerator(10))
	
	err := dBase.NewArticle(article)
	response := api.Response{Error:err, Data: nil}
	api.GenerateHandler(responseWriter, r, response)
}

func updateUser(responseWriter http.ResponseWriter, r *http.Request) {
	user := db.User{}
	user.Username = api.TokenGenerator(6) 
	user.ID = "Oved" 
	
	err := dBase.UpdateUser(user)
	response := api.Response{Error:err, Data: nil}
	api.GenerateHandler(responseWriter, r, response)
}

func updateArticle(responseWriter http.ResponseWriter, r *http.Request) {
	article := db.Article{}
	article.Name = api.TokenGenerator(6) 
	article.ID = "abcdefghijk"
	
	err := dBase.NewArticle(article)
	response := api.Response{Error:err, Data: nil}
	api.GenerateHandler(responseWriter, r, response)
}


var dBase db.ReadMeDatabase

func main() {
	router := mux.NewRouter()

	fmt.Println("Starting API server")

	dBase = db.NewMongoController()

	// REST API
	router.HandleFunc("/api/getUser/{id}", getUser).Methods("GET")
	router.HandleFunc("/api/getUsers", getUsers).Methods("GET")
	router.HandleFunc("/api/getArticle/{id}", getArticle).Methods("GET")
	router.HandleFunc("/api/getArticles", getArticles).Methods("GET")

	router.HandleFunc("/api/newUser", newUser).Methods("GET")
	router.HandleFunc("/api/newArticle", newArticle).Methods("GET")
	router.HandleFunc("/api/updateUser", updateUser).Methods("GET")
	router.HandleFunc("/api/updateArticle", updateArticle).Methods("GET")

	serv := &http.Server{
        Addr:         "0.0.0.0:8081",
        Handler:      router,
    }

	serv.ListenAndServe()
}
