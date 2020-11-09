#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   10_shield.py
@Time    :   2020-11-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   屏蔽取消操作
    awaitable asyncio.shield(aw, *, loop=None)
    保护一个 可等待对象 防止其被 取消。
    如果 aw 是一个协程，它将自动作为任务加入日程。
    以下语句:

    res = await shield(something()) 相当于 res = await something()

    不同之处 在于如果包含它的协程被取消，在 something() 中运行的任务不会被取消。
    从 something() 的角度看来，取消操作并没有发生。
    然而其调用者已被取消，因此 "await" 表达式仍然会引发 CancelledError。
    如果通过其他方式取消 something() (例如在其内部操作) 则 shield() 也会取消。

'''

# here put the import lib
import asyncio
from asyncio.tasks import shield
from random import randint


async def nested():
    return randint(1,101)

async def main():
    task = asyncio.create_task(nested())
    await shield(task)
    print(task.result())

asyncio.run(main())
