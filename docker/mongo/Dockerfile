FROM mongo

COPY users.json /users.json
COPY articles.json /articles.json

RUN mongoimport --uri mongodb://mongodb:27017/ReadMeDB --collection users --type json --file /users.json --jsonArray
RUN mongoimport --uri mongodb://mongodb:27017/ReadMeDB --collection articles --type json --file /articles.json --jsonArray