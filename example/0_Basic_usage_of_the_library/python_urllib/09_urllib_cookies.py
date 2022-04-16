# -*- encoding: utf-8 -*-
'''
@Time    :   2021-01-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   cookies
'''
import urllib.request
from fake_useragent import UserAgent


def load_data():
    # url
    url = "http://www.mhwmod.com/"
    # 请求头
    ua = UserAgent()
    headers = {
        'User-Agent': ua.random,
        'Cookie': 'hibext_instdsigdipv2=1; wp-settings-time-19=1579333777; wordpress_test_cookie=WP+Cookie+check; wordpress_logged_in_4850df60cdc1a0d4684584adeedb632b=RecluseXu%7C1580543372%7Cz0jzw1CsumvlN3jiderPBpo8qQS51224800d819619a536ee5c63de9c96ffe2e4c580c01fb05acd14a8e',
        "Aim": "an offer",
        "Name": "Recluse"
    }
    # 创建请求对象
    request = urllib.request.Request(url, headers=headers)
    # 发送请求，获取响应对象
    response = urllib.request.urlopen(request)
    # 读取数据
    data = response.read().decode("utf-8")
    return data


data = load_data()
if(data is not None):
    with open("python/urllib/spider_resoult/09.html", "w", encoding='utf-8') as f:
        f.write(data)