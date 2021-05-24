package api

import (
	"ReadMe/internal/db"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

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

func getComments(key string, value interface{}) (interface{}, error) {
	jsonData, err := dBase.GetComments(
		key,
		value,
	)

	return jsonData, err 
}

func getCommentsByArticle(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := getComments(
		"articleid",
		db.ID(ExtractIDStringFromRequest(r)),	
	)
	response := Response{Error: err, Data: jsonData}
	GenerateHandler(responseWriter, r, response)
}

func getCommentsByUser(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := getComments(
		"userid",
		db.ID(ExtractIDStringFromRequest(r)),
	)
	response := Response{Error: err, Data: jsonData}
	GenerateHandler(responseWriter, r, response)
}

func getFavorites(key string, value interface{}) (interface{}, error) {
	jsonData, err := dBase.GetFavorites(
		key,
		value,
	)

	return jsonData, err 
}

func getFavoritesByArticle(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := getFavorites(
		"articleid",
		db.ID(ExtractIDStringFromRequest(r)),	
	)
	response := Response{Error: err, Data: jsonData}
	GenerateHandler(responseWriter, r, response)
}

func getFavoritesByUser(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := getFavorites(
		"userid",
		db.ID(ExtractIDStringFromRequest(r)),	
	)
	response := Response{Error: err, Data: jsonData}
	GenerateHandler(responseWriter, r, response)
}

func getFavoriteByUserArticle(w http.ResponseWriter, r *http.Request) {
	articleid  := ExtractFromRequest(r, "articleid")
	userid     := ExtractFromRequest(r, "userid")

	jsonData, err := dBase.GetFavorite("articleid", articleid, "userid", userid)
	if err != nil {
		fmt.Println(err)
	}

	response := Response{Error: err, Data: jsonData}
	GenerateHandler(w, r, response)
}

func getRequests(key string, value interface{}) (interface{}, error) {
	jsonData, err := dBase.GetRequests(
		key,
		value,
	)

	return jsonData, err 
}

func getRequestsByArticle(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := getRequests(
		"articleid",
		db.ID(ExtractIDStringFromRequest(r)),	
	)
	response := Response{Error: err, Data: jsonData}
	GenerateHandler(responseWriter, r, response)
}

func getRequestsByUser(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := getRequests(
		"requestedby",
		db.ID(ExtractIDStringFromRequest(r)),	
	)
	response := Response{Error: err, Data: jsonData}
	GenerateHandler(responseWriter, r, response)
}

func getAnswers(key string, value interface{}) (interface{}, error) {
	jsonData, err := dBase.GetAnswers(
		key,
		value,
	)

	return jsonData, err 
}

func getAnswersByArticle(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := getAnswers(
		"articleid",
		db.ID(ExtractIDStringFromRequest(r)),	
	)
	response := Response{Error: err, Data: jsonData}
	GenerateHandler(responseWriter, r, response)
}

func getAnswersByUser(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := getAnswers(
		"userid",
		db.ID(ExtractIDStringFromRequest(r)),	
	)
	response := Response{Error: err, Data: jsonData}
	GenerateHandler(responseWriter, r, response)
}

func getReports(key string, value interface{}) (interface{}, error) {
	jsonData, err := dBase.GetReports(
		key,
		value,
	)

	return jsonData, err 
}

func getReportsByArticle(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := getReports(
		"articleid",
		db.ID(ExtractIDStringFromRequest(r)),	
	)
	response := Response{Error: err, Data: jsonData}
	GenerateHandler(responseWriter, r, response)
}

func getReportsByUser(responseWriter http.ResponseWriter, r *http.Request) {
	jsonData, err := getReports(
		"userid",
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

func newFavorite(responseWriter http.ResponseWriter, r *http.Request) {
	var favorite db.Favorite

	err := json.NewDecoder(r.Body).Decode(&favorite)
    if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return
    }

	err = validator.New().Struct(favorite)
	if err != nil {
		http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return	
	}
	
	err = dBase.NewFavorite(favorite)
	response := Response{Error:err, Data: favorite}
	GenerateHandler(responseWriter, r, response)
}

func newComment(responseWriter http.ResponseWriter, r *http.Request) {
	var comment db.Comment

	err := json.NewDecoder(r.Body).Decode(&comment)
    if err != nil {
        http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return
    }

	err = validator.New().Struct(comment)
	if err != nil {
		http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return	
	}
	
	err = dBase.NewComment(comment)
	response := Response{Error:err, Data: comment}
	GenerateHandler(responseWriter, r, response)
}

func decodeAndValidate(w http.ResponseWriter, r *http.Request, pObj interface{}) error {
	err := json.NewDecoder(r.Body).Decode(pObj)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return err
    }

	err = validator.New().Struct(&pObj)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
        return err	
	}

	return err
}

func newRequest(w http.ResponseWriter, r *http.Request) {
	var request db.Request
	
	err := json.NewDecoder(r.Body).Decode(&request)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return 
    }

	err = validator.New().Struct(request)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
        return 
	}

	err = dBase.NewRequest(request)
	response := Response{Error:err, Data: request}
	GenerateHandler(w, r, response)
}

func newAnswer(w http.ResponseWriter, r *http.Request) {
	var answer db.Answer
	
	err := json.NewDecoder(r.Body).Decode(&answer)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return 
    }

	err = validator.New().Struct(answer)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
        return 
	}

	err = dBase.NewAnswer(answer)
	response := Response{Error:err, Data: answer}
	GenerateHandler(w, r, response)
}

func newReport(w http.ResponseWriter, r *http.Request) {
	var report db.Report
	
	err := json.NewDecoder(r.Body).Decode(&report)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return 
    }

	err = validator.New().Struct(report)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
        return 
	}

	err = dBase.NewReport(report)
	response := Response{Error:err, Data: report}
	GenerateHandler(w, r, response)
}

func updateUser(w http.ResponseWriter, r *http.Request) {
	var user db.User

	err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    } 
	
	err = dBase.UpdateUser(user)
	response := Response{Error:err, Data: nil}
	GenerateHandler(w, r, response)
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

func updateAnswer(w http.ResponseWriter, r *http.Request) {
	var answer db.Answer
	
	err := json.NewDecoder(r.Body).Decode(&answer)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
	
	err = dBase.UpdateAnswer(answer)
	response := Response{Error:err, Data: nil}
	GenerateHandler(w, r, response)
}

func updateRequest(w http.ResponseWriter, r *http.Request) {
	var request db.Request
	
	err := json.NewDecoder(r.Body).Decode(&request)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
	
	err = dBase.UpdateRequest(request)
	response := Response{Error:err, Data: nil}
	GenerateHandler(w, r, response)
}

func updateReport(w http.ResponseWriter, r *http.Request) {
	var report db.Report
	
	err := json.NewDecoder(r.Body).Decode(&report)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
	
	err = dBase.UpdateReport(report)
	response := Response{Error:err, Data: nil}
	GenerateHandler(w, r, response)
}

func getByKey(w http.ResponseWriter, r *http.Request) {
	_type := ExtractFromRequest(r, "type")
	_type = strings.ToLower(_type)
	key   := ExtractFromRequest(r, "key")
	val   := ExtractFromRequest(r, "val")

	fmt.Printf("type=%s, key=%s, val=%s", _type, key, val)
	
	err := error(nil)
	dbName := "ReadMeDB"
	collection := ""
	response := Response{}

	switch _type {
	case "user":
		var data db.User
		collection = "users"
		err = dBase.GetByKey(dbName, collection, key, val, &data)
		response = Response{Error:err, Data: data}
	case "article":
		var data db.Article 
		collection = "articles"
		err = dBase.GetByKey(dbName, collection, key, val, &data)
		response = Response{Error:err, Data: data}
	case "request":
		var data db.Request 
		collection = "requests"
		err = dBase.GetByKey(dbName, collection, key, val, &data)
		response = Response{Error:err, Data: data}
	case "answer":
		var data db.Answer 
		collection = "answers"
		err = dBase.GetByKey(dbName, collection, key, val, &data)
		response = Response{Error:err, Data: data}
	case "report":
		var data db.Report 
		collection = "reports"
		err = dBase.GetByKey(dbName, collection, key, val, &data)
		response = Response{Error:err, Data: data}
	default:
		http.Error(w, err.Error(), http.StatusBadRequest)
        return
	}
	
	GenerateHandler(w, r, response)	
}

func getVoteRegistry(w http.ResponseWriter, r *http.Request) {
	userID := ExtractFromRequest(r, "userid")
	itemID := ExtractFromRequest(r, "itemid")

	var vote db.VoteRegistery
	err := dBase.GetByDoubleKey("ReadMeDB", "votes", "userid", userID, "itemid", itemID, &vote)
	if err != nil {
		fmt.Println(err)
	}
	response := Response{Error:err, Data: vote}
	GenerateHandler(w, r, response)	
}

func updateVotes(w http.ResponseWriter, r *http.Request) {	
	_type := ExtractFromRequest(r, "type")
	_type = strings.ToLower(_type)
	id   := ExtractFromRequest(r, "id")
	var vote string 
	vote = ExtractFromRequest(r, "vote")
	vote = strings.ToLower(vote)
	username := r.Header["Username"][0]
	user, err := dBase.GetUser("username", username)
	println(username, user.Username, user.ID)
	if err != nil {
		http.Error(w, "Problem with provided username", http.StatusBadRequest)
		fmt.Println(err)
        return
	}

	fmt.Printf("type=%s, id=%s, vote=%s", _type, id, vote)
	
	if vote != "up" && vote != "down" {
		http.Error(w, "Vote should be either up or down", http.StatusBadRequest)
        return
	}

	incrementBy := 1

	err = error(nil)
	dbName := "ReadMeDB"
	switch _type {
	case "article":
		increment := fmt.Sprintf("%s.%s", "fakevotes", vote)
		fmt.Printf("Update article votes: increment=%s, id=%s", increment, id)
		err = dBase.IncrementOneInDB(dbName, "articles", "id", id, increment, incrementBy)
	case "request":
		increment := fmt.Sprintf("%s.%s", "votes", vote)
		fmt.Printf("Update request votes: increment=%s, id=%s", increment, id)
		err = dBase.IncrementOneInDB(dbName, "requests", "id", id, increment, incrementBy)
	case "answer":
		increment := fmt.Sprintf("%s.%s", "votes", vote)
		fmt.Printf("Update answer votes: increment=%s, id=%s", increment, id)
		err = dBase.IncrementOneInDB(dbName, "answers", "id", id, increment, incrementBy)
	case "report":
		increment := fmt.Sprintf("%s.%s", "votes", vote)
		fmt.Printf("Update report votes: increment=%s, id=%s", increment, id)
		err = dBase.IncrementOneInDB(dbName, "reports", "id", id, increment, incrementBy)
	default:
		http.Error(w, err.Error(), http.StatusBadRequest)
        return
	}
	
	// Register vote in mongo
	if err == nil {
		var voteReg db.VoteRegistery
		voteReg = db.VoteRegistery{
			UserID: user.ID,
			ItemID: db.ID(id),
			Up: vote == "up",
		}
		err = dBase.NewVoteRegistry(voteReg)
	} 

	response := Response{Error:err, Data: nil}
	GenerateHandler(w, r, response)	
}

func login(w http.ResponseWriter, r *http.Request) {
	var credentials db.Credentials
	
	err := json.NewDecoder(r.Body).Decode(&credentials)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

	err = validator.New().Struct(credentials)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
        return	
	}
	
	user, err := dBase.GetUser("username", credentials.Username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
        return		
	}

	token, err := dBase.Login(credentials.Username, credentials.Password)
	if err != nil {
        http.Error(w, err.Error(), http.StatusUnauthorized)
        return
    }

	idToken := struct {
		ID 		db.ID `json:"id"`
		Token	db.Token `json:"token"`
	}{
		ID: db.ID(user.ID),
		Token: db.Token(token),
	}

	response := Response{Error:err, Data: idToken}
	GenerateHandler(w, r, response)
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

	router.HandleFunc("/api/getFavorites/user/{id}", getFavoritesByUser).Methods("GET")
	router.HandleFunc("/api/getFavorites/article/{id}", getFavoritesByArticle).Methods("GET")
	router.HandleFunc("/api/favorite/article/{articleid}/user/{userid}", getFavoriteByUserArticle).Methods("GET")
	router.HandleFunc("/api/getComments/user/{id}", getCommentsByUser).Methods("GET")
	router.HandleFunc("/api/getComments/article/{id}", getCommentsByArticle).Methods("GET")

	router.HandleFunc("/api/getRequests/user/{id}", getRequestsByUser).Methods("GET")
	router.HandleFunc("/api/getRequests/article/{id}", getRequestsByArticle).Methods("GET")
	router.HandleFunc("/api/getAnswers/user/{id}", getAnswersByUser).Methods("GET")
	router.HandleFunc("/api/getAnswers/article/{id}", getAnswersByArticle).Methods("GET")
	router.HandleFunc("/api/getReports/user/{id}", getReportsByUser).Methods("GET")
	router.HandleFunc("/api/getReports/article/{id}", getReportsByArticle).Methods("GET")

	router.HandleFunc("/api/newFavorite", newFavorite).Methods("PUT")
	router.HandleFunc("/api/newComment", newComment).Methods("PUT")
	router.HandleFunc("/api/newRequest", newRequest).Methods("PUT")
	router.HandleFunc("/api/newAnswer", newAnswer).Methods("PUT")
	router.HandleFunc("/api/newReport", newReport).Methods("PUT")
	router.HandleFunc("/api/updateAnswer", updateAnswer).Methods("POST")
	router.HandleFunc("/api/updateRequest", updateRequest).Methods("POST")
	router.HandleFunc("/api/updateReport", updateReport).Methods("POST")

	router.HandleFunc("/api/votes/{type}/{id}/{vote}", isAuthorized(updateVotes)).Methods("POST")
	router.HandleFunc("/api/{type}/{key}/{val}", getByKey).Methods("GET")
	router.HandleFunc("/api/vote/{itemid}/user/{userid}", getVoteRegistry).Methods("GET")

	router.HandleFunc("/api/login", login).Methods("POST")
	router.HandleFunc("/api/logout", isAuthorized(logout)).Methods("POST")
	
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./dashboard/build/")))

	serv := &http.Server{
        Addr:         "0.0.0.0:8080",
        Handler:      router,
    }

	serv.ListenAndServe()
}