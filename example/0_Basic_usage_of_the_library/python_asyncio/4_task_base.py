#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   4_task.py
@Time    :   2020-11-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   任务 被用来设置日程以便 并发 执行协程。
'''

# here put the import lib
import asyncio
from random import randint


async def nested():
    return randint(1,101)

async def main():
    # Schedule nested() to run soon concurrently
    # with "main()".
    task = asyncio.create_task(nested(), name="This_is_my_task")

    # "task" can now be used to cancel "nested()", or
    # can simply be awaited to wait until it is complete:
    await task
    print(task.result(), task.get_name())

asyncio.run(main())
