import json
import uuid
import pathlib


if __name__ == '__main__':
    print("Generating articles.json")

    dataset_dir = pathlib.Path("~/Downloads/")

    data = []
    with open('News_Category_Dataset_v2.json') as f:
        for line in f:
            data.append(json.loads(line))
    print(len(data))

    readme_data = []
    for entry in data:
        new_json = {}
        id = uuid.uuid4()
        new_json["_id"] = id
        new_json["id"] = id
        new_json["name"] = entry["headline"]

        url = entry["link"]
        new_json["url"] = url
        new_json["author"] = entry["authors"]
        new_json["date"] = entry["date"]
        new_json["labels"] = [{"label": entry["category"], "score": 1}]



