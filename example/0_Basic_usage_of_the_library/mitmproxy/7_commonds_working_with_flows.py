#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   7_commonds_working_with_flows.py
@Time    :   2020/08/06 23:49:16
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
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