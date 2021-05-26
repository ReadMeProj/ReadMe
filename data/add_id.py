import json

file = 'docker/mongo/data/answers.json'

with open(file, 'r') as f:
    data = json.load(f)
f.close()

for i in range(len(data)):
    data[i]["_id"] = data[i]["id"]

with open(file, 'w') as f:
    json.dump(data, f, indent=4)
