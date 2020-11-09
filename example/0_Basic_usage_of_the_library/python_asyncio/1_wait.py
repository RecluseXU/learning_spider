#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   1_wait.py
@Time    :   2020-11-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   协程是可以进行等待的，可以串行执行的
'''

# here put the import lib
import asyncio
import time

async def say_after(delay, what):
    await asyncio.sleep(delay)
    print(what)

async def main():
    print(f"started at {time.strftime('%X')}")
    # 直接运行并等待执行完毕（简单来说就是串行执行的协程）
    await say_after(1, 'hello')
    await say_after(2, 'world')
    print(f"finished at {time.strftime('%X')}")

asyncio.run(main())