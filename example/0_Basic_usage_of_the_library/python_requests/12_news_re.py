import requests
import re
from fake_useragent import UserAgent

ua = UserAgent()
url = 'https://news.baidu.com/'
headers = {
    "User-Agent": ua.random,
}

response = requests.get(url, headers=headers)
data = response.content.decode()

# 具体怎么样要观察网页结构
pattern = re.compile('<a href="(.*)" target="_blank" mon="(.*)">(.*)</a>')
res_str = pattern.findall(data)

if(data is not None):
    location = "requests/spider_resoult/12.html"
    with open(location, "w", encoding='utf-8') as f:
        f.write(data)

    location = "requests/spider_resoult/12_info.text"
    with open(location, "w", encoding='utf-8') as f:
        f.write(str(res_str))
