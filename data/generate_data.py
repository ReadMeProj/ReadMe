import json
import uuid
import random
import funkybob
from transformers import pipeline, set_seed

generator = pipeline('text-generation', model='gpt2')
set_seed(42)

NUM_USERS = 500
# (min, max)
NUM_FAVORITES_USER = (5, 25)
NUM_REQUEST_USER   = (0, 3)
NUM_REQUEST_ANSWER = (0, 3)
NUM_REPORTS_USER   = (0, 27)
NUM_VOTES_ITEM = (0, 13)

def generate_users():
    users = []
    for i in range(NUM_USERS):
        gen = iter(funkybob.RandomNameGenerator())

        # UserID
        id = str(uuid.uuid4())

        # Username
        name = next(gen).split('_')
        numseq = "".join([str(random.randint(0,9)) for i in range(3)])
        username = name[0] + name[1] + numseq

        # Password
        password = "".join([str(random.randint(0,9)) for i in range(6)])

        # Email
        email = name[0] + "".join([str(random.randint(0,9)) for i in range(6)]) + "@gmail.com"

        # FirstName
        firstname = name[0]

        # LastName
        lastname = name[1]

        # Credit
        credit = 50

        user = {
            "id": id,
            "username": username,
            "password": password,
            "email":email,
            "firstname": firstname,
            "lastname": lastname,
            "credit": credit
        }

        users.append(user)
        print(f'id={id}, username={username}, password={password}, email={email}, firstname={firstname}, lastname={lastname}')

    return users


def generate_favorites(users, articles):
    favorites = []
    for user in users:
        favs = []
        num_favorites = random.randint(NUM_FAVORITES_USER[0], NUM_FAVORITES_USER[1])
        for i in range(num_favorites):
            article = random.choice(articles)
            while article in favs:
                article = random.choice(articles)

            favs.append(article)

        for fav in favs:
            favorite = {
                "_id": str(uuid.uuid4()),
                'user': user["id"],
                'article': fav["id"],
                'date': random.randint(1571960017, 1621960017)
            }
            favorites.append(favorite)

    return favorites

'''
type Request struct {
	ID 		  	ID `json:"id"`
	RequestedBy ID `json:"requestedby" validate:"required"`
	ArticleID   ID `json:"articleid" validate:"required"`
	Date      	int64 `json:"date" validate:"required"`
	Content   	string `json:"content" validate:"required,lte=256"`
	AnswerID 	ID `json:"answerid"`
	Votes 		Votes `json:"votes"`
}
'''
def generate_requests_answers_votes(users, articles):
    requests = []
    answers = []
    votes = []

    for user in users:
        article_to_request = []
        num_requests = random.randint(NUM_REQUEST_USER[0], NUM_REQUEST_USER[1])
        for i in range(num_requests):
            article = random.choice(articles)
            while article in article_to_request:
                article = random.choice(articles)

            article_to_request.append(article)

        for article in article_to_request:
            seed_text = ['Do you think that', 'Do you know if', 'What do you think about', 'Who is']
            seed_text = random.choice(seed_text)

            content = generator(f"{seed_text},", max_length=50, num_return_sequences=1)[0]['generated_text']
            request = {
                'id': str(uuid.uuid4()),
                'requestedby': user["id"],
                'articleid': article["id"],
                'date': random.randint(1571960017, 1621960017),
                'content': content
            }
            _votes, vote_registry_list = generate_votes_for_item(request["id"], users)
            request["votes"] = _votes
            votes.extend(vote_registry_list)

            ans = []
            num_answers = random.randint(NUM_REQUEST_ANSWER[0], NUM_REQUEST_ANSWER[1])
            ans_user = random.choice(users)
            while len(ans) != num_answers and ans_user != user:
                answer = {
                    'id': str(uuid.uuid4()),
                    "requestid": request["id"],
                    "userid": ans_user["id"],
                    "articleid": article["id"],
                    'date': random.randint(request["date"], 1621960017),
                    'content': generator(f"{request['content']},", max_length=len(content), num_return_sequences=1)[0]['generated_text']
                }
                ans.append(answer)
                _votes, vote_registry_list = generate_votes_for_item(answer["id"], users)
                request["votes"] = _votes
                votes.extend(vote_registry_list)

            if random.random() > 0.8 and ans:
                req_ans = random.choice(ans)
                request["answerid"] = req_ans["id"]

            answers.extend(ans)
            requests.append(request)

    return requests, answers, votes


def generate_votes_for_item(itemid, users):
    chosen = []
    num_votes = random.randint(NUM_VOTES_ITEM[0], NUM_VOTES_ITEM[1])
    user = random.choice(users)
    vote_registry_list = []

    votes = {
        "up": 0,
        "down": 0
    }

    while len(chosen) != num_votes:
        up = "up" if random.random() > 0.63 else "down"
        votes[up] += 1

        vote_registry = {
            "userid": user["id"],
            "itemid": itemid,
            "up": up == "up"
        }
        vote_registry_list.append(vote_registry)
        chosen.append(user)

        while user in chosen:
            user = random.choice(users)

    return votes, vote_registry_list

'''
type Answer struct {
	ID 		  ID `json:"id"`
	RequestID ID `json:"requestid" validate:"required"`
	UserID 	  ID `json:"userid" validate:"required"`
	ArticleId ID `json:"articleid" validate:"required"`
	Date      int64 `json:"date" validate:"required"`
	Content   string `json:"content" validate:"required,lte=256"`
	// Report
	Rating 	  int `json:"rating" validate:"lte=5,gte=0"`
	Category  string `json:"category"`
	Fake 	  bool `json:"fake"`
	// Report
	Votes 	  Votes `json:"votes"`
}
'''


def generate_answers(users, requests):
    return []


def generate_reports(users, requests):
    return []


if __name__ == "__main__":
    with open("data/articles.json", "r") as f:
        articles = json.load(f)
    print(f'num_article={len(articles)}')

    #users = generate_users()
    #with open('data/users.json', 'w') as f:
    #    json.dump(users, f, indent=4)
    with open('data/users.json', 'r') as f:
        users = json.load(f)
    print(f'num_users={len(users)}')
    
    favorites = generate_favorites(users, articles)
    with open('data/favorites.json', 'w') as f:
        json.dump(favorites, f, indent=4)
    
    if False:
        requests, answers, votes = generate_requests_answers_votes(users, articles)

        with open('data/requests.json', 'w') as f:
            json.dump(requests, f, indent=4)

        with open('data/answers.json', 'w') as f:
            json.dump(answers, f, indent=4)

        with open('data/votes.json', 'w') as f:
            json.dump(votes, f, indent=4)

