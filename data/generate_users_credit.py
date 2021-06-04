import json
import uuid
import random

NUM_LABEL_REPORTS = (1, 5)

if __name__ == "__main__":
    with open("docker/mongo/data/articles.json", "r") as f:
        articles = json.load(f)

    with open('docker/mongo/data/users.json', 'r') as f:
        users = json.load(f)
    
    with open('docker/mongo/data/favorites.json', 'r') as f:
        favorites = json.load(f)
    
    with open('docker/mongo/data/requests.json', 'r') as f:
        requests = json.load(f)

    with open('docker/mongo/data/answers.json', 'r') as f:
        answers = json.load(f)

    with open('docker/mongo/data/votes.json', 'r') as f:
        votes = json.load(f)
    
    with open('docker/mongo/data/favorites.json', 'r') as f:
        favorite = json.load(f)
    
    user_scores = {user["id"]: 0 for user in users}

    for request in requests:
        for user in users:
            if request["requestedby"] == user["id"]:
                user_scores[user["id"]] += 10                

        if "answerid" in request:
            answerid = request["answerid"]
            for answer in answers:
                if answer["id"] == answerid:
                    for user in users:
                        if user["id"] == answer["userid"]:
                            user_scores[user["id"]] += 50
    
    for answer in answers:
        for user in users:
            if answer["userid"] == user["id"]:
                user_scores[user["id"]] += 20
    
    for user_id, score in user_scores.items():
        for user in users:
            if user["id"] == user_id:
                user["credit"] += score
    
    with open('docker/mongo/data/users.json', 'w') as f:
            json.dump(users, f, indent=4)

