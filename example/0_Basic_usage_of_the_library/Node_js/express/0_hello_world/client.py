#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   client.py
@Time    :   2020/08/09 00:03:44
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
'''

# here put the import lib
import requests

url = 'http://127.0.0.1:3000/get_num'
data = {
    "a": 1,
    "b": 2
}
resp = requests.post(url, data)
print(resp.text)
