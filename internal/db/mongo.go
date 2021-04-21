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

func (db *MongoController) GetUser(id ID) User {
	return User{Username: "Oved"}
}

func (db *MongoController) GetUsers() []User { 
	return []User {
		User{Username: "Oved"},
		User{Username: "Yariv"},
		User{Username: "Ronit"},
		User{Username: "Doron"},
	}
}

func (db *MongoController) GetArticle(id ID) Article {
	return Article{Name: "I like turtles?"}
}

func (db *MongoController) GetArticles() []Article {
	return []Article{
		Article{Name: "I like turtles?"},
		Article{Name: "I like turtles!"},
		Article{Name: "I like turtles$"},	
	}
}

func (db *MongoController) NewUser() {

}

func (db *MongoController) NewArticle() {
	
}

func (db *MongoController) UpdateUser() {

}

func (db *MongoController) UpdateArticle() {

}