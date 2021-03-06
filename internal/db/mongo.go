package db

import (
	"ReadMe/internal/proto"
	"context"
	"errors"
	"fmt"
	"log"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
const mongoReportsCollectionName = "reports"
const mongoVotesCollectionName = "votes"
const mongoTagsCollectionName = "tags"
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

func (db *MongoController) GetByKey(dbName string, collectionName string, key string, value interface{}, pResult interface{}) error {
	collection := db.client.Database(dbName).Collection(collectionName)

	filter := bson.D{{Key: key, Value: value}}

	err := collection.FindOne(context.TODO(), filter).Decode(pResult)
	if err != nil {
		log.Println(err)
	}

	return err	
}

func (db *MongoController) GetAllByKey(dbName string, collectionName string, key string, value interface{}, pResults interface{}) error {
	collection := db.client.Database(dbName).Collection(collectionName)
	
	findOptions := options.Find()
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

func (db *MongoController) GetByDoubleKey(dbName string, collectionName string, key1 string, val1 interface{},
										  key2 string, val2 interface{}, pResult interface{}) error {
	collection := db.client.Database(dbName).Collection(collectionName)

	filter := bson.D{{Key: key1, Value: val1}, {Key: key2, Value: val2}}

	err := collection.FindOne(context.TODO(), filter).Decode(pResult)
	if err != nil {
		log.Println(err)
	}

	return err	
}

func (db* MongoController) DeleteAllByKey(dbName string, collectionName string, key []string, val []interface{}) error {
	collection := db.client.Database(dbName).Collection(collectionName)

	filter := bson.D{}
	for i := 0; i < len(key); i++ {
		filter = append(filter, bson.E{Key: key[i], Value: val[i]})
	}

	res, err := collection.DeleteMany(context.TODO(), filter)
	if err != nil {
		log.Println(err)
	}

	if res.DeletedCount == 0 {
		log.Println("Couldn't delete with given key, val")
		if err == nil {
			err = errors.New("None deleted")
		}
	}

	return err	
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

// insertOneToDB inserts a single new object to database (any ReadMe client object)
func (db *MongoController) insertOneIfNotExists(dbName string, collectionName string, 
	key []string, val []interface{}, newObject interface{}) error {
	var data interface{}
	
	collection := db.client.Database(dbName).Collection(collectionName)
		
	filter := bson.D{}
	for i := 0; i < len(key); i++ {
		filter = append(filter, bson.E{Key: key[i], Value: val[i]})
	}
	
	err := collection.FindOne(context.TODO(), filter).Decode(&data)
	// if err == nil the data exists, don't insert it
	if err == nil {
		return err 
	}

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

// updateOneInDB updates a single existing object in database (any ReadMe client object), with a given ID
func (db *MongoController) IncrementOneInDB(dbName string, collectionName string, key string, value string, 
	increment string, incrementBy int) error {
	collection := db.client.Database(dbName).Collection(collectionName)

	filter := bson.D{{Key: key, Value: value}}
	update := bson.M{increment: incrementBy}
	
	update = bson.M{"$inc": update}

	res, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Println(err)
	}

	log.Println(res)
	return err
}

// updateOneInDB updates a single existing object in database (any ReadMe client object), with a given ID
func (db *MongoController) IncrementOneInDBByDoubleKey(dbName string, collectionName string, key1 string, value1 interface{}, 
	key2 string, value2 interface{}, increment string, incrementBy int) error {
	collection := db.client.Database(dbName).Collection(collectionName)

	filter := bson.D{{Key: key1, Value: value1},{Key: key2, Value: value2}}
	update := bson.M{increment: incrementBy}
	
	update = bson.M{"$inc": update}

	res, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Println(err)
	}

	log.Println(res)
	return err
}

// updateOneInDB updates a single existing object in database (any ReadMe client object), with a given ID
func (db *MongoController) incrementOneInDBByMany(dbName string, collectionName string, key []string, value []string, 
	increment string, incrementBy int) error {
	collection := db.client.Database(dbName).Collection(collectionName)
	
	filter := bson.D{}
	for i := 0; i < len(key); i++ {
		filter = append(filter, bson.E{Key: key[i], Value: value[i]})
	}
	
	update := bson.M{increment: incrementBy}
	update = bson.M{"$inc": update}

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
	return db.getArticlesSample()	
}

func (db* MongoController) getArticlesSample() ([]Article, error) {
	var articles []Article

	collection := db.client.Database(mongoDatabaseName).Collection(mongoArticlesCollectionName)
	sample := bson.M{"$sample": bson.M{"size": 20}}
	operations := []bson.M{sample}
	curr, err := collection.Aggregate(context.Background(), operations)
	if err != nil {
		log.Println(err)
	}

	// All extract all (subject to limit) from requested query 
	err = curr.All(context.TODO(), &articles)
	if err != nil {
		// handle error
		log.Println(err)
	}

	return articles, err	
}

func (db *MongoController) GetArticlesByDate(from int64, to int64) ([]Article, error) {
	var articles []Article
	collection := db.client.Database(mongoDatabaseName).Collection(mongoArticlesCollectionName)
	
	findOptions := options.Find()
	findOptions.SetLimit(100)

	filter := bson.M{"date": bson.M{"$gte": from, "$lt": to}}

	// Passing bson.D{{}} as the filter matches all documents in the collection
	cur, err := collection.Find(context.Background(), filter, findOptions)
	if err != nil {
		log.Println(err)
	}

	// All extract all (subject to limit) from requested query 
	err = cur.All(context.TODO(), &articles)
	if err != nil {
		// handle error
	}
	
	return articles, err
}

func (db* MongoController) GetArticlesByQuery(query string) ([]Article, error) {
	var articles []Article

	collection := db.client.Database(mongoDatabaseName).Collection(mongoArticlesCollectionName)
	
	findOptions := options.Find()

	regex := primitive.Regex{Pattern: fmt.Sprintf(".*%s.*", query), Options: "i"}
	filter := bson.M{"name": bson.M{"$regex": regex}}

	// Passing bson.D{{}} as the filter matches all documents in the collection
	cur, err := collection.Find(context.Background(), filter, findOptions)
	if err != nil {
		log.Println(err)
	}

	// All extract all (subject to limit) from requested query 
	err = cur.All(context.TODO(), &articles)
	if err != nil {
		// handle error
		log.Println(err)
	}
	
	return articles, err
}

func (db *MongoController) GetFavorite(key1 string, value1 interface{}, key2 string, value2 string) (Favorite, error) {
	var favorite Favorite

	collection := db.client.Database(mongoDatabaseName).Collection(mongoFavoritesCollectionName)

	filter := bson.D{{Key: key1, Value: value1}, {Key: key2, Value: value2}}

	err := collection.FindOne(context.TODO(), filter).Decode(&favorite)
	if err != nil {
		log.Println(err)
	}

	return favorite, err	
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

func (db* MongoController) GetRequestsByQuery(query string) ([]Request, error) {
	var requests []Request

	collection := db.client.Database(mongoDatabaseName).Collection(mongoRequestsCollectionName)
	
	findOptions := options.Find()

	regex := primitive.Regex{Pattern: fmt.Sprintf(".*%s.*", query), Options: "i"}
	filter := bson.M{"content": bson.M{"$regex": regex}}

	// Passing bson.D{{}} as the filter matches all documents in the collection
	cur, err := collection.Find(context.Background(), filter, findOptions)
	if err != nil {
		log.Println(err)
	}

	// All extract all (subject to limit) from requested query 
	err = cur.All(context.TODO(), &requests)
	if err != nil {
		// handle error
		log.Println(err)
	}
	
	return requests, err
}

func (db* MongoController) GetAllRequests(which string) ([]Request, error) {
	var requests []Request

	collection := db.client.Database(mongoDatabaseName).Collection(mongoRequestsCollectionName)
	
	var filter bson.M
	if which == "all" {
		filter = bson.M{}
	} else if which == "open" {
		exists := bson.M{"$exists": false}
		filter = bson.M{"answerid": exists}
	} else if which == "closed" {
		exists := bson.M{"$exists": true}
		filter = bson.M{"answerid": exists}
	} else {
		filter = bson.M{}
	}

	// Passing bson.D{{}} as the filter matches all documents in the collection
	cur, err := collection.Find(context.Background(), filter)
	if err != nil {
		log.Println(err)
	}

	// All extract all (subject to limit) from requested query 
	err = cur.All(context.TODO(), &requests)
	if err != nil {
		// handle error
	}
	
	return requests, err
}


func (db* MongoController) GetAnswers(key string, value interface{}) ([]Answer, error) {
	var answers []Answer
	err := db.getMany(mongoAnswersCollectionName, key, value, &answers)

	return answers, err
}

func (db* MongoController) GetReports(key string, value interface{}) ([]Report, error) {
	var reports []Report
	err := db.getMany(mongoReportsCollectionName, key, value, &reports)

	return reports, err
}

func (db *MongoController) NewUser(user *User) error {
	user.ID = ID(proto.TokenGenerator())

	_, err := db.GetUser("username", user.Username)
	if err == nil {
		log.Println(err)
		err = errors.New("Username already in DB")
		return err
	}

	// Sign in user
	user.AccessToken = Token(proto.TokenGenerator())
	user.Credit = 50
	
	err = db.insertOneToDB(mongoDatabaseName, mongoUsersCollectionName, *user)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) NewArticle(article *Article) error {
	article.ID = ID(proto.TokenGenerator())

	_, err := db.GetArticle("url", article.URL)
	if err == nil {
		log.Println(err)
		err = errors.New("URL already in DB")
		return err
	}

	err = db.insertOneToDB(mongoDatabaseName, mongoArticlesCollectionName, *article)
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

func (db *MongoController) NewComment(comment *Comment) error {
	comment.ID = ID(proto.TokenGenerator())

	err := db.insertOneToDB(mongoDatabaseName, mongoCommentsCollectionName, *comment)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) NewFavorite(favorite *Favorite) error {
	err := db.insertOneToDB(mongoDatabaseName, mongoFavoritesCollectionName, *favorite)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) NewVoteRegistry(vote *VoteRegistery) error {
	err := db.insertOneToDB(mongoDatabaseName, mongoVotesCollectionName, *vote)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) NewRequest(request *Request) error {
	request.ID = ID(proto.TokenGenerator())
	
	db.IncrementOneInDB(mongoDatabaseName, mongoUsersCollectionName, "id", string(request.RequestedBy), "credit", 10)	
	
	return db.newItemNoValidate(mongoRequestsCollectionName, *request)	
}

func (db *MongoController) NewAnswer(answer *Answer) error {
	answer.ID = ID(proto.TokenGenerator())

	db.IncrementOneInDB(mongoDatabaseName, mongoUsersCollectionName, "id", string(answer.UserID), "credit", 20)	

	return db.newItemNoValidate(mongoAnswersCollectionName, *answer)	
}

func (db *MongoController) updateTag(articleid ID, tag string, incrementBy int) error {
	collection := db.client.Database(mongoDatabaseName).Collection(mongoArticlesCollectionName)

	filter := bson.D{{Key: "id", Value: articleid}, {Key:"tag", Value: tag}}
	update := bson.M{"score": incrementBy}
	
	update = bson.M{"$inc": update}

	res, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Println(err)
	}

	log.Println(res)
	return err	
}

func (db *MongoController) NewReport(report *Report) error {
	report.ID = ID(proto.TokenGenerator())
	
	var prevReport Report
	err := db.GetByDoubleKey(mongoDatabaseName, mongoReportsCollectionName, "userid", report.UserID, "articleid", report.ArticleId, &prevReport)
	// if err == nil, prevReport should contain previous data
	if err == nil {
		fmt.Println("Have previous report")
		// Down score each labels from previous report
		for _, element := range prevReport.Labels {
			element = strings.ToLower(element)
			fmt.Println("Decrementing " + element)
			db.IncrementOneInDBByDoubleKey(
				mongoDatabaseName, 
				mongoTagsCollectionName, 
				"articleid",
				report.ArticleId,
				"label",
				element,
				"score",
				-1,
			)
		}

		// Delete last report
		var keys []string
		var vals []interface{}
		keys = append(keys, "id")
		vals = append(vals, prevReport.ID) 
		db.DeleteAllByKey(mongoDatabaseName, mongoReportsCollectionName, keys, vals)
	}

	// User never reported this article, award him 5 points
	if err != nil {
		db.IncrementOneInDB(mongoDatabaseName, mongoUsersCollectionName, "id", string(report.UserID), "credit", 10)	
	}

	fmt.Println("Labels length")
	fmt.Println(len(report.Labels))
	// Update all current labels
	for _, element := range report.Labels {
		element = strings.ToLower(element)
		fmt.Println("Updating " + element)

		newTag := Tag {
			ID: ID(proto.TokenGenerator()),
			ArticleID: report.ArticleId,
			Label: element,
			Score: 0,
		} 

		var keys []string
		var vals []interface{}
		keys = append(keys, "articleid")
		keys = append(keys, "label")
		vals = append(vals, report.ArticleId) 
		vals = append(vals, element)

		err = db.insertOneIfNotExists(
			mongoDatabaseName,
			mongoTagsCollectionName,
			keys,
			vals,
			newTag,
		)
		if err != nil {
			fmt.Println("Insert if not exists")
			fmt.Println(err.Error())
		}

		err = db.IncrementOneInDBByDoubleKey(
			mongoDatabaseName, 
			mongoTagsCollectionName, 
			"articleid",
			report.ArticleId,
			"label",
			element,
			"score",
			1,
		)
		if err != nil {
			fmt.Println("Increment")
			fmt.Println(err.Error())
		}
	}

	return db.newItemNoValidate(mongoReportsCollectionName, *report)	
}

func (db *MongoController) UpdateUser(user User) error {
	updateMap := make(map[string]interface{})
	updateMap["credit"] = user.Credit

	err := db.updateOneInDB(mongoDatabaseName, mongoUsersCollectionName, "username", user.Username, updateMap)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) UpdateArticle(article Article) error {
	updateMap := make(map[string]interface{})
	updateMap["fakevotes"] = article.FakeVotes
	
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

func (db *MongoController) UpdateReport(report Report) error {
	updateMap := make(map[string]interface{})
	updateMap["labels"] = report.Labels 
	
	err := db.updateOneInDB(mongoDatabaseName, mongoAnswersCollectionName, "id", string(report.ID), updateMap)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) UpdateRequest(request Request) error {
	updateMap := make(map[string]interface{})
	updateMap["answerid"] = request.AnswerID
	
	// Award correct answer by 50 points
	var answer Answer
	err := db.GetByKey(mongoDatabaseName, mongoAnswersCollectionName, "id", string(request.AnswerID), &answer)
	if err == nil {
		// This answer really exists
		db.IncrementOneInDB(mongoDatabaseName, mongoUsersCollectionName, "id", string(request.RequestedBy), "credit", 50)	
	}
	
	err = db.updateOneInDB(mongoDatabaseName, mongoRequestsCollectionName, "id", string(request.ID), updateMap)
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
