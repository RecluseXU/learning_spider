#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   8_sleep.py
@Time    :   2020-11-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   阻塞等待协程
    coroutine asyncio.sleep(delay, result=None, *, loop=None)
        阻塞 delay 指定的秒数。
        如果指定了 result，则当协程完成时将其返回给调用者。
        sleep() 总是会挂起当前任务，以允许其他任务运行。
'''
# here put the import lib
import asyncio
import datetime


async def display_date(name):
    loop = asyncio.get_running_loop()
    end_time = loop.time() + 5.0
    while True:
        print(name, datetime.datetime.now())
        if (loop.time() + 1.0) >= end_time:
            break
        await asyncio.sleep(1)


async def just_run():
    t1 = asyncio.create_task(display_date('1'))
    t2 = asyncio.create_task(display_date('2'))
    await t1
    await t2


asyncio.run(just_run())
