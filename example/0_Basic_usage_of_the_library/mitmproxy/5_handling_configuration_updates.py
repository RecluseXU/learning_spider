# -*- encoding: utf-8 -*-
'''
@Time    :   2020-08-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   参数设置反馈
    option 参数可能通过命令行或者代码进行变更
    变更后, 脚本运行也应该进行一些变化, 此时就需要configure函数
    既可以检查参数是否合理
    也可以进行其它的设置
'''

# here put the import lib
import typing
from mitmproxy import ctx
from mitmproxy import exceptions
from mitmproxy.http import HTTPFlow
from mitmproxy.addonmanager import Loader


class AddHeader:
    def load(self, loader: Loader):
        loader.add_option(
            name="addheader",
            typespec=typing.Optional[int],
            default=None,
            help="Add a header to responses",
        )

    def configure(self, updates: typing.Set[str]):
        """option 参数发生变更即会调用此函数(首次运行设置参数也是变更)
        :param updates: 记录了发生了变化的 option 参数名称
        """
        if "addheader" in updates:
            addheader = ctx.options.addheader
            if addheader is not None and addheader > 100:
                raise exceptions.OptionsError("addheader must be <= 100")

    def request(self, flow: HTTPFlow):
        if ctx.options.addheader is not None:
            flow.request.headers["addheader"] = str(ctx.options.addheader)


addons = [
    AddHeader()
]

if __name__ == "__main__":
    # mitmdump -s 5_handling_configuration_updates.py --set addheader 20
    pass
