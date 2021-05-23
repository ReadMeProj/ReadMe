import logging
from operator import itemgetter

import networkx as nx
from networkx.algorithms import bipartite

## Constants
NOT_ENOUGH_DATA_THRESHOLD = 5


## Function that getting the data as we get it from the api and returns a connected nx bipartite Graph
def prep(JSON_Graph):
    raw_graph = bipartite.random_graph(100, 1000, 0.01, directed=False)
    # TODO: take json and transform to networkx graph

    connected_component = nx.algorithms.node_connected_component(raw_graph, userId)
    connected_component_graph = raw_graph.subgraph(connected_component)
    return connected_component_graph


def generic_recommendation(G , num_of_articles):
    pass


def recommendation(JSON_Graph, userId, num_of_articles):
    # create logger with 'spam_application'
    logger = logging.getLogger('recommendations')
    logger.setLevel(logging.DEBUG)
    # create file handler which logs even debug messages
    fh = logging.FileHandler('recommendation.log')
    fh.setLevel(logging.DEBUG)
    # create console handler with a higher log level
    ch = logging.StreamHandler()
    ch.setLevel(logging.INFO)
    # create formatter and add it to the handlers
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    fh.setFormatter(formatter)
    ch.setFormatter(formatter)
    # add the handlers to the logger
    logger.addHandler(fh)
    logger.addHandler(ch)

    G = prep(JSON_Graph)

    # Algorithm
    rec_articles = set()
    users, articles = bipartite.sets(G)
    liked_articles_by_user = set(nx.neighbors(G, userId))

    if len(liked_articles_by_user) < NOT_ENOUGH_DATA_THRESHOLD:
        return generic_recommendation(G, num_of_articles)

    tuples = [(article_liked_by_user, some_article)
              for article_liked_by_user in liked_articles_by_user
              for some_article in articles
              if not (article_liked_by_user == some_article or some_article in liked_articles_by_user)]

    similarity_scores = sorted(list(nx.jaccard_coefficient(G, tuples)), reverse=True, key=itemgetter(2))
    users_likes_list, article_list, sim_score = zip(*similarity_scores)


### Try another approach

#
# tuples = [(userId, u) for u in users][1:]
# preds = nx.jaccard_coefficient(connected_component_graph, tuples)
# # for u, v, p in preds:
# #     logger.info(f"({u}, {v}) -> {p:.8f}")
#
#
# user_neighbors = list(nx.neighbors(connected_component_graph, userId))
# preds = sorted(list(preds), reverse=True, key=itemgetter(2))
# for my_user, user, pred_score in preds:
#     if len(rec_articles) > num_of_articles:
#         break
#     similiar_user_neighbors = set(connected_component_graph.neighbors(user))
#     added_articles = similiar_user_neighbors.difference(set(user_neighbors))
#     rec_articles = rec_articles.union(added_articles)
#
# rec_articles = list(rec_articles)[:num_of_articles]
# logger.info(rec_articles)


if __name__ == "__main__":
    JSON_Graph = {"graph": [{"userId": 123, "articleId": 122}, {"userId": 222, "articleId": 223}]}
    userId = 0
    num_of_articles = 20

    recommended_articles = recommendation(JSON_Graph, userId, num_of_articles)
