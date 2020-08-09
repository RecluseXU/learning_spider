#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   8_commands_paths.py
@Time    :   2020/08/07 00:14:03
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   将文件路径作为命令参数处理
'''

# here put the import lib
import typing

from mitmproxy import command
from mitmproxy import ctx
from mitmproxy import flow
from mitmproxy import types


class MyAddon:
    @command.command("myaddon.histogram")
    def histogram(
        self,
        flows: typing.Sequence[flow.Flow],
        path: types.Path,
    ) -> None:
        totals = {}
        for f in flows:
            totals[f.request.host] = totals.setdefault(f.request.host, 0) + 1

        with open(path, "w+") as fp:
            for cnt, dom in sorted([(v, k) for (k, v) in totals.items()]):
                fp.write("%s: %s\n" % (cnt, dom))

        ctx.log.alert("done")


addons = [
    MyAddon()
]

if __name__ == "__main__":
    # mitmproxy -s 8_commands_paths.py
    # :myaddon.histogram @all /tmp/xxx
    pass
