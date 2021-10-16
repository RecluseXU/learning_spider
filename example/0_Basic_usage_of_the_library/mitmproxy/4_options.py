# -*- encoding: utf-8 -*-
'''
@Time    :   2020-08-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   添加一个 mitmproxy option

option 参数通过 --set 进行设置, 形式类似于 --set addheader=true
在脚本中同样也可以进行设置 ctx.options.addheader = False
'''

# here put the import lib
from mitmproxy import ctx
from mitmproxy.http import HTTPFlow
from mitmproxy.addonmanager import Loader


class AddHeader:
    def __init__(self):
        self.num = 0

    def load(self, loader: Loader):
        print(type(loader))
        loader.add_option(
            name="addheader",
            typespec=bool,
            default=False,
            help='Add a count header to requests',
        )

    def request(self, flow: HTTPFlow):
        if ctx.options.addheader:
            self.num = self.num + 1
            flow.request.headers["count"] = str(self.num)


addons = [
    AddHeader()
]


if __name__ == "__main__":
    # mitmdump -s 4_options.py --set addheader=true
    pass
