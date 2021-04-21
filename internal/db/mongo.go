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
	Database 		ReadMeDatabase
	mongoClient		mongo.Client		
}

func (db *MongoController) getUser() {

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