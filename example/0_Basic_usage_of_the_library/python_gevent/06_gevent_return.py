#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   06_gevent_return.py
@Time    :   2020/11/03 09:24:54
@Author  :   EvilRecluse
@Contact :   evilrecluse@sxkid.com
@Desc    :   获取结果
'''

# here put the import lib
from urllib import request
import gevent
from gevent import monkey

monkey.patch_all()  # 将程序中所有IO操作做上标记使程序非阻塞状态
def url_request(url):
    print('get:{}'.format(url))
    resp = request.urlopen(url)
    data = resp.read()
    return len(data)


urls = [
    'https://www.python.org/',
    'https://www.nginx.org/',
    'https://www.ibm.com',
]

future = []
for url in urls:
    g = gevent.spawn(url_request, url)
    future.append(g)

gevent.joinall(future)

for g in future:
	print(g.value)