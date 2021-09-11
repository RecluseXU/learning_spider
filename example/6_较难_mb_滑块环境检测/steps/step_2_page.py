# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-01
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   喝水页
'''

# here put the import lib
from ._base import INIT_COOKIES, BASE_HEADERS
import requests
import json
import re


CONFIG_PATTERN = re.compile(r'(<=window\._config_ = ){[^}]+?}')


def page(url):
    print('Step 2: 喝水页', end=' ')
    headers = BASE_HEADERS.copy()
    headers.update({'sec-gpc': '1'})
    try:
        with requests.get(url, headers=headers, cookies=INIT_COOKIES
                          )as resp:
            config = json.loads(CONFIG_PATTERN.search(resp.text).group())
            return config
    except Exception as e:
        print('失败')
        print(e)
        exit()
