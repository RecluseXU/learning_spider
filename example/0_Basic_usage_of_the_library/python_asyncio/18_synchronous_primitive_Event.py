#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   18_synchronous_primitive_Event.py
@Time    :   2020-11-24
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   同步原语-Event

`asyncio` 事件可被用来通知多个 `asyncio` 任务已经有事件发生。

`Event` 对象会管理一个内部旗标，该旗标初始时将被设为 `false`
* `set()` 方法将其设为 `true`
* `clear()` 方法将其设为 `false`
* `wait()` 方法会阻塞直至该旗标被设为 `true`
'''

# here put the import lib
import asyncio


async def waiter(event):
    print('意大利炮已上膛，等待发射命令中......')
    await event.wait()
    print('开炮！！！开炮！！！开炮！！！')


async def main():
    event = asyncio.Event()  # 创建一个Event对象
    # create_task 生成一个 Task，这个 Task 立即执行
    # 然后碰到event.wait()会一直等待，直到 Event 被 set
    waiter_task = asyncio.create_task(waiter(event))

    # 等待3秒后，set Event
    await asyncio.sleep(3)
    event.set()

    # 虽然说在Event set了以后，Task会运行进行直到运行完毕
    # 但加个等待以确保100% 完成是个好习惯
    await waiter_task

asyncio.run(main())
