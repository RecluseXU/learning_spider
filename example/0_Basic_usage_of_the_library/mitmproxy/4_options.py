#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   4_options.py
@Time    :   2020/08/06 22:21:28
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   添加一个 mitmproxy option
'''

# here put the import lib
from mitmproxy import ctx


class AddHeader:
    def __init__(self):
        self.num = 0

    def load(self, loader):
        loader.add_option(
            name = "addheader",
            typespec = bool,
            default = False,
            help = "Add a count header to responses",
        )

    def response(self, flow):
        if ctx.options.addheader:
            self.num = self.num + 1
            flow.response.headers["count"] = str(self.num)

addons = [
    AddHeader()
]


if __name__ == "__main__":
    # mitmproxy -s 4_options.py --set addheader true
    pass
