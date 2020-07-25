#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   spider.py
@Time    :   2020年7月25日23:27:28
@Author  :   Recluse Xu
@Version :   1.1
@Contact :   444640050@qq.com
'''

# here put the import lib
import requests
from requests.exceptions import RequestException
import re
from datetime import datetime
import json
import time


class top_film(object):
    def __init__(self, rank: int, link: str, title: str, img_url: str, star: list, release_time: datetime, sorce: float):
        self.rank = rank
        self.link = link
        self.title = title
        self.img_url = img_url
        self.star = star
        self.release_time = release_time
        self.sorce = sorce

    def to_dict(self):
        return {
            '排名': self.rank,
            '链接': self.link,
            '电影名': self.title,
            '封面图链接': self.img_url,
            '主演:': str(self.star),
            '上映时间': self.release_time.strftime(r'%Y-%m-%d'),
            '猫眼评分': str(self.sorce)
        }


def get_a_page(page_num):
    url = 'https://maoyan.com/board/4?offset=' + str(page_num*10)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    }
    try:
        response = requests.get(url, headers=headers)
        time.sleep(3)
        if response.status_code == 200:
            return response.text
    except RequestException as e:
        print(e)
        return None


def get_info(html: str):
    pattern = re.compile(
        r'<dd>[\s\S]*?board-index-.+?>(.*?)<[\s\S]+?href="(.*?)" title="(.*?)"[\s\S]+?<img data-src="(.*?)"[\s\S]+?<p class="star">[\s\S]*?主演：(.*?)\n[\s\S]*?上映时间：(\d+-\d+-\d+).*?<[\s\S]*?class="integer">(.*?)<[\s\S]*?class="fraction">(.*?)<')
    z = re.findall(pattern, html)
    return [top_film(
        rank=i[0],
        link=r'https://maoyan.com/'+i[1],
        title=i[2],
        img_url=i[3],
        star=i[4].split(','),
        release_time=datetime.strptime(i[5], r'%Y-%m-%d'),
        sorce=float(i[6]+i[7])) for i in z]


def crawl_maoyan_top_100():
    result = []
    for page_num in range(0, 10):
        html = get_a_page(page_num)
        result.extend(get_info(html))
        print(page_num)
    return result


if __name__ == "__main__":
    result = crawl_maoyan_top_100()
    with open('example/简单_猫眼电影排行榜/result.txt', 'w', encoding='utf-8')as f:
        for film in result:
            f.write(json.dumps(film.to_dict(), ensure_ascii=False) + '\n')