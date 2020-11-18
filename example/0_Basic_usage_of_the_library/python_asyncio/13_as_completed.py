#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   13_as_completed.py
@Time    :   2020-11-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   
'''
# here put the import lib
import asyncio
from random import randint


async def foo(i):
    await asyncio.sleep(i)
    return i, randint(1,100)

async def main():
    the_futures = []
    for i in range(8, 0, -2):
        print(i)
        the_futures.append(asyncio.ensure_future(foo(i)))

    for coro in asyncio.as_completed(the_futures):
        earliest_result = await coro
        print(earliest_result)
    # futures加入顺序是8642,完成顺序是2368。函数中间设置了sleep，说明是并发的
asyncio.run(main())
