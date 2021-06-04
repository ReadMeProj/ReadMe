package api

import (
	"ReadMe/internal/db"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"errors"
	"log"
	"strconv"

	"github.com/go-playground/validator"
	"github.com/gorilla/mux"
)

// DB meta constants
const mongoDatabaseName = "ReadMeDB"
const mongoUsersCollectionName = "users"
const mongoArticlesCollectionName = "articles"
const mongoFavoritesCollectionName = "favorites"
const mongoCommentsCollectionName = "comments"
const mongoRequestsCollectionName = "requests"
const mongoAnswersCollectionName = "answers"
const mongoReportsCollectionName = "reports"
const mongoVotesCollectionName = "votes"
const mongoTagsCollectionName = "tags"
const mongoCollectionIDKey = "id"

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

func getRequestsByQuery(responseWriter http.ResponseWriter, r *http.Request) {
	query := ExtractFromRequest(r, "query")

	jsonData, err := dBase.GetRequestsByQuery(query)
	
	response := Response{Error: err, Data: jsonData}
	GenerateHandler(responseWriter, r, response)
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

func getAllRequests(w http.ResponseWriter, r *http.Request){
	which := ExtractFromRequest(r, "which")
	if which == "" {
		http.Error(w, "which should be one of (open, close, all)", http.StatusBadRequest)
        return		
	}

	limit := ExtractFromRequest(r, "limit")
	limitInt, err := strconv.Atoi(limit)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
        return		
	}

	jsonData, err := dBase.GetAllRequests(which)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
        return		
	}

	if limitInt > len(jsonData) { 
		limitInt = len(jsonData)
	}

	jsonData = jsonData[:limitInt]
	response := Response{Error: err, Data: jsonData}
	GenerateHandler(w, r, response)	
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

func getArticlesByQuery(responseWriter http.ResponseWriter, r *http.Request) {
	query := ExtractFromRequest(r, "query")

	jsonData, err := dBase.GetArticlesByQuery(query)
	
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
	
	err = dBase.NewUser(&user)
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
	if err != nil { 
		http.Error(responseWriter, err.Error(), http.StatusBadRequest)
        return	
	}

	err = dBase.NewArticle(&article)
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

	var favoriteInDB db.Favorite
	favoriteInDB, err = dBase.GetFavorite("userid", favorite.UserID, "articleid", string(favorite.ArticleID))
	if favoriteInDB.ArticleID != "" {
		response := Response{Error:errors.New("User already favorites article").Error(), Data: nil}
		GenerateHandler(responseWriter, r, response)
		return 	
	}
	
	err = dBase.NewFavorite(&favorite)
	response := Response{Error:nil, Data: favorite}
	GenerateHandler(responseWriter, r, response)
}

func deleteFavorite(w http.ResponseWriter, r *http.Request) {
	var favorite db.Favorite

	err := json.NewDecoder(r.Body).Decode(&favorite)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

	if favorite.ArticleID == "" || favorite.UserID == "" {
		http.Error(w, errors.New("Got no articleid or userid in request body").Error(), http.StatusBadRequest)
        return	
	}

	var keys []string
	var vals []interface{}
	keys = append(keys, "userid")
	keys = append(keys, "articleid")
	vals = append(vals, favorite.UserID)
	vals = append(vals, favorite.ArticleID)

	err = dBase.DeleteAllByKey(mongoDatabaseName, mongoFavoritesCollectionName, keys, vals)
	response := Response{Error:err, Data: favorite}
	GenerateHandler(w, r, response)
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
	
	err = dBase.NewComment(&comment)
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

	err = dBase.NewRequest(&request)
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

	err = dBase.NewAnswer(&answer)
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

	err = dBase.NewReport(&report)
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
	case "tag":
		var data db.Tag
		collection = "tags"
		err = dBase.GetByKey(dbName, collection, key, val, &data)
		response = Response{Error:err, Data: data}
	default:
		http.Error(w, err.Error(), http.StatusBadRequest)
        return
	}
	
	GenerateHandler(w, r, response)	
}

func getAllByKey(w http.ResponseWriter, r *http.Request) {
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
		var data []db.User
		collection = "users"
		err = dBase.GetAllByKey(dbName, collection, key, val, &data)
		response = Response{Error:err, Data: data}
	case "article":
		var data []db.Article 
		collection = "articles"
		err = dBase.GetAllByKey(dbName, collection, key, val, &data)
		response = Response{Error:err, Data: data}
	case "request":
		var data []db.Request 
		collection = "requests"
		err = dBase.GetAllByKey(dbName, collection, key, val, &data)
		response = Response{Error:err, Data: data}
	case "answer":
		var data []db.Answer 
		collection = "answers"
		err = dBase.GetAllByKey(dbName, collection, key, val, &data)
		response = Response{Error:err, Data: data}
	case "report":
		var data []db.Report 
		collection = "reports"
		err = dBase.GetAllByKey(dbName, collection, key, val, &data)
		response = Response{Error:err, Data: data}
	case "tag":
		var data []db.Tag
		collection = "tags"
		err = dBase.GetAllByKey(dbName, collection, key, val, &data)
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
	println(username)
	if err != nil {
		http.Error(w, fmt.Sprintf("Problem with username=%s", username), http.StatusBadRequest)
		fmt.Println(err)
        return
	}

	fmt.Printf("type=%s, id=%s, ote=%s", _type, id, vote)
	
	if vote != "up" && vote != "down" && vote != "none" {
		http.Error(w, "Vote should be either up, down or none", http.StatusBadRequest)
        return
	}

	var voteReg db.VoteRegistery
	err = dBase.GetByDoubleKey("ReadMeDB", "votes", "userid", user.ID, "itemid", id, &voteReg)
	// If we get into this branch then user already voted the item
	updatePreviousVote := false 
	if err == nil {
		if voteReg.Up && vote == "up" || (!voteReg.Up && vote == "down") {
			// It's the same vote and we'll return 200
			log.Println("err == nil branch 1")
			response := Response{Error:nil, Data:nil}
			GenerateHandler(w, r, response)
			return

		} else {
			// Delete user's vote from registry and update votes 
			log.Println("err == nil branch 2")
			var keys []string
			var vals []interface{}
			keys = append(keys, "userid")
			keys = append(keys, "itemid")
			vals = append(vals, user.ID)
			vals = append(vals, id) 
			err = dBase.DeleteAllByKey(mongoDatabaseName, mongoVotesCollectionName, keys, vals)
			updatePreviousVote = true
		} 
	}

	incrementBy := 1

	err = error(nil)
	dbName := "ReadMeDB"
	collection := ""
	voteName := ""
	switch _type {
	case "article":
		voteName = "fakevotes"
		collection = "articles"
	case "request":
		voteName = "votes"
		collection = "requests"
	case "answer":
		voteName = "votes"
		collection = "answers"
	case "report":
		voteName = "votes"
		collection = "reports"
	default:
		http.Error(w, err.Error(), http.StatusBadRequest)
        return
	}
	fmt.Printf("Update: voteName=%s, id=%s", voteName, id)
	// If it's vote none, we only need to decrement votes
	if vote != "none" {
		log.Println("vote != none, make vote")
		err = dBase.IncrementOneInDB(dbName, collection, "id", id, fmt.Sprintf("%s.%s", voteName, vote), incrementBy)
	} 
	
	voteRegVote := "up"
	if !voteReg.Up {
		voteRegVote = "down"
	} 
	if updatePreviousVote {
		log.Println("Update previous vote")
		err = dBase.IncrementOneInDB(dbName, collection, "id", id, fmt.Sprintf("%s.%s", voteName, voteRegVote), -1)
	}
	
	// Register vote in mongo
	if vote != "none" {
		log.Println("Make registry")
		var voteReg db.VoteRegistery
		voteReg = db.VoteRegistery{
			UserID: user.ID,
			ItemID: db.ID(id),
			Up: vote == "up",
		}
		err = dBase.NewVoteRegistry(&voteReg)
	} 

	response := Response{Error:err, Data: nil}
	GenerateHandler(w, r, response)	
}

func getRecommendations(w http.ResponseWriter, r *http.Request) {
	id := ExtractFromRequest(r, "id")
	numArticles := ExtractFromRequest(r, "numArticles")

	if id == "" || numArticles == "" {
		http.Error(w, "ID or numArticles aren't correct", http.StatusBadRequest)
        return
	}

	resp, err := http.Get(fmt.Sprintf("%s/recommendations/%s/%s", recommendationsIPort, id, numArticles))
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
        return	
	}
	body, _ := ioutil.ReadAll(resp.Body)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.WriteHeader(http.StatusOK)
	w.Write(body)
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
var recommendationsIPort string
func StartAPIServer(mongoIP string, _recommendationsIPort string) {
	router := mux.NewRouter()

	fmt.Println("Starting API server")

	dBase = db.NewMongoController(mongoIP)
	recommendationsIPort = _recommendationsIPort

	// REST API
	router.HandleFunc("/api/getUser/{id}", isAuthorized(getUser)).Methods("GET").Headers()
	router.HandleFunc("/api/getUsers", getUsers).Methods("GET")
	router.HandleFunc("/api/getArticle/{id}", isAuthorized(getArticle)).Methods("GET")
	router.HandleFunc("/api/getArticle", isAuthorized(getArticleByURL)).Methods("GET")
	router.HandleFunc("/api/getArticles", getArticles).Methods("GET")
	router.HandleFunc("/api/getArticles/{query}", getArticlesByQuery).Methods("GET")

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
	router.HandleFunc("/api/getRequests/{which}/{limit}", getAllRequests).Methods("GET")
	router.HandleFunc("/api/getRequests/{query}", getRequestsByQuery).Methods("GET")
	router.HandleFunc("/api/getAnswers/user/{id}", getAnswersByUser).Methods("GET")
	router.HandleFunc("/api/getAnswers/article/{id}", getAnswersByArticle).Methods("GET")
	router.HandleFunc("/api/getReports/user/{id}", getReportsByUser).Methods("GET")
	router.HandleFunc("/api/getReports/article/{id}", getReportsByArticle).Methods("GET")

	router.HandleFunc("/api/newFavorite", newFavorite).Methods("PUT")
	router.HandleFunc("/api/deleteFavorite", deleteFavorite).Methods("POST")
	router.HandleFunc("/api/newComment", newComment).Methods("PUT")
	router.HandleFunc("/api/newRequest", newRequest).Methods("PUT")
	router.HandleFunc("/api/newAnswer", newAnswer).Methods("PUT")
	router.HandleFunc("/api/newReport", newReport).Methods("PUT")
	router.HandleFunc("/api/updateAnswer", updateAnswer).Methods("POST")
	router.HandleFunc("/api/updateRequest", updateRequest).Methods("POST")
	router.HandleFunc("/api/updateReport", updateReport).Methods("POST")

	router.HandleFunc("/api/recommendations/{id}/{numArticles}", getRecommendations).Methods("GET")
	router.HandleFunc("/api/votes/{type}/{id}/{vote}", isAuthorized(updateVotes)).Methods("POST")
	router.HandleFunc("/api/{type}/{key}/{val}", getByKey).Methods("GET")
	router.HandleFunc("/api/all/{type}/{key}/{val}", getAllByKey).Methods("GET")
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