# -*- encoding: utf-8 -*-
'''
@Time    :   2021-01-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   fake_ua
'''
import urllib.request
from fake_useragent import UserAgent


# 此处其实已经并不能得到正常的网页了，原因有很多
# 1. urllib并不能这样直接搞 https 还需要ssl辅助
# 2. 百度有反爬虫，没伪装成浏览器，就莫得。
def load_data():
    url = "https://www.baidu.com"
    ua = UserAgent()

    header = {
        # 浏览器，用户信息
        # 此处通过fake-useragent获取一个随机的，合理的User-Agent
        "User-Agent": ua.random,
        "aim": "an offer"
    }

    request = urllib.request.Request(url, headers=header)

    response = urllib.request.urlopen(request)
    print(response, end="\n\n")
    str_data = response.read().decode("utf-8")

    _useragent = request.get_header("User-agent")
    print(_useragent, end="\n\n")
    return str_data


data = load_data()
with open("python/urllib/spider_resoult/05.html", "w", encoding='utf-8') as f:
    f.write(data)
