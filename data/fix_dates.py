import json
import time
import datetime


if __name__ == "__main__":
    with open("docker/mongo/data/articles.json", "r") as f:
        articles = json.load(f)

    for article in articles:
        date = article["date"]
        if date is not None:
            date_ts = int(time.mktime(datetime.datetime.strptime(date[:19], "%Y-%m-%d %H:%M:%S").timetuple()) * 1000)
            article["date"] = date_ts
        else:
            article["date"] = -1
    
    with open('docker/mongo/data/articles.json', 'w') as f:
            json.dump(articles, f, indent=4)