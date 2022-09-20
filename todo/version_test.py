import requests

headers = {'Accept': 'application/json; version=v2'}

response = requests.get('http://127.0.0.1:8000/api/projects/', headers=headers)
print(response.json())
