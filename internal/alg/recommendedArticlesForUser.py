import logging
from operator import itemgetter

import networkx as nx
from networkx.algorithms import bipartite

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

# getting from api request
num_of_articles = 20
fav_graph = bipartite.random_graph(10000, 10000, 0.05, directed=False)

# algorithm
rec_articles = []
users, articles = bipartite.sets(fav_graph)

## We get specific userID here i take random one
user = min(users)

logger.info(users)
preds = nx.adamic_adar_index(fav_graph, [(user, u) for u in users])
# for u, v, p in preds:
#     logger.info(f"({u}, {v}) -> {p:.8f}")

preds = sorted(preds, key=itemgetter(2))[:-1]
for user, article, pred_score in reversed(preds):
    if len(rec_articles) > num_of_articles:
        break
    rec_articles = list(set(rec_articles) | set(fav_graph.neighbors(user)))


rec_articles = rec_articles[:num_of_articles]
logger.info(list(rec_articles))
