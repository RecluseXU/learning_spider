#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   1_another_hello_world.py
@Time    :   2020/08/06 18:24:00
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
'''

# here put the import lib
import mitmproxy.http
from mitmproxy import ctx


class Counter:
    def __init__(self):
        self.num = 0
        ctx.log.info("hello world")

    def request(self, flow: mitmproxy.http.HTTPFlow):
        self.num = self.num + 1
        ctx.log.info("We've seen %d flows" % self.num)


addons = [
    Counter()
]
if __name__ == "__main__":
    # mitmweb -s 1_another_hello_world.py
    pass
