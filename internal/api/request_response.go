package api

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

type Response struct {
	Error interface{}
	Data  interface{}
}

func GenerateHandler(responseWriter http.ResponseWriter,
	r *http.Request,
	jsonData interface{}) {

	responseWriter.Header().Set("Content-Type", "application/json")
	responseWriter.Header().Set("Access-Control-Allow-Origin", "*")
	responseWriter.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	responseWriter.WriteHeader(http.StatusOK)
	json.NewEncoder(responseWriter).Encode(jsonData)
}

func ExtractIDStringFromRequest(r *http.Request) string {
	vars := mux.Vars(r)
	var id string
	id = vars["id"]
	return id
}

func ExtractFromRequest(r *http.Request, key string) string {
	vars := mux.Vars(r)
	var val string
	val = vars[key]
	return val
}
