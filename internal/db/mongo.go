package db

import (
	"ReadMe/internal/proto"
	"context"
	"errors"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// DB meta constants
const mongoDatabaseName = "ReadMeDB"
const mongoUsersCollectionName = "users"
const mongoArticlesCollectionName = "articles"
const mongoFavoritesCollectionName = "favorites"
const mongoCommentsCollectionName = "comments"
const mongoRequestsCollectionName = "requests"
const mongoAnswersCollectionName = "answers"
const mongoCollectionIDKey = "id"
const MultipleExtractionLimit = 10000

type MongoController struct {
	client mongo.Client
}

func NewMongoController(mongoIP string) *MongoController {
	var client mongo.Client
	client = *getMongoClient(mongoIP)

	var controller MongoController
	controller = MongoController {
		client: client,
	}

	return &controller
}

func getMongoClient(mongoIP string) *mongo.Client {
	// Set client options
	clientOptions := options.Client().ApplyURI(fmt.Sprintf("mongodb://%s:27017", mongoIP))

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	return client
}	

// extractOneByIDFromDB extracts multiple results from mongo DB, by filtering with ID type.
func (db *MongoController) extractOneByIDFromDB(dbName string, collectionName string, key string, value interface{}, pResult interface{}) error {
	collection := db.client.Database(dbName).Collection(collectionName)

	filter := bson.D{{Key: key, Value: value}}

	err := collection.FindOne(context.TODO(), filter).Decode(pResult)
	if err != nil {
		log.Println(err)
	}

	return err
}

// extractManyFromDB extracts multiple results (subject to limit) from mongo DB 
func (db *MongoController) extractManyFromDB(dbName string, collectionName string, pResults interface{}, limit int64) error {
	collection := db.client.Database(dbName).Collection(collectionName)
	
	findOptions := options.Find()
	findOptions.SetLimit(limit)

	// Passing bson.D{{}} as the filter matches all documents in the collection
	cur, err := collection.Find(context.Background(), bson.D{{}}, findOptions)
	if err != nil {
		log.Println(err)
	}

	// All extract all (subject to limit) from requested query 
	err = cur.All(context.TODO(), pResults)
	if err != nil {
		// handle error
	}
	
	return err
}

// extractManyFromDB extracts multiple results (subject to limit) from mongo DB 
func (db *MongoController) extractManyByIDFromDB(dbName string, collectionName string, pResults interface{}, key string, value interface{}, limit int64) error {
	collection := db.client.Database(dbName).Collection(collectionName)
	
	findOptions := options.Find()
	findOptions.SetLimit(limit)

	filter := bson.D{{Key: key, Value: value}}

	// Passing bson.D{{}} as the filter matches all documents in the collection
	cur, err := collection.Find(context.Background(), filter, findOptions)
	if err != nil {
		log.Println(err)
	}

	// All extract all (subject to limit) from requested query 
	err = cur.All(context.TODO(), pResults)
	if err != nil {
		// handle error
	}
	
	return err
}

// insertOneToDB inserts a single new object to database (any ReadMe client object)
func (db *MongoController) insertOneToDB(dbName string, collectionName string, newObject interface{}) error {
	collection := db.client.Database(dbName).Collection(collectionName)

	res, err := collection.InsertOne(context.TODO(), newObject)
	if err != nil  || res == nil {
		log.Println(err)
	}

	log.Println(res)
	return err
}

// updateOneInDB updates a single existing object in database (any ReadMe client object), with a given ID
func (db *MongoController) updateOneInDB(dbName string, collectionName string, key string, value string, updateObject map[string]interface{}) error {
	collection := db.client.Database(dbName).Collection(collectionName)

	filter := bson.D{{Key: key, Value: value}}
	update := bson.M{}

	for k, v := range updateObject {
		update[k] = v
	}
	
	update = bson.M{"$set": update}

	res, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Println(err)
	}

	log.Println(res)
	return err
}

func (db *MongoController) GetUser(key string, value interface{}) (User, error) {
	var user User

	err := db.extractOneByIDFromDB(mongoDatabaseName, mongoUsersCollectionName, key, value, &user)
	if err != nil {
		log.Println(err)
	}

	return user, err
}

func (db *MongoController) GetUsers() ([]User, error) {
	var users []User
	limit := MultipleExtractionLimit

	err := db.extractManyFromDB(mongoDatabaseName, mongoUsersCollectionName, &users, int64(limit))
	if err != nil {
		log.Println(err)
	}

	return users, err	
}

func (db *MongoController) GetArticle(key string, value interface{}) (Article, error) {
	var article Article 

	err := db.extractOneByIDFromDB(mongoDatabaseName, mongoArticlesCollectionName, key, value, &article)
	if err != nil {
		log.Println(err)
	}

	return article, err
}

func (db *MongoController) GetArticles() ([]Article, error) {
	var articles []Article
	limit := MultipleExtractionLimit

	err := db.extractManyFromDB(mongoDatabaseName, mongoArticlesCollectionName, &articles, int64(limit))
	if err != nil {
		log.Println(err)
	}

	return articles, err	
}

func (db *MongoController) GetFavorites(key string, value interface{}) ([]Favorite, error) {
	var favorites []Favorite
	limit := MultipleExtractionLimit

	err := db.extractManyByIDFromDB(mongoDatabaseName, mongoFavoritesCollectionName, &favorites, key, value, int64(limit))
	if err != nil {
		log.Println(err)
	}

	return favorites, err	
}

func (db *MongoController) GetComments(key string, value interface{}) ([]Comment, error) {
	var comments []Comment
	limit := MultipleExtractionLimit

	err := db.extractManyByIDFromDB(mongoDatabaseName, mongoCommentsCollectionName, &comments, key, value, int64(limit))
	if err != nil {
		log.Println(err)
	}

	return comments, err	
}

func (db *MongoController) getMany(collectionName string, key string, value interface{}, pResults interface{}) error {
	limit := MultipleExtractionLimit
	err := db.extractManyByIDFromDB(mongoDatabaseName, collectionName, pResults, key, value, int64(limit))
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db* MongoController) GetRequests(key string, value interface{}) ([]Request, error) {
	var requests []Request
	err := db.getMany(mongoRequestsCollectionName, key, value, &requests)

	return requests, err
}

func (db* MongoController) GetAnswers(key string, value interface{}) ([]Answer, error) {
	var answers []Answer
	err := db.getMany(mongoAnswersCollectionName, key, value, &answers)

	return answers, err
}

func (db *MongoController) NewUser(user User) error {
	user.ID = ID(proto.TokenGenerator())

	_, err := db.GetUser("username", user.Username)
	if err == nil {
		log.Println(err)
		err = errors.New("Username already in DB")
		return err
	}

	err = db.insertOneToDB(mongoDatabaseName, mongoUsersCollectionName, user)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) NewArticle(article Article) error {
	article.ID = ID(proto.TokenGenerator())

	_, err := db.GetArticle("url", article.URL)
	if err == nil {
		log.Println(err)
		err = errors.New("URL already in DB")
		return err
	}

	err = db.insertOneToDB(mongoDatabaseName, mongoArticlesCollectionName, article)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db* MongoController) newItemNoValidate(collectionName string, item interface{}) error {
	err := db.insertOneToDB(mongoDatabaseName, collectionName, item)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) NewComment(comment Comment) error {
	comment.ID = ID(proto.TokenGenerator())

	err := db.insertOneToDB(mongoDatabaseName, mongoCommentsCollectionName, comment)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) NewFavorite(favorite Favorite) error {
	err := db.insertOneToDB(mongoDatabaseName, mongoFavoritesCollectionName, favorite)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) NewRequest(request Request) error {
	request.ID = ID(proto.TokenGenerator())
	return db.newItemNoValidate(mongoRequestsCollectionName, request)	
}

func (db *MongoController) NewAnswer(answer Answer) error {
	answer.ID = ID(proto.TokenGenerator())
	return db.newItemNoValidate(mongoAnswersCollectionName, answer)	
}

func (db *MongoController) UpdateUser(user User) error {
	updateMap := make(map[string]interface{})
	updateMap["interests"] = user.Interests
	updateMap["credit"] = user.Credit
	updateMap["relscore"] = user.RelScore

	err := db.updateOneInDB(mongoDatabaseName, mongoUsersCollectionName, "username", user.Username, updateMap)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) UpdateArticle(article Article) error {
	updateMap := make(map[string]interface{})
	updateMap["labels"] = article.Labels
	updateMap["fakevotes"] = article.FakeVotes
	updateMap["sponsvotes"] = article.SponsVotes
	updateMap["relscore"] = article.SponsVotes
	
	err := db.updateOneInDB(mongoDatabaseName, mongoArticlesCollectionName, "url", article.URL, updateMap)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) UpdateAnswer(answer Answer) error {
	updateMap := make(map[string]interface{})
	updateMap["votes"] = answer.Votes 
	
	err := db.updateOneInDB(mongoDatabaseName, mongoAnswersCollectionName, "id", string(answer.ID), updateMap)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) UpdateRequest(request Request) error {
	updateMap := make(map[string]interface{})
	updateMap["votes"] = request.Votes 
	updateMap["answerid"] = request.AnswerID 
	
	err := db.updateOneInDB(mongoDatabaseName, mongoRequestsCollectionName, "id", string(request.ID), updateMap)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db* MongoController) IsAuth(username string, token Token) error {
	user, _ := db.GetUser("username", username)

	if (user.AccessToken == token) {
		return nil
	}

	return errors.New("Not authenticated")
}

func (db *MongoController) updateAccessToken(username string, token string) error {
	updateMap := make(map[string]interface{})
	updateMap["accesstoken"] = token 
	
	err := db.updateOneInDB(mongoDatabaseName, mongoUsersCollectionName, "username", username, updateMap)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) performLogin(username string, password string) error {
	user, _ := db.GetUser("username", username)

	if (user.Password == password) {
		return nil
	}

	return errors.New("Password mismatch")	
}

func (db *MongoController) Login(username string, password string) (Token, error) {
	err := db.performLogin(username, password)
	if err != nil {
		return "", err
	}

	token := proto.TokenGenerator()
	err = db.updateAccessToken(username, token)	

	return Token(token), err
}

func (db *MongoController) Logout(username string) error {
	token := "NO_TOKEN" 
	err := db.updateAccessToken(username, token)	

	return err
}
