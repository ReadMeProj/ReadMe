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
		"id",
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
		"id",
		db.ID(ExtractIDStringFromRequest(r)),
	)
	response := Response{Error: err, Data: jsonData}
	GenerateHandler(responseWriter, r, response)
}

func getArticleByURL(responseWriter http.ResponseWriter, r *http.Request) {
	url := r.URL.Query().Get("url")
	if url == "" {
		http.Error(responseWriter, "", http.StatusBadRequest)
        return	
	} 

	jsonData, err := dBase.GetArticle(
		"url",
		url,
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
	if err != nil {
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
		responseWriter.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(responseWriter, "Got no URL in request")
        return
    }

	err = validator.New().Struct(article)
	if err != nil { 
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

	err = validator.New().Struct(credentials)
	if err != nil {
		http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return	
	}
	
	token, err := dBase.Login(credentials.Username, credentials.Password)
	if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusUnauthorized)
        return
    }

	response := Response{Error:err, Data: token}
	GenerateHandler(responseWriter, r, response)
}

func logout(responseWriter http.ResponseWriter, r *http.Request) {
	var username string
	
	idStruct := struct{
		Username string
	}{
		Username: username,
	}

	err := json.NewDecoder(r.Body).Decode(&idStruct)
    if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return
    }
	
	err = dBase.Logout(idStruct.Username)
	if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusUnauthorized)
        return
    }

	response := Response{Error:err, Data: nil}
	GenerateHandler(responseWriter, r, response)
}

func isAuthorized(endpoint func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

        if r.Header["Token"] != nil && r.Header["Username"] != nil {
			
			username := r.Header["Username"][0]
			token := r.Header["Token"][0]

			err := dBase.IsAuth(
				username, 
				db.Token(token),
			)

            if err != nil {
                fmt.Fprintf(w, err.Error())
				w.WriteHeader(http.StatusUnauthorized)
				return
            }

            endpoint(w, r)
			return
        } 
        
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "Not Authorized")
    })
}

var dBase db.ReadMeDatabase
func StartAPIServer(mongoIP string) {
	router := mux.NewRouter()

	fmt.Println("Starting API server")

	dBase = db.NewMongoController(mongoIP)

	// REST API
	router.HandleFunc("/api/getUser/{id}", isAuthorized(getUser)).Methods("GET").Headers()
	router.HandleFunc("/api/getUsers", getUsers).Methods("GET")
	router.HandleFunc("/api/getArticle/{id}", isAuthorized(getArticle)).Methods("GET")
	router.HandleFunc("/api/getArticle", isAuthorized(getArticleByURL)).Methods("GET")
	router.HandleFunc("/api/getArticles", getArticles).Methods("GET")

	router.HandleFunc("/api/newUser", newUser).Methods("PUT")
	router.HandleFunc("/api/newArticle", newArticle).Methods("PUT")
	router.HandleFunc("/api/updateUser", updateUser).Methods("POST")
	router.HandleFunc("/api/updateArticle", updateArticle).Methods("POST")

	router.HandleFunc("/api/login", login).Methods("POST")
	router.HandleFunc("/api/logout", isAuthorized(logout)).Methods("POST")
	
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./dashboard/build/")))

	serv := &http.Server{
        Addr:         "0.0.0.0:8080",
        Handler:      router,
    }

	serv.ListenAndServe()
}