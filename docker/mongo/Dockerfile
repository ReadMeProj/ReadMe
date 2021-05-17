FROM mongo

COPY users.json /users.json
COPY articles.json /articles.json
COPY favorites.json /favorites.json
COPY comments.json /comments.json

CMD mongoimport --host mongodb --port 27017 --db ReadMeDB --collection users --type json --file /users.json --jsonArray; \
    mongoimport --host mongodb --port 27017 --db ReadMeDB --collection articles --type json --file /articles.json --jsonArray; \ 
    mongoimport --host mongodb --port 27017 --db ReadMeDB --collection favorites --type json --file /favorites.json --jsonArray; \ 
    mongoimport --host mongodb --port 27017 --db ReadMeDB --collection comments --type json --file /comments.json --jsonArray; 