#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   try.py
@Time    :   2020/07/28 20:12:55
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
'''

# here put the import lib
import requests
from requests.exceptions import RequestException
from lxml import etree
import re


def get_page() -> str:
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
        'Host': 'fgw.beijing.gov.cn'
    }
    url = 'http://fgw.beijing.gov.cn/fgwzwgk/zcgk/bwqtwj/201912/t20191226_1506669.htm'

    sess = requests.session()
    try:
        resp = sess.get(url, headers=headers)
        return resp.content.decode('utf-8'), url
    except RequestException as e:
        print(e)



def get_dl_url(html: str, origin_url: str) -> list:
    def get_true_href(a_href: str, origin_url: str) -> str:
        co = re.compile(r'\.{1,2}/')
        '/'.join(origin_url.split('/')[:len(re.findall(co, a_href))])

    root = etree.HTML(html)
    _files = {_file.xpath('./@href'): _file.xpath('./text()') for _file in root.xpath('//div[@id="fj_appendix"]/a')}


def my_process():
    # _html, url = get_page()
    # get_dl_url(_html, url)
    pass

def get_true_href(a_href: str, origin_url: str) -> str:
    origin_url = origin_url[7:]
    print(origin_url)
    co = re.compile(r'\.{1,2}/')
    return 'http://' + '/'.join(origin_url.split('/')[:len(re.findall(co, a_href))]) + '/' + re.sub(co, '', a_href)


if __name__ == "__main__":
    origin_url = 'http://fgw.beijing.gov.cn/fgwzwgk/zcgk/bwqtwj/201912/t20191226_1506669.htm'
    href = "../../../zcjd/201912/t20191226_1505472.htm"
    print(get_true_href(href, origin_url))
    print('http://fgw.beijing.gov.cn/fgwzwgk/zcjd/201912/t20191226_1505472.htm')