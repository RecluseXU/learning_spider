#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   05_gevent_async_io.py
@Time    :   2020/11/02 14:14:26
@Author  :   EvilRecluse
@Contact :   evilrecluse@sxkid.com
@Desc    :   None
'''

# here put the import lib
from urllib import request
import gevent,time
from gevent import monkey

monkey.patch_all()   #将程序中所有IO操作做上标记使程序非阻塞状态
def url_request(url):
    print('get:%s'%url)
    resp = request.urlopen(url)
    data = resp.read()
    print('%s bytes received from %s'%(len(data),url))

async_time_start = time.time() # 开始时间
gevent.joinall([
    gevent.spawn(url_request, 'https://www.python.org/'),
    gevent.spawn(url_request, 'https://www.nginx.org/'),
    gevent.spawn(url_request, 'https://www.ibm.com'),
])
print('异步IO一共耗时:',time.time()-async_time_start) # 总用时

time_start = time.time()
url_request('https://www.python.org/')
url_request('https://www.nginx.org/')
url_request('https://www.ibm.com')
print('串行共耗时:',time.time()-async_time_start) # 总用时