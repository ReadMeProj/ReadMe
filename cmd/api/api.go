package main

import (
	"ReadMe/internal/api"
	"ReadMe/internal/db"
	"encoding/json"
	"fmt"
	"net/http"
	"flag"

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
	var user db.User

	err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return
    }
	
	err = dBase.NewUser(user)
	response := api.Response{Error:err, Data: user}
	api.GenerateHandler(responseWriter, r, response)
}

func newArticle(responseWriter http.ResponseWriter, r *http.Request) {
	var article db.Article
	
	err := json.NewDecoder(r.Body).Decode(&article)
    if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return
    }

	err = dBase.NewArticle(article)
	response := api.Response{Error:err, Data: article}
	api.GenerateHandler(responseWriter, r, response)
}

func updateUser(responseWriter http.ResponseWriter, r *http.Request) {
	var user db.User

	err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return
    } 
	
	err = dBase.UpdateUser(user)
	response := api.Response{Error:err, Data: nil}
	api.GenerateHandler(responseWriter, r, response)
}

func updateArticle(responseWriter http.ResponseWriter, r *http.Request) {
	var article db.Article
	
	err := json.NewDecoder(r.Body).Decode(&article)
    if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return
    }
	
	err = dBase.UpdateArticle(article)
	response := api.Response{Error:err, Data: nil}
	api.GenerateHandler(responseWriter, r, response)
}

func startAPIServer(mongoIP string) {
	router := mux.NewRouter()

	fmt.Println("Starting API server")

	dBase = db.NewMongoController(mongoIP)

	// REST API
	router.HandleFunc("/api/getUser/{id}", getUser).Methods("GET")
	router.HandleFunc("/api/getUsers", getUsers).Methods("GET")
	router.HandleFunc("/api/getArticle/{id}", getArticle).Methods("GET")
	router.HandleFunc("/api/getArticles", getArticles).Methods("GET")

	router.HandleFunc("/api/newUser", newUser).Methods("PUT")
	router.HandleFunc("/api/newArticle", newArticle).Methods("PUT")
	router.HandleFunc("/api/updateUser", updateUser).Methods("POST")
	router.HandleFunc("/api/updateArticle", updateArticle).Methods("POST")

	serv := &http.Server{
        Addr:         "0.0.0.0:8081",
        Handler:      router,
    }

	serv.ListenAndServe()
}

var dBase db.ReadMeDatabase

func main() {
	mongoIP := flag.String("mongo", "0.0.0.0", "One of '0.0.0.0', 'localhost' (running local) or 'mongodb' (running with Docker)")

	flag.Parse()

	startAPIServer(*mongoIP)
}
