FROM mongo

COPY users.json /users.json
COPY articles.json /articles.json

CMD mongoimport --host mongodb --port 27017 --db ReadMeDB --collection users --type json --file /users.json --jsonArray; mongoimport --host mongodb --port 27017 --db ReadMeDB --collection articles --type json --file /articles.json --jsonArray