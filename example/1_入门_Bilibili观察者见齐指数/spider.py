#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   text2.py
@Time    :   2020/05/31 15:05:14
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@License :   (C)Copyright 2017-2022, Recluse
@Desc    :   爬取来自 https://www.biliob.com/index/ 目标关键字的数据
'''

# here put the import lib
from datetime import datetime, timedelta
import math
import requests
from requests.exceptions import RequestException
import json


def _crawl_jannchie_index(keyword: str):
    '''
    爬虫见齐指数
    '''
    url = 'https://www.biliob.com/api/index'
    params = {'keyword': keyword}
    headers = {
        'Host': 'www.biliob.com',
        'Cache-Control': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0',
    }
    try:
        response = requests.get(url=url, headers=headers, params=params)
        return response.json()['data']
    except RequestException as e:
        print(e)


def _decryption_data(data: dict):
    '''
    根据js构建的数据解密计算
    '''
    # json里的值并非所求，需要解密
    # data = [{'datetime': '2019-07-18', 'jannchie': 104989}, {'datetime': '2019-07-25', 'jannchie': 108426}, {'datetime': '2019-08-24', 'jannchie': 120663}, {'datetime': '2019-08-30', 'jannchie': 140592}, {'datetime': '2019-09-11', 'jannchie': 115432}, {'datetime': '2019-09-13', 'jannchie': 131578}, {'datetime': '2019-09-14', 'jannchie': 159540}, {'datetime': '2019-09-20', 'jannchie': 130836}, {'datetime': '2019-09-21', 'jannchie': 109326}, {'datetime': '2019-09-21', 'jannchie': 108434}, {'datetime': '2019-09-26', 'jannchie': 119078}, {'datetime': '2019-10-01', 'jannchie': 101894}, {'datetime': '2019-10-03', 'jannchie': 245706}, {'datetime': '2019-10-03', 'jannchie': 167092}, {'datetime': '2019-10-07', 'jannchie': 114827}, {'datetime': '2019-10-09', 'jannchie': 171679}, {'datetime': '2019-10-10', 'jannchie': 148091}, {'datetime': '2019-10-10', 'jannchie': 101217}, {'datetime': '2019-10-12', 'jannchie': 111358}, {'datetime': '2019-10-19', 'jannchie': 109068}, {'datetime': '2019-10-21', 'jannchie': 106133}, {'datetime': '2020-01-12', 'jannchie': 192665}, {'datetime': '2020-01-18', 'jannchie': 425013}, {'datetime': '2020-01-26', 'jannchie': 125028}, {'datetime': '2020-01-26', 'jannchie': 105658}, {'datetime': '2020-02-03', 'jannchie': 120042}, {'datetime': '2020-02-11', 'jannchie': 110348}, {'datetime': '2020-02-12', 'jannchie': 126597}, {'datetime': '2020-02-17', 'jannchie': 148542}, {'datetime': '2020-04-11', 'jannchie': 108354}]

    first_day = datetime.strptime(data[0]['datetime'], r'%Y-%m-%d')
    last_day = datetime.strptime(data[-1]['datetime'], r'%Y-%m-%d')
    n = []
    for day_num in range((last_day-first_day).days + 1):
        n.append([first_day + timedelta(days=day_num), 0])

    for note in data:
        _jannchie = note["jannchie"]
        _compara_day = datetime.strptime(note['datetime'], r'%Y-%m-%d')
        for note in n:
            e = note[0] - _compara_day
            a = e.days
            if a >= 0:
                note[1] = note[1] + round(_jannchie * math.pow(a/7, 2) / 2 * math.pow(2.71, -a/7))
    data = {}
    for note in n:
        data[note[0].strftime(r'%Y-%m-%d')] = note[1]
    return data


def get_jannchie_index(keyword):
    '''
    获取见齐指数
    '''
    data = _crawl_jannchie_index(keyword)
    return _decryption_data(data)


if __name__ == "__main__":
    data = get_jannchie_index('怪物猎人世界')
    with open('example/简单_Bilibili观察者见齐指数/result.txt', 'w', encoding='utf-8')as f:
        json.dump(data, f, indent=2)
