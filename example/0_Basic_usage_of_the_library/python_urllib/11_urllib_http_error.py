# -*- encoding: utf-8 -*-
'''
@Time    :   2021-01-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   error
'''
import urllib.request


def load_data():
    url = "http://www.mhwmod.com/learning_spider.php"
    try:
        response = urllib.request.urlopen(url)
    except urllib.request.HTTPError as error:
        # 这里的error.code是状态码，比如说404什么的。
        print(error.code)
    except urllib.request.URLError as error:
        print(error)
    return data


data = load_data()
