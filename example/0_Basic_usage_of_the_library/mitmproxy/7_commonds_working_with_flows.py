# -*- encoding: utf-8 -*-
'''
@Time    :   2020-08-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   将 flows 作为命令参数，实现分类性修改
'''

# here put the import lib
import typing
from mitmproxy import command
from mitmproxy import ctx
from mitmproxy import flow


class MyAddon:
    @command.command("myaddon.addheader")
    def addheader(self, flows: typing.Sequence[flow.Flow]) -> None:
        for f in flows:
            f.request.headers["myheader"] = "value"
        ctx.log.alert("done")


addons = [
    MyAddon()
]

if __name__ == "__main__":
    # mitmproxy -s 7_commonds_working_with_flows.py
    # :myaddon.addheader @focus
    # :myaddon.addheader @all
    # :myaddon.addheader ~d google.com
    pass
