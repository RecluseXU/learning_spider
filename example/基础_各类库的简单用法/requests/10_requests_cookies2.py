import requests

url = ""
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0',
}
login_form_data = {
    "username": "",
    "password": "",
},
# 代码登录，带着有效的 cookie 来访问

# session类 ，可以用于保存cookie，相当于urllib->cookiejar
session = requests.session()

login_response = session.post(login_url, data=login_form_data, headers=headers)

index_url = ""
data = session.get(url=index_url, headers=headers).content.decode()
print(data)

with open("requests/requests/resoult/10.html") as f:
    f.write(data)
