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
    
    for user in users:
        user["credit"] = 50

    reports = []
    tags = []
    user_scores = {}

    for article in articles:
        user_label_dict = {}
        for label in article["labels"]:
                users_reported = []
                num_users_reported = random.randint(NUM_LABEL_REPORTS[0], NUM_LABEL_REPORTS[1])
                next_user = random.choice(users)

                while len(users_reported) != num_users_reported:
                    user_id = next_user["id"]
                    users_reported.append(next_user)
                    if user_id not in user_label_dict:
                        user_label_dict[user_id] = [label["label"]]
                    else:
                        user_label_dict[user_id].append(label["label"])

                    while next_user in users_reported:
                        next_user = random.choice(users)
                
                id = uuid.uuid4()
                new_tag = {
                    "_id": str(id),
                    "id": str(id),
                    "articleid": article["id"],
                    "label": label["label"],
                    "score": num_users_reported
                }
                tags.append(new_tag)
        
        for user_id, labels in user_label_dict.items():
            id = uuid.uuid4()
            new_report = {
                "_id": str(id),
                "id": str(id),
                "userid": user_id,
                "articleid": article["id"],
                "labels": labels,
            }
            reports.append(new_report)

            if user_id not in user_scores:
                user_scores[user_id] = 5
            else:
                user_scores[user_id] += 5
    
    for user_id, score in user_scores.items():
        for user in users:
            if user["id"] == user_id:
                user["credit"] += score

    with open('docker/mongo/data/reports.json', 'w') as f:
            json.dump(reports, f, indent=4)
    
    with open('docker/mongo/data/tags.json', 'w') as f:
            json.dump(tags, f, indent=4)
    
    with open('docker/mongo/data/users.json', 'w') as f:
            json.dump(users, f, indent=4)
