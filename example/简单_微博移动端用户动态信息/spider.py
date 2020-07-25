#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   spider.py
@Time    :   2020年7月26日00:01:52
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
'''

# here put the import lib
import requests
from requests.exceptions import RequestException
import time
import json


class Weibo_info_card(object):
    def __init__(self, attitudes_count: int, comments_count: int, create_time: str, raw_text: str, source: str, single_url: str):
        self.attitudes_count = attitudes_count  # 动态点赞数
        self.comments_count = comments_count  # 动态评论数
        self.create_time = create_time  # 动态发送时间
        self.raw_text = raw_text  # 动态内容
        self.source = source  # 发送动态的方式
        self.single_url = single_url  # 动态详细网址

    def attributes_to_dict(self) -> dict:
        '''
        返回自行定义的属性信息
        '''
        return {
            '点赞数': self.attitudes_count,
            '评论数': self.comments_count,
            '发送时间': self.create_time,
            '动态内容': self.raw_text,
            '发送动态的方式:': self.source,
            '动态详细网址': self.single_url,
        }


def get_json(since_id=None):
    url = 'https://m.weibo.cn/api/container/getIndex'
    params = {
        'uid': 2610429597,
        't': 0,
        'luicode': 10000011,
        'lfid': r'100103type%3D1%26q%3D罗翔',
        'type': 'uid',
        'value': 2610429597,
        'containerid': 1076032610429597,
        'since_id': since_id,
    }
    try:
        response = requests.get(url, params=params)
        time.sleep(2)
        return response.json()
    except RequestException as e:
        print(e)
        return None


def get_info(info: dict):
    '''
    从json响应中获取信息
    '''
    next_since_id = info['data']['cardlistInfo']['since_id']

    info_cards = filter(lambda x: isinstance(x, dict) and x['card_type'] == 9, info['data']['cards'])
    info = [
        Weibo_info_card(
            attitudes_count=card['mblog'].get('attitudes_count'),
            comments_count=card['mblog'].get('comments_count'),
            create_time=card['mblog'].get('created_at'),
            raw_text=card['mblog'].get('raw_text'),
            source=card['mblog'].get('source'),
            single_url=card.get('scheme'),
        ) for card in info_cards]
    return info, next_since_id


def crawl_m_weibo_user_cards(page=10):
    result = []
    next_since_id = None
    while page > 0:
        info = get_json(since_id=next_since_id)
        info, next_since_id = get_info(info)
        result.extend(info)

        page -= 1
        print(page)
    return result


if __name__ == "__main__":
    result = crawl_m_weibo_user_cards()
    with open('example/简单_微博移动端用户动态信息/result.txt', 'w', encoding='utf-8')as f:
        for weibo_card in result:
            f.write(json.dumps(weibo_card.attributes_to_dict(), ensure_ascii=False) + '\n')
