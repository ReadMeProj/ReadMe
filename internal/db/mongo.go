package db

import (
    "context"
    "fmt"
    "log"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

type MongoController struct {
	client		mongo.Client		
}

func NewMongoController() *MongoController {
	var client mongo.Client
	client = *getMongoClient()
	
	var controller MongoController
	controller = MongoController {
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

func (db *MongoController) GetUser(id ID) (User, error) {
	collection := db.client.Database("ReadMeDB").Collection("users")
	filter := bson.D{{Key: "ID", Value: id}}

	var user User

	err := collection.FindOne(context.TODO(), filter).Decode(&user)	
	if err != nil {
		log.Print(err)
	}

	return user, err
}

func (db *MongoController) GetUsers() ([]User, error) { 
	collection := db.client.Database("ReadMeDB").Collection("users")

	findOptions := options.Find()
	findOptions.SetLimit(10)

	var results []User

	// Passing bson.D{{}} as the filter matches all documents in the collection
	cur, err := collection.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		log.Print(err)
	}

	// Finding multiple documents returns a cursor
	// Iterating through the cursor allows us to decode documents one at a time
	for cur.Next(context.TODO()) {
		
		// create a value into which the single document can be decoded
		var elem User
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		results = append(results, elem)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	cur.Close(context.TODO())

	return results, err 
}

func (db *MongoController) GetArticle(id ID) (Article, error) {
	return Article{Name: "I like turtles?"}, nil
}

func (db *MongoController) GetArticles() ([]Article, error) {
	return []Article {
		Article{Name: "I like turtles?"},
		Article{Name: "I like turtles!"},
		Article{Name: "I like turtles$"},	
	}, nil
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