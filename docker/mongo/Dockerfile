FROM mongo

COPY users.json data/users.json
COPY articles.json data/articles.json
COPY favorites.json data/favorites.json
COPY requests.json data/requests.json
COPY answers.json data/answers.json
COPY votes.json data/votes.json

CMD mongoimport --host mongodb --port 27017 --db ReadMeDB --collection users --type json --file /users.json --jsonArray; \
    mongoimport --host mongodb --port 27017 --db ReadMeDB --collection articles --type json --file /articles.json --jsonArray; \ 
    mongoimport --host mongodb --port 27017 --db ReadMeDB --collection favorites --type json --file /favorites.json --jsonArray; \ 
    mongoimport --host mongodb --port 27017 --db ReadMeDB --collection requests --type json --file /requests.json --jsonArray; \ 
    mongoimport --host mongodb --port 27017 --db ReadMeDB --collection answers --type json --file /answers.json --jsonArray; \
    mongoimport --host mongodb --port 27017 --db ReadMeDB --collection votes --type json --file /votes.json --jsonArray; 