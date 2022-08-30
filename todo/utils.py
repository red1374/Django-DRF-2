import json
import os

JSON_PATH = 'todo\json'


def load_from_json(file_name):
    if file_name == '':
        return False

    path_to_file = os.path.join(JSON_PATH, file_name + '.json')
    with open(path_to_file, 'r') as infile:
        return json.load(infile)
