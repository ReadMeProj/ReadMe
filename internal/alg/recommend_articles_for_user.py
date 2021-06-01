import functools
import operator
from collections import defaultdict, Counter
from operator import itemgetter

import networkx as nx
from flask import Flask
from flask import abort
from flask_pymongo import PyMongo
from networkx.algorithms import bipartite

app = Flask(__name__)

# Constants
NOT_ENOUGH_DATA_THRESHOLD = 30
TAG_THRESHOLD = 0.5
NUM_OF_TAGS = 20
REQUEST_MATCH_THRESHOLD = 3


# Function that getting the data as we get it from the api and returns a connected nx bipartite Graph
def prep(edge_list):
    raw_graph = nx.Graph(edge_list)
    return raw_graph


def generic_recommendation(raw_graph, num_of_articles):
    articles_by_degree = []
    for connected_component in nx.connected_components(raw_graph):
        connected_component = nx.subgraph(raw_graph, connected_component)
        users, articles = bipartite.sets(connected_component)
        articles_degree = filter(lambda node: node[0] in articles, connected_component.degree)
        articles_by_degree.extend(
            sorted(articles_degree, key=itemgetter(1), reverse=True))
    articles, _ = zip(*articles_by_degree)
    return articles[:num_of_articles]


def valid_favorite_json(json):
    return "userid" in json and "articleid" in json


def valid_request_json(json):
    return "articleid" in json


""" 
    Algorithm: 
    1. Get user's liked articles
    2. if no data regard user - return the highest 
    2. Compute similarity for each couple (user_liked, some article) using Jaccard 
    3. Aggregate those scores for each article.
    4. return the articles with the best score
    """


@app.route("/recommendationz/<string:user_id>/<int:num_of_articles>", methods=['GET'])
def recommendationz(user_id, num_of_articles):
    if user_id is None or num_of_articles is None:
        abort(400, 'User or number of articles was not provided as expected.')
    JSON_Graph = filter(valid_favorite_json, (mongo.db.favorites.find({})))
    edge_list = list(map(
        lambda fav_json: (fav_json["userid"], fav_json["articleid"]) if fav_json["userid"] and fav_json[
            "articleid"] else None,
        JSON_Graph))

    # Find user's articles 
    user_articles = set(filter(lambda tup: tup[0] == user_id, edge_list))
    user_articles = {tup[1] for tup in user_articles}
    # Filter out articles that the user didn't like
    users_favs_user_articles = set(filter(lambda tup: tup[1] in user_articles, edge_list))
    users_favs_user_articles = {tup[0] for tup in users_favs_user_articles}
    users_favs_user_articles.add(user_id)
    # Keep the edge_list only with users that have an edge to the user_id articles
    print(f'len edge_list before => {len(edge_list)}', flush=True)
    edge_list = list(filter(lambda tup: tup[0] in users_favs_user_articles, edge_list))
    print(f'len edge_list after => {len(edge_list)}', flush=True)

    raw_graph = prep(edge_list)
    connected_component = nx.algorithms.node_connected_component(raw_graph, user_id)
    G = raw_graph.subgraph(connected_component)
    users, articles = bipartite.sets(G)
    liked_articles_by_user = set(nx.neighbors(G, user_id))

    if len(liked_articles_by_user) < NOT_ENOUGH_DATA_THRESHOLD:
        recommended = generic_recommendation(raw_graph, num_of_articles)
    else:
        tuples = [(article_liked_by_user, some_article)
                  for article_liked_by_user in liked_articles_by_user
                  for some_article in articles
                  if not (article_liked_by_user == some_article or some_article in liked_articles_by_user)]

        similarity_scores = nx.jaccard_coefficient(G, tuples)
        article_set_ndup = [article for article in articles if article not in liked_articles_by_user]
        article_score_dict = dict.fromkeys(article_set_ndup, 0)
        for sim_score in similarity_scores:
            article_score_dict[sim_score[1]] += sim_score[2]
        sorted_dict = sorted(article_score_dict.items(), key=itemgetter(1), reverse=True)
        articles_sorted_by_score, scores = zip(*sorted_dict)
        recommended = articles_sorted_by_score[:num_of_articles]
        if len(recommended) < num_of_articles:
            recommended.extend(generic_recommendation(raw_graph, num_of_articles - len(recommended)))
    return {
        "error": None,
        "data": recommended
    }


@app.route("/recommendations/<string:user_id>/<int:num_of_articles>", methods=['GET'])
def recommendation(user_id, num_of_articles):
    if user_id is None or num_of_articles is None:
        abort(400, 'User or number of articles was not provided as expected.')
    JSON_Graph = list(filter(valid_favorite_json, (mongo.db.favorites.find({}))))
    edge_list = list(map(
        lambda fav_json: (fav_json["userid"], fav_json["articleid"]) if fav_json["userid"] and fav_json[
            "articleid"] else None,
        JSON_Graph))

    raw_graph = prep(edge_list)
    connected_component = nx.algorithms.node_connected_component(raw_graph, user_id)
    G = raw_graph.subgraph(connected_component)
    users, articles = bipartite.sets(G)
    liked_articles_by_user = set(nx.neighbors(G, user_id))

    if len(liked_articles_by_user) < NOT_ENOUGH_DATA_THRESHOLD:
        recommended = generic_recommendation(raw_graph, num_of_articles)
    else:
        tuples = [(article_liked_by_user, some_article)
                  for article_liked_by_user in liked_articles_by_user
                  for some_article in articles
                  if not (article_liked_by_user == some_article or some_article in liked_articles_by_user)]

        similarity_scores = nx.jaccard_coefficient(G, tuples)
        article_set_ndup = [article for article in articles if article not in liked_articles_by_user]
        article_score_dict = dict.fromkeys(article_set_ndup, 0)
        for sim_score in similarity_scores:
            article_score_dict[sim_score[1]] += sim_score[2]
        sorted_dict = sorted(article_score_dict.items(), key=itemgetter(1), reverse=True)
        articles_sorted_by_score, scores = zip(*sorted_dict)
        recommended = articles_sorted_by_score[:num_of_articles]
        if len(recommended) < num_of_articles:
            recommended.extend(generic_recommendation(raw_graph, num_of_articles - len(recommended)))
    return {
        "error": None,
        "data": recommended
    }


@app.route("/tags/<string:user_id>/<int:num_of_tags>", methods=['GET'])
def user_tags(user_id, num_of_tags):
    if user_id is None or num_of_tags is None:
        abort(400, 'User or number of tags was not provided as expected.')
    JSON_Graph = filter(valid_favorite_json, (mongo.db.favorites.find({"userid": user_id})))
    users_favorites_articles_ids = list(map(lambda like_edge: like_edge["articleid"], JSON_Graph))
    if len(users_favorites_articles_ids) == 0:
        return {"labels": []}
    articles = mongo.db.articles.find({'_id': {'$in': users_favorites_articles_ids}})
    labels = list(map(lambda article: article["labels"], articles))
    labels = functools.reduce(operator.iconcat, labels, [])
    by_label = defaultdict(Counter)
    for info in labels:
        counts = Counter({k: v for k, v in info.items() if k != 'label' and v > TAG_THRESHOLD})
        by_label[info['label']] += counts
    score_per_label = [(k, v.get("score")) for k, v in by_label.items()]
    score_per_label = sorted(score_per_label, key=itemgetter(1), reverse=True)
    labels = list(map(lambda label: label[0], score_per_label[:num_of_tags]))
    return {"labels": labels}


@app.route("/requests/<string:user_id>/<int:num_of_requests>", methods=['GET'])
def user_requests(user_id, num_of_requests):
    if user_id is None or num_of_requests is None:
        abort(400, 'User or number of requests was not provided as expected.')

    users_tags = set(user_tags(user_id, NUM_OF_TAGS)["labels"])
    requests = list(filter(valid_request_json, (mongo.db.requests.find({}))))

    articles = list(mongo.db.articles.find({"_id": {"$in": [request["articleid"] for request in requests]}},
                                           {"labels": 1}))

    requests_labels = [(request["id"], article["labels"])
                       for request in requests
                       for article in articles
                       if request["articleid"] == article["_id"]]

    requests_labels = list(map(lambda x:
                               (x[0],
                                set([label["label"] for label
                                     in x[1] if label["score"] > TAG_THRESHOLD])),
                               requests_labels))

    requests = [request[0] for request
                in requests_labels
                if len(request[1].intersection(users_tags)) > REQUEST_MATCH_THRESHOLD]

    return {"requests": requests[:num_of_requests]}


def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('-m', '--mongo', default='localhost', help="Mongo host")
    parser.add_argument('-p', '--port', default=5000, help="Recommender service port")
    args = parser.parse_args()

    app.config["MONGO_URI"] = "mongodb://%s:27017/ReadMeDB" % args.mongo

    global mongo
    mongo = PyMongo(app)

    app.run(host="0.0.0.0", port=args.port)


if __name__ == '__main__':
    main()
