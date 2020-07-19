import requests

url = "http://www.12306.con"
headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0'
}

# 因为https 是有第三方 CA 证书认证的
# 但是 12306 虽然是https,但是它不是 CA证书，他是自己颁布的证书。
# 解决方法：直接告诉 web 忽略证书 访问
response = requests.get(url= url, headers=headers, verify=False)
data = response.content.decode()
print(data)

with open("requests/requests/resoult/08.html") as f:
    f.write(data)

# requests.exceptions.SSLError: HTTPSConnectionPool...
# 