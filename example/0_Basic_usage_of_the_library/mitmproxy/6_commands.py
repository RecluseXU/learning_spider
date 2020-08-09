#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   6_command.py
@Time    :   2020/08/06 23:31:00
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   添加一个用户自定义Commands
'''

# here put the import lib
from mitmproxy import command
from mitmproxy import ctx


class MyAddon:
    def __init__(self):
        self.num = 0

    @command.command("myaddon.inc")
    def inc(self) -> None:
        self.num += 1
        ctx.log.info(f"num = {self.num}")


addons = [
    MyAddon()
]

if __name__ == "__main__":
    # mitmproxy -s 6_commands.py
    # :myaddon.inc
    pass
