#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   2_asyncio.py
@Time    :   2020-11-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   创建协程
'''

# here put the import lib
import asyncio
import time


async def say_after(delay, what):
    await asyncio.sleep(delay)
    print(what)


async def main():
    task1 = asyncio.create_task(say_after(2, 'world'))
    task2 = asyncio.create_task(say_after(1, 'hello'))

    print(f"started at {time.strftime('%X')}")

    # 等待到两个协程都执行完毕，因为是并行的，预计会用两秒钟
    await task1
    await task2

    print(f"finished at {time.strftime('%X')}")

asyncio.run(main())
