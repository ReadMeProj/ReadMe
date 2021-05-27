from operator import itemgetter

import networkx as nx
from flask import Flask
from flask import abort
from flask_pymongo import PyMongo
from networkx.algorithms import bipartite

app = Flask(__name__)

# Constants
NOT_ENOUGH_DATA_THRESHOLD = 30


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
    return "user" in json and "article" in json


""" 
    Algorithm: 
    1. Get user's liked articles
    2. if no data regard user - return the highest 
    2. Compute similarity for each couple (user_liked, some article) using Jaccard 
    3. Aggregate those scores for each article.
    4. return the articles with the best score
    """


@app.route("/recommendations/<string:user_id>/<int:num_of_articles>", methods=['GET'])
def recommendation(user_id, num_of_articles):
    if user_id is None or num_of_articles is None:
        abort(400, 'User or number of articles was not provided as expected.')
    JSON_Graph = filter(valid_favorite_json, (mongo.db.favorites.find({})))
    edge_list = list(map(
        lambda fav_json: (fav_json["user"], fav_json["article"]) if fav_json["user"] and fav_json["article"] else None,
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


def main():
    import argparse 

    parser = argparse.ArgumentParser()
    parser.add_argument('-m', '--mongo', default='localhost', help="Mongo host")
    parser.add_argument('-p', '--port', default=5000, help="Recommender service port")
    args = parser.parse_args()

    app.config["MONGO_URI"] = "mongodb://%s:27017/ReadMeDB" % args.mongo
    
    global mongo
    mongo = PyMongo(app)

    app.run(host="127.0.0.1", port=args.port)    


if __name__ == '__main__':
    main()