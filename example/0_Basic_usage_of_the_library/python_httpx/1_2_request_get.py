# -*- encoding: utf-8 -*-
'''
@Time    :   2021-02-23
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   请求的时候，传入参数
'''

# here put the import lib
import httpx

params = {'key1': 'value1', 'key2': 'value2', 'key3': ['value3', 'value4']}
r = httpx.get('https://httpbin.org/get', params=params)
print(r.url)
