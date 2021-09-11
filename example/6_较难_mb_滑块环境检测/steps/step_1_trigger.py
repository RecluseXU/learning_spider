# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-01
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   触发
'''

# here put the import lib
from ._base import INIT_COOKIES, BASE_HEADERS
import requests
import json
import time


def triger():
    """触发喝水
    """
    print('Step 1: 触发', end=' ')
    url = "https://shopsearch.taobao.com/search?"
    now_timestamp = time.time()
    params = {
        '_ksTS': str(now_timestamp * 1000).replace('.', '_')[:-1],
        'data-value': '0',
        'shop_type': '',
        'data-key': 's',
        's': '40',
        'js': '1',
        'q': r'%E5%B0%8F%E9%BB%91%E8%A3%99',
        'ajax': 'true',
        'ratesum': 'xin',
        'isb': '0',
        'initiative_id': 'staobaoz_{}'.format(
            time.strftime(r'%Y%m%d', time.localtime(now_timestamp))
        ),
        'ie': 'utf8'
    }
    headers = BASE_HEADERS.copy()
    headers.update({
        'sec-fetch-user': '?1',
        'sec-gpc': '1',
    })
    try:
        with requests.get(url, params, headers=headers,
                          verify=False, cookies=INIT_COOKIES)as resp:
            url = json.loads(resp.text)['url']
            if 'punish' in url:
                print('成功\n', url)
                return url
    except Exception as e:
        print('失败')
        print(e)
        exit()
