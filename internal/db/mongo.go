package db

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const MultipleExtractionLimit = 10

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

func (db *MongoController) extractOneByIDFromDB(dbName string, collectionName string, id ID,
	pResult interface{}) error {
	collection := db.client.Database(dbName).Collection(collectionName)

	filter := bson.D{{Key: "ID", Value: id}}

	err := collection.FindOne(context.TODO(), filter).Decode(pResult)
	if err != nil {
		log.Print(err)
	}

	return err
}

// extract multiple results from mongo DB 
func (db *MongoController) extractManyByFromDB(dbName string, collectionName string, pResults interface{}, limit int64) (error) {
	collection := db.client.Database(dbName).Collection(collectionName)
	
	findOptions := options.Find()
	findOptions.SetLimit(limit)

	// Passing bson.D{{}} as the filter matches all documents in the collection
	cur, err := collection.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		log.Print(err)
	}

	// All extract all (subject to limit) from requested query 
	err = cur.All(context.TODO(), pResults)
	if err != nil {
		// handle error
	}
	
	return err

}

func (db *MongoController) GetUser(id ID) (User, error) {
	var user User

	err := db.extractOneByIDFromDB("ReadMeDB", "users", id, &user)
	if err != nil {
		log.Print(err)
	}

	return user, err
}

func (db *MongoController) GetUsers() ([]User, error) {
	var users []User
	limit := MultipleExtractionLimit

	err := db.extractManyByFromDB("ReadMeDB", "users", &users, int64(limit))
	if err != nil {
		log.Print(err)
	}

	return users, err	
}

func (db *MongoController) GetArticle(id ID) (Article, error) {
	var article Article 

	err := db.extractOneByIDFromDB("ReadMeDB", "articles", id, &article)
	if err != nil {
		log.Print(err)
	}

	return article, err
}

func (db *MongoController) GetArticles() ([]Article, error) {
	var articles []Article
	limit := MultipleExtractionLimit

	err := db.extractManyByFromDB("ReadMeDB", "articles", &articles, int64(limit))
	if err != nil {
		log.Print(err)
	}

	return articles, err	
}

func (db *MongoController) NewUser() error {
	return nil
}

func (db *MongoController) NewArticle() error {
	return nil
}

func (db *MongoController) UpdateUser() error {
	return nil
}

func (db *MongoController) UpdateArticle() error {
	return nil
}
