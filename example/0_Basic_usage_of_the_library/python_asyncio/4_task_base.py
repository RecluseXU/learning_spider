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
    # 利用 协程函数 nested() 创建了一个 Task
    # 这个 Task 会被 协程 main() 立即执行, 无论你是否await
    task = asyncio.create_task(nested())

    # Task 执行后，可以被中途取消，也可以等待到它执行完毕
    await task
    print(task.result())

asyncio.run(main())
