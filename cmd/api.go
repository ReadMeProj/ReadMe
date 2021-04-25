package main

import (
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

var dBase db.ReadMeDatabase

func main() {
	router := mux.NewRouter()

	dBase = db.NewMongoController()

	// REST API
	router.HandleFunc("/api/getUser/{id}", getUser).Methods("GET")
	router.HandleFunc("/api/getUsers", getUsers).Methods("GET")
	router.HandleFunc("/api/getArticle/{id}", getArticle).Methods("GET")
	router.HandleFunc("/api/getArticles", getArticles).Methods("GET")

	http.ListenAndServe(":8081", router)

}
