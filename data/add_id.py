import json
import uuid

file = 'docker/mongo/data/votes.json'

with open(file, 'r') as f:
    data = json.load(f)
f.close()

for i in range(len(data)):
    data[i]["_id"] = data[i]["id"] if "id" in data[i] else str(uuid.uuid4())

with open(file, 'w') as f:
    json.dump(data, f, indent=4)
