import json
import uuid
import random


if __name__ == "__main__":
    with open("docker/mongo/data/articles.json", "r") as f:
        articles = json.load(f)

    with open('docker/mongo/data/articles.json', 'r') as f:
        users = json.load(f)
    
    with open('docker/mongo/data/favorites.json', 'r') as f:
        favorites = json.load(f)
    
    with open('docker/mongo/data/requests.json', 'r') as f:
        requests = json.load(f)

    with open('docker/mongo/data/answers.json', 'r') as f:
        answers = json.load(f)

    with open('docker/mongo/data/votes.json', 'r') as f:
        votes = json.load(f)
    
    for fav in favorites:
        fav["userid"] = fav["user"]
        fav["articleid"] = fav["article"]
        del fav["user"]
        del fav["article"]

    with open('docker/mongo/data/favorites.json', 'w') as f:
            json.dump(favorites, f, indent=4)

