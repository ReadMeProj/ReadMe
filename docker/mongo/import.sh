#! /bin/bash

mongoimport --host mongodb --db ReadMeDB --collection users --type json --file /docker/mongo/users.json --jsonArray
mongoimport --host mongodb --db ReadMeDB --collection articles --type json --file /docker/mongo/articles.json --jsonArray