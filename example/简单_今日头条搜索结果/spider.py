#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   spider.py
@Time    :   2020/07/27 00:49:53
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   爬取今日头条搜索结果页信息
'''

# here put the import lib
import requests
from requests.exceptions import RequestException
import time
import json


class Article(object):
    def __init__(self, title: str, url_toutiao: str, source: str, image_url: str, create_time: str, abstract: str, summary: str):
        self.title = title  # 标题
        self.url_toutiao = url_toutiao  # 文章链接
        self.source = source  # 作者
        self.image_url = image_url  # 封面图片url
        self.create_time = create_time  # 创建时间
        self.abstract = abstract  # 摘要
        self.summary = summary  # 总结

    def to_dict(self):
        return {
            '标题': self.title,
            '文章链接': self.url_toutiao,
            'source': self.source,
            '封面图片url': self.image_url,
            '创建时间': self.create_time,
            '摘要': self.abstract,
            '总结': self.summary,
        }


def get_page(keyword: str, offset: int):
    '''
    获取信息
    '''
    url = 'https://www.toutiao.com/api/search/content/'
    params = {
        'aid': 24,
        'app_name': 'web_search',
        'offset': offset,
        'format': 'json',
        'keyword': keyword,
        'autoload': 'true',
        'count': 20,
        'en_qc': 1,
        'cur_tab': 1,
        'from': 'search_tab',
        'pd': 'synthesis',
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
    获取数据
    '''
    if info['count'] == 0:
        return [], False
    return [Article(
        title=i.get('title'),
        url_toutiao='https://www.toutiao.com/' + i.get('source_url'),
        source=i.get('source'),
        image_url=i.get('image_url'),
        create_time=i.get('datetime'),
        abstract=i.get('abstract'),
        summary=i.get('summary'),
        ) for i in filter(lambda x: x.get('abstract'), info['data'])], True


def crawl_toutiao_search(keyword: str, page: int):
    result = []
    for i in range(20, page*20+1, 20):
        print((i/20)-1, page)
        info_dict = get_page(keyword, i)
        info, have_next_page = get_info(info_dict)
        result.extend(info)
        if not have_next_page:
            break
    return result


if __name__ == "__main__":
    data = crawl_toutiao_search('python', 10)
    with open('example/简单_今日头条搜索结果/result.json', 'w', encoding='utf-8')as f:
        for arti in data:
            f.write(json.dumps(arti.to_dict(), indent=2, ensure_ascii=False) + '\n')
