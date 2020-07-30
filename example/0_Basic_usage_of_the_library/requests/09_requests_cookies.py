import requests

url = ""
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0',
}

# Type1:
cookies_dict = {
    '1': "2"
}
# 传入dict或者cookiejar类型对象
response = requests.get(url= url, headers=headers, cookies=cookies_dict)


data = response.content.decode()
print(data)

with open("requests/requests/resoult/09.html") as f:
    f.write(data)
