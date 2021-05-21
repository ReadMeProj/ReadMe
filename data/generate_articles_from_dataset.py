import json
import uuid
import pathlib
import pandas
import opengraph_py3 as opengraph
from datetime import datetime


if __name__ == '__main__':
    print("Generating articles.json")

    readme_data = []
    
    df = pandas.read_csv("data/result_final.csv")
    for index, row in df.iterrows():
        new_json = {}
        id = uuid.uuid4()
        date = row["date"] 
        url = row["link"]
        
        new_json["_id"] = id
        new_json["id"] = id
        new_json["name"] = row["title"]
        new_json["url"] = url
        new_json["date"] = date

        labels = []
        keywords = row["keywords"]
        if keywords and not pandas.isna(keywords):
            for keyword in keywords:
                labels.append({"label": keyword, "score": 1})
        
        new_json["labels"] = labels
        
        try:
            ogp = opengraph.OpenGraph(url)
            ogp_json = ogp.to_json()
            new_json["image"] = ogp_json.get("image", None)
        except:
            print(1)
    print(index)

