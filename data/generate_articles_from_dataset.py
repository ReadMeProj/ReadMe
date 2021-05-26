import json
import uuid
import pathlib
import pandas
import opengraph_py3 as opengraph
from datetime import datetime
import ast

if __name__ == '__main__':
    print("Generating articles.json")

    readme_data = []
    
    df = pandas.read_csv("data/result_final.csv")
    for index, row in df.iterrows():
        new_json = {}
        id = uuid.uuid4()
        date = row["date"] 
        url = row["link"]
        
        new_json["_id"] = str(id)
        new_json["id"] = str(id)
        new_json["name"] = row["title"]
        new_json["url"] = url
        new_json["date"] = date

        labels = []
        keywords = row["keywords"]
        if keywords and not pandas.isna(keywords):
            keywords = ast.literal_eval(keywords)
            for keyword in keywords:
                labels.append({"label": keyword, "score": 1})
        
        new_json["labels"] = labels
        
        try:
            print(url)
            ogp = opengraph.OpenGraph(url)
            ogp_json = json.loads(ogp.to_json())
            if "image" in ogp_json:
                new_json["image"] = ogp_json["image"]
            if "site_name" in ogp_json:
                new_json["site"] = ogp_json["site_name"]
        except:
            print(1)
        readme_data.append(new_json)

    print(f"length={len(readme_data)}")
    with open('data/articles.json', 'w') as f:
        json.dump(readme_data, f, indent=4)

