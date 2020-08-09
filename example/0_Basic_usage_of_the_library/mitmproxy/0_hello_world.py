#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   0.py
@Time    :   2020/08/06 18:09:16
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
'''

# here put the import lib
import mitmproxy.http
from mitmproxy import ctx


num = 0


def request(flow: mitmproxy.http.HTTPFlow):
    global num
    num = num + 1
    ctx.log.info("hello world")
    ctx.log.info("We've seen %d flows" % num)


if __name__ == "__main__":
    # 在当前文件夹打开cmd，输入
    # mitmweb -s 0_hello_world.py
    # 即可启动
    pass
