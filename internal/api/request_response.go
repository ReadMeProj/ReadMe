package api

import (
    "net/http"
    "encoding/json"
   
    "github.com/gorilla/mux"
)

type Response struct {
	Error		interface{}
	Data 		interface{}
}

func GenerateHandler(responseWriter http.ResponseWriter, 
	r *http.Request,
	jsonData interface{}) {

	responseWriter.Header().Set("Content-Type", "application/json")
	responseWriter.WriteHeader(http.StatusOK)
	json.NewEncoder(responseWriter).Encode(jsonData)
}

func ExtractIDStringFromRequest(r *http.Request) string {
	vars := mux.Vars(r)
	var id string
	id = vars["id"]
	return id 
}

