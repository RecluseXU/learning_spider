#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   6_run.py
@Time    :   2020-11-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   运行 asyncio 程序
    asyncio.run(coro, *, debug=False)
        执行 coroutine coro 并返回结果。
        此函数会运行传入的协程，负责管理 asyncio 事件循环，终结异步生成器，并关闭线程池。
        当有其他 asyncio 事件循环在同一线程中运行时，此函数不能被调用。
        如果 debug 为 True，事件循环将以调试模式运行。
        此函数总是会创建一个新的事件循环并在结束时关闭之。
        它应当被用作 asyncio 程序的主入口点，理想情况下应当只被调用一次。
'''

# here put the import lib
import asyncio


async def main():
    await asyncio.sleep(1)
    print('hello')

asyncio.run(main())
