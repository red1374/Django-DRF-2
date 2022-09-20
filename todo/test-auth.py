import requests

# -- Basic authentication --------
# response = requests.get('http://127.0.0.1:8000/api/projects/', data={'username': 'big', 'password': 'big123456'})
# print(response.status_code)
# print(response.json())

# -- Token authentication --------
data = {'username': 'big', 'password': 'big123456'}
response = requests.post('http://127.0.0.1:8000/api-token-auth/', data=data)
token = response.json()
print(token)

response1 = requests.get('http://127.0.0.1:8000/api/projects/', headers={'Authorization': f'Token{token}'})
print(response1.status_code)
print(response1.json())
