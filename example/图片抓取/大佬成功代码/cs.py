#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time : 2021/4/15 下午8:00
# @Author : artio
# @File : t.py
# @version    : v1.0
# @editor : artio, evilrecluse
# @desc: 功能模块 功能概述

import urllib3.util.ssl_
from pprint import pprint
import requests


# 此处将多余的TLS加密组件删掉了
ciphers = [i for i in urllib3.util.ssl_.DEFAULT_CIPHERS.split(":") if not i.startswith("!")]
urllib3.util.ssl_.DEFAULT_CIPHERS = ":".join(ciphers)


url = "https://www.carbosynth.com/carbosynth/website.nsf/(w-productdisplay)/6C2CE1DA0E6118CC802585F9006C02A6/$file/FF33415_structure.png"
payload = {}


# 由于检查了header顺序，这里会使用固定顺序的header
class Headers(dict):
    def items(self):
        return ((
            ('Host', 'www.carbosynth.com'),
            ('Connection', 'keep-alive'),
            ('Pragma', 'no-cache'),
            ('Cache-Control', 'no-cache'),
            ('sec-ch-ua', '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"'),
            ('sec-ch-ua-mobile', '?0'),
            ('Upgrade-Insecure-Requests', '1'),
            ('User-Agent',
             'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36'),
            ('Accept',
             'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'),
            ('Sec-Fetch-Site', 'none'),
            ('Sec-Fetch-Mode', 'navigate'),
            ('Sec-Fetch-User', '?1'),
            ('Sec-Fetch-Dest', 'document'),
            ('Accept-Encoding', 'gzip, deflate, br'),
            ('Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8'),
        ))


print('--------------------')
with requests.sessions.Session() as session_:
    session_.headers = requests.structures.CaseInsensitiveDict(Headers().items())
    pprint(session_.headers)
    response = session_.get(url, verify=False)
pprint(response.request.headers)

with open('1.png', 'wb')as f:
    f.write(response.content)
