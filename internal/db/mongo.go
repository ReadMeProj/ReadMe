package db

import (
	"ReadMe/internal/proto"
	"context"
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
const mongoCollectionIDKey = "id"
const MultipleExtractionLimit = 10000

type MongoController struct {
	client mongo.Client
}

func NewMongoController(mongoIP string) *MongoController {
	var client mongo.Client
	client = *getMongoClient(mongoIP)

	var controller MongoController
	controller = MongoController{
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

// extractManyByFromDB extracts multiple results from mongo DB, by filtering with ID type.
func (db *MongoController) extractOneByIDFromDB(dbName string, collectionName string, id ID, pResult interface{}) error {
	collection := db.client.Database(dbName).Collection(collectionName)

	filter := bson.D{{Key: mongoCollectionIDKey, Value: id}}

	err := collection.FindOne(context.TODO(), filter).Decode(pResult)
	if err != nil {
		log.Println(err)
	}

	return err
}

// extractManyByFromDB extracts multiple results (subject to limit) from mongo DB 
func (db *MongoController) extractManyByFromDB(dbName string, collectionName string, pResults interface{}, limit int64) error {
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
func (db *MongoController) updateOneInDB(dbName string, collectionName string, id ID, updateObject map[string]interface{}) error {
	collection := db.client.Database(dbName).Collection(collectionName)

	filter := bson.D{{Key: mongoCollectionIDKey, Value: id}}
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

func (db *MongoController) GetUser(id ID) (User, error) {
	var user User

	err := db.extractOneByIDFromDB(mongoDatabaseName, mongoUsersCollectionName, id, &user)
	if err != nil {
		log.Println(err)
	}

	return user, err
}

func (db *MongoController) GetUsers() ([]User, error) {
	var users []User
	limit := MultipleExtractionLimit

	err := db.extractManyByFromDB(mongoDatabaseName, mongoUsersCollectionName, &users, int64(limit))
	if err != nil {
		log.Println(err)
	}

	return users, err	
}

func (db *MongoController) GetArticle(id ID) (Article, error) {
	var article Article 

	err := db.extractOneByIDFromDB(mongoDatabaseName, mongoArticlesCollectionName, id, &article)
	if err != nil {
		log.Println(err)
	}

	return article, err
}

func (db *MongoController) GetArticles() ([]Article, error) {
	var articles []Article
	limit := MultipleExtractionLimit

	err := db.extractManyByFromDB(mongoDatabaseName, mongoArticlesCollectionName, &articles, int64(limit))
	if err != nil {
		log.Println(err)
	}

	return articles, err	
}

func (db *MongoController) NewUser(user User) error {
	user.ID = ID(proto.TokenGenerator(10))
	err := db.insertOneToDB(mongoDatabaseName, mongoUsersCollectionName, user)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) NewArticle(article Article) error {
	article.ID = ID(proto.TokenGenerator(10))
	err := db.insertOneToDB(mongoDatabaseName, mongoArticlesCollectionName, article)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) UpdateUser(user User) error {
	updateMap := make(map[string]interface{})
	updateMap["credit"] = user.Credit
	updateMap["relscore"] = user.RelScore

	err := db.updateOneInDB(mongoDatabaseName, mongoUsersCollectionName, user.ID, updateMap)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) UpdateArticle(article Article) error {
	updateMap := make(map[string]interface{})
	updateMap["fakevotes"] = article.FakeVotes
	updateMap["sponsvotes"] = article.SponsVotes
	
	err := db.updateOneInDB(mongoDatabaseName, mongoUsersCollectionName, article.ID, updateMap)
	if err != nil {
		log.Println(err)
	}

	return err
}
