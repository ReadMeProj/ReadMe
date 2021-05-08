package api

import (
	"ReadMe/internal/db"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/go-playground/validator"
)

func getUser(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := dBase.GetUser(
		db.ID(ExtractIDStringFromRequest(r)),
	)
	response := Response{Error: err, Data: jsonData}

	GenerateHandler(responseWriter, r, response)
}

func getUsers(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := dBase.GetUsers()
	response := Response{Error: err, Data: jsonData}

	GenerateHandler(responseWriter, r, response)
}

func getArticle(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := dBase.GetArticle(
		db.ID(ExtractIDStringFromRequest(r)),
	)
	response := Response{Error: err, Data: jsonData}
	GenerateHandler(responseWriter, r, response)
}

func getArticles(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := dBase.GetArticles()
	response := Response{Error: err, Data: jsonData}
	GenerateHandler(responseWriter, r, response)
}

func newUser(responseWriter http.ResponseWriter, r *http.Request) {
	var user db.User

	err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return
    }

	err = validator.New().Struct(user)
	valErr := err.(validator.ValidationErrors)
	if err != nil || valErr != nil {
		http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return	
	}
	
	err = dBase.NewUser(user)
	response := Response{Error:err, Data: user}
	GenerateHandler(responseWriter, r, response)
}

func newArticle(responseWriter http.ResponseWriter, r *http.Request) {
	var article db.Article
	
	err := json.NewDecoder(r.Body).Decode(&article)
    if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return
    }

	err = validator.New().Struct(article)
	valErr := err.(validator.ValidationErrors)
	if err != nil || valErr != nil {
		http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return	
	}

	err = dBase.NewArticle(article)
	response := Response{Error:err, Data: article}
	GenerateHandler(responseWriter, r, response)
}

func updateUser(responseWriter http.ResponseWriter, r *http.Request) {
	var user db.User

	err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return
    } 
	
	err = dBase.UpdateUser(user)
	response := Response{Error:err, Data: nil}
	GenerateHandler(responseWriter, r, response)
}

func updateArticle(responseWriter http.ResponseWriter, r *http.Request) {
	var article db.Article
	
	err := json.NewDecoder(r.Body).Decode(&article)
    if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return
    }
	
	err = dBase.UpdateArticle(article)
	response := Response{Error:err, Data: nil}
	GenerateHandler(responseWriter, r, response)
}

func login(responseWriter http.ResponseWriter, r *http.Request) {
	var credentials db.Credentials
	
	err := json.NewDecoder(r.Body).Decode(&credentials)
    if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return
    }
	
	token, err := dBase.Login(credentials.ID, credentials.Password)
	if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusUnauthorized)
        return
    }

	response := Response{Error:err, Data: token}
	GenerateHandler(responseWriter, r, response)
}

func logout(responseWriter http.ResponseWriter, r *http.Request) {

}

func isAuthorized(endpoint func(http.ResponseWriter, *http.Request)) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

        if r.Header["Token"] != nil && r.Header["UserId"] != nil {
			
			userId := r.Header["UserID"][0]
			token := r.Header["Token"][0]

			err := dBase.IsAuth(
				db.ID(userId), 
				db.Token(token),
			)

            if err != nil {
                fmt.Fprintf(w, err.Error())
            }

            endpoint(w, r)
			return
        } 
        
		fmt.Fprintf(w, "Not Authorized")
    })
}

var dBase db.ReadMeDatabase
func StartAPIServer(mongoIP string) {
	router := mux.NewRouter()

	fmt.Println("Starting API server")

	dBase = db.NewMongoController(mongoIP)

	// REST API
	router.HandleFunc("/api/getUser/{id}", getUser).Methods("GET").Headers()
	router.HandleFunc("/api/getUsers", getUsers).Methods("GET")
	router.HandleFunc("/api/getArticle/{id}", getArticle).Methods("GET")
	router.HandleFunc("/api/getArticles", getArticles).Methods("GET")

	router.HandleFunc("/api/newUser", newUser).Methods("PUT")
	router.HandleFunc("/api/newArticle", newArticle).Methods("PUT")
	router.HandleFunc("/api/updateUser", updateUser).Methods("POST")
	router.HandleFunc("/api/updateArticle", updateArticle).Methods("POST")

	router.HandleFunc("/login", login).Methods("POST")
	router.HandleFunc("/logout", logout).Methods("POST")
	
	serv := &http.Server{
        Addr:         "0.0.0.0:8081",
        Handler:      router,
    }

	serv.ListenAndServe()
}