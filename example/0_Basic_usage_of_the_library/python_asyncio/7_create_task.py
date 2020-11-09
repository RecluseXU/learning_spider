#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   7_create_task.py
@Time    :   2020-11-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   
    asyncio.create_task(coro, *, name=None)
        将 coro 协程 打包为一个 Task 排入日程准备执行。返回 Task 对象。
        name 不为 None，它将使用 Task.set_name() 来设为任务的名称。
        该任务会在 get_running_loop() 返回的循环中执行，如果当前线程没有在运行的循环则会引发 RuntimeError。

        Python 3.7+可用，版本不够的可以用ensure_future代替，但这个函数可读性较差
'''

# here put the import lib
import asyncio
from random import randint

async def a():
    return randint(1,100)

async def main():
    # In Python 3.7+
    # Python 3.7+ 版本用这个
    task = asyncio.create_task(a())
    await task
    print(task.result())

    # This works in all Python versions but is less readable
    # 这个函数在任何 python 版本都可以用，但可读性较差
    task = asyncio.ensure_future(a())
    await task
    print(task.result())


asyncio.run(main())
