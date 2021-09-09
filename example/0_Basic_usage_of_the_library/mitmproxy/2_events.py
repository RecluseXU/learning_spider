# -*- encoding: utf-8 -*-
'''
@Time    :   2020-08-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   为每一个响应的请求头 添加一个 统计数量的响应项
'''

# here put the import lib
import mitmproxy.http
from mitmproxy import ctx


class AddHeader:
    def __init__(self):
        self.num = 0

    def request(self, flow: mitmproxy.http.HTTPFlow):
        self.num = self.num + 1
        flow.request.headers["count"] = str(self.num)
        ctx.log.info('修改了请求头')


addons = [
    AddHeader()
]

if __name__ == "__main__":
    # mitmweb -s 2_events.py
    pass
