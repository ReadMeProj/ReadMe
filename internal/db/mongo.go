package db

import (
    "context"
    "fmt"
    "log"

    //"go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

type MongoController struct {
	mongoClient		mongo.Client		
}

func NewMongoController() *MongoController {
	var client mongo.Client
	client = *getMongoClient()
	
	var controller MongoController
	controller = MongoController {
		mongoClient: client,
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

func (db *MongoController) GetUser() User {
	return User{Username: "Oved"}
}

func (db *MongoController) getUsers() {

}

func (db *MongoController) getArticle() {

}

func (db *MongoController) getArticles() {

}

func (db *MongoController) newUser() {

}

func (db *MongoController) newArticle() {
	
}

func (db *MongoController) updateUser() {

}

func (db *MongoController) updateArticle() {

}