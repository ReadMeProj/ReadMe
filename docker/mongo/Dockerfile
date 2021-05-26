FROM mongo

COPY data/users.json /users.json
COPY data/articles.json /articles.json
COPY data/favorites.json /favorites.json
COPY data/requests.json /requests.json
COPY data/answers.json /answers.json
COPY data/votes.json /votes.json

CMD mongoimport --host mongodb --port 27017 --db ReadMeDB --collection users --type json --file /users.json --jsonArray; \
    mongoimport --host mongodb --port 27017 --db ReadMeDB --collection articles --type json --file /articles.json --jsonArray; \ 
    mongoimport --host mongodb --port 27017 --db ReadMeDB --collection favorites --type json --file /favorites.json --jsonArray; \ 
    mongoimport --host mongodb --port 27017 --db ReadMeDB --collection requests --type json --file /requests.json --jsonArray; \ 
    mongoimport --host mongodb --port 27017 --db ReadMeDB --collection answers --type json --file /answers.json --jsonArray; \
    mongoimport --host mongodb --port 27017 --db ReadMeDB --collection votes --type json --file /votes.json --jsonArray; 