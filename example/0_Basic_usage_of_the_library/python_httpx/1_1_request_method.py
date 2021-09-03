# -*- encoding: utf-8 -*-
'''
@Time    :   2021-02-23
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   常用的请求方法GET, POST, PUT, DELETE, HEAD, OPTIONS
'''

# here put the import lib
import httpx


# 常用的请求方法GET, POST, PUT, DELETE, HEAD, OPTIONS
r = httpx.get('https://httpbin.org/get')
r = httpx.post('https://httpbin.org/post', data={'key': 'value'})
r = httpx.put('https://httpbin.org/put', data={'key': 'value'})
r = httpx.delete('https://httpbin.org/delete')
r = httpx.head('https://httpbin.org/get')
r = httpx.options('https://httpbin.org/get')


# 设置headers
headers = {'user-agent': 'my-app/0.0.1'}
r = httpx.get('http://httpbin.org/headers', headers=headers)
print(r.json())
