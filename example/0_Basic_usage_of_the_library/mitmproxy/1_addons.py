# -*- encoding: utf-8 -*-
'''
@Time    :   2020-08-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   作为插件加载
'''

# here put the import lib
import mitmproxy.http
from mitmproxy import ctx


class Counter:
    def __init__(self):
        self.num = 0

    def request(self, flow: mitmproxy.http.HTTPFlow):
        self.num = self.num + 1
        ctx.log.info(f'已经发出了 {self.num} 个请求')


addons = [
    Counter()
]

if __name__ == "__main__":
    # mitmweb -s 1_another_hello_world.py
    pass
