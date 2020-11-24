#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   14_run_in_thread.py
@Time    :   2020-11-24
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   在线程中运行

文档url: https://docs.python.org/zh-cn/3/library/asyncio-task.html#running-in-threads

coroutine asyncio.to_thread(func, /, *args, **kwargs)

python 3.9+ 才有这个函数

在不同的线程中异步地运行函数 func。
向此函数提供的任何 *args 和 **kwargs 会被直接传给 func。 
并且，当前 contextvars.Context 会被传播，允许在不同的线程中访问来自事件循环的上下文变量。

返回一个可被等待以获取 func 的最终结果的协程。
这个协程函数主要是用于执行在其他情况下会阻塞事件循环的 IO 密集型函数/方法。


'''

# here put the import lib
import time
import asyncio


def blocking_io():
    print(f"start blocking_io at {time.strftime('%X')}")
    time.sleep(1)  # 这里用sleep来模拟IO阻塞
    print(f"blocking_io complete at {time.strftime('%X')}")

async def main():
    print(f"started main at {time.strftime('%X')}")

    await asyncio.gather(
        asyncio.to_thread(blocking_io),
        asyncio.sleep(1))

    print(f"finished main at {time.strftime('%X')}")


asyncio.run(main())

# Expected output:
#
# started main at 19:50:53
# start blocking_io at 19:50:53
# blocking_io complete at 19:50:54
# finished main at 19:50:54