#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   2_flow.py
@Time    :   2020/08/06 22:01:21
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   为每一个响应的响应头 添加一个 统计数量的响应项
'''

# here put the import lib
from mitmproxy import ctx


class AddHeader:
    def __init__(self):
        self.num = 0

    def response(self, flow):
        self.num = self.num + 1
        flow.response.headers["count"] = str(self.num)

addons = [
    AddHeader()
]