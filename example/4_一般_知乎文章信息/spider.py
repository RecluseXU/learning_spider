#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   articles_spider.py
@Time    :   2020/10/21 20:12:29
@Author  :   EvilRecluse
@Contact :   evilrecluse@sxkid.com
@Desc    :   知乎文章爬虫
'''

# here put the import lib
import requests
import execjs
import time
import logging

# 用于保持人性
_SUCCESS_SLEEP = 10


def _get_x_zse_86(url_token:str, offset: int, cookies_d_c0: str):
    '''
    计算x-zse-86
    '''
    with open('x-zse-86.js', 'r', encoding='utf-8') as f:
        enc = f.read()
    exec = execjs.compile(enc)
    x_zse_86 = exec.call('get_x_zse_86', url_token, offset, cookies_d_c0)
    return x_zse_86


def _get_headers(url_token: str, is_org: bool, offset: int, cookies_d_c0: str):
    '''
    获取头部
    '''
    x_zse_86 = _get_x_zse_86(url_token, offset, cookies_d_c0)
    # print(x_zse_86)

    headers = {
        "Accept-Encoding": "",
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        'referer': 'https://www.zhihu.com/',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36",
        'x-requested-with': 'fetch',
        'x-zse-83': '3_2.0',
        'x-zse-86': x_zse_86,
    }
    return headers


def _crawl(url_token: str, is_org: bool, offset: int, cookies):
    logging.info('Try Crawl {} offset:{}'.format(url_token, offset))
    base_url = 'https://www.zhihu.com/api/v4/members/{}/articles'.format(url_token)
    url = base_url + '?include={}&offset={}&limit={}&sort_by={}'.format(
        r"data%5B*%5D.comment_count%2Csuggest_edit%2Cis_normal%2Cthumbnail_extra_info%2Cthumbnail%2Ccan_comment%2Ccomment_permission%2Cadmin_closed_comment%2Ccontent%2Cvoteup_count%2Ccreated%2Cupdated%2Cupvoted_followees%2Cvoting%2Creview_info%2Cis_labeled%2Clabel_info%3Bdata%5B*%5D.author.badge%5B%3F(type%3Dbest_answerer)%5D.topics",  # 一些状态记录，可以视作固定值
        offset,  # 偏移，用于实现类似于翻页的效果 
        20,  # 显示内容的数量
        'created'  # 排序方式
    )
    headers = _get_headers(url_token, is_org, offset, cookies.get('d_c0'))
    response = requests.get(url, headers=headers, cookies=cookies)
    time.sleep(_SUCCESS_SLEEP)
    return response


def _parse(response, url_token):
    logging.info('Parse {}'.format(url_token))
    api_json = response.json()
    total_amount = api_json['paging']['totals']
    need_info, data = {  # 需要的信息:{'要获取的信息在爬虫结果的key': 爬虫value处理函数}
            'id': ('id', lambda x: x ),
            'title': ('title', lambda x: x),
            'author_id': ('author', lambda x: x['id']),
            'creat_time': ('created', lambda x: x),
            'content': ('content', lambda x: x),
            'last_update': ('updated', lambda x: x),
            'image_url': ('image_url', lambda x: x)
        },{}
    for a_artical in api_json['data']:
        _a_data = {
            _need_key: _logic[1](a_artical[_logic[0]])
            for _need_key, _logic in need_info.items()
        }
        data.update({_a_data.pop('id'): _a_data})
    return data, total_amount


def process(is_org: bool, url_token: str, offset: int, cookies):
    '''
    获取一些文章
    '''
    response = _crawl(url_token, is_org, offset, cookies)
    data, total_amount = _parse(response, url_token)
    return data, total_amount


def process_crawl_all(is_org: bool, url_token: str, cookies):
    '''
    获取一个用户的所有文章
    '''
    data, total_amount = process(is_org, url_token, 0, cookies)
    for offset in range(20, total_amount, 20):
        new_data, _ = process(is_org, url_token, offset, cookies)
        data.update(new_data)
    return data


if __name__ == "__main__":
    articals = process_crawl_all(
        is_org=False,
        url_token='revlx',
        cookies={'ISSW': '1', '_xsrf': '386a8d1e-ffa6-4385-a590-10d1b96527fc', '_zap': '3cb4f072-786d-4ad9-a347-4e88aa4be5e8',
                'd_c0': '"APAadlxbyRGPTliEWVfcKPKPvJvx2RMOEXA=|1598350607"', 'KLBRSID': '4843ceb2c0de43091e0ff7c22eadca8c|1603352218|1603352218'}
    )
    print(articals)
