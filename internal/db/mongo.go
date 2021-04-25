package db

import (
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
const mongoCollectionIDKey = "ID"
const MultipleExtractionLimit = 10^5

type MongoController struct {
	client mongo.Client
}

func NewMongoController() *MongoController {
	var client mongo.Client
	client = *getMongoClient()

	var controller MongoController
	controller = MongoController{
		client: client,
	}

	return &controller
}

func getMongoClient() *mongo.Client {
	// Set client options
	clientOptions := options.Client().ApplyURI("mongodb://0.0.0.0:27017")

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
	cur, err := collection.Find(context.TODO(), bson.D{{}}, findOptions)
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
func (db *MongoController) updateOneInDB(dbName string, collectionName string, id ID, updatedObject interface{}) error {
	collection := db.client.Database(dbName).Collection(collectionName)

	filter := bson.D{{Key: mongoCollectionIDKey, Value: id}}

	// Declare a filter that will change a field's integer value to `42`
    update := bson.M{"$set": updatedObject}

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
	err := db.insertOneToDB(mongoDatabaseName, mongoUsersCollectionName, user)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) NewArticle(article Article) error {
	err := db.insertOneToDB(mongoDatabaseName, mongoUsersCollectionName, article)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) UpdateUser(user User) error {
	err := db.updateOneInDB(mongoDatabaseName, mongoUsersCollectionName, "Oved", user)
	if err != nil {
		log.Println(err)
	}

	return err
}

func (db *MongoController) UpdateArticle(article Article) error {
	err := db.updateOneInDB(mongoDatabaseName, mongoUsersCollectionName, "abcdefghijk", article)
	if err != nil {
		log.Println(err)
	}

	return err
}
