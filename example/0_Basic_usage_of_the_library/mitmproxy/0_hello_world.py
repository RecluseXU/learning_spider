# -*- encoding: utf-8 -*-
'''
@Time    :   2020-08-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   中间人统计请求数量
'''

# here put the import lib
import mitmproxy.http
from mitmproxy import ctx


num = 0


def request(flow: mitmproxy.http.HTTPFlow):
    """统计请求个数
    """
    global num
    num += 1
    ctx.log.info(f'已经发出了 {num} 个请求')


if __name__ == "__main__":
    # 在当前文件夹打开cmd，输入
    # mitmweb -s 0_hello_world.py
    # 即可启动
    pass
