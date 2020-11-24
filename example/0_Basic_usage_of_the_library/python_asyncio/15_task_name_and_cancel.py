#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   15_task_name_and_cancel.py
@Time    :   2020-11-24
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   关于 Task 的更多使用方法

文档url: https://docs.python.org/zh-cn/3/library/asyncio-task.html#id14


一个与 Future 类似 的对象，可运行 Python 协程。非线程安全。
Task 对象被用来在事件循环中运行协程。
如果一个协程在等待一个 Future 对象，Task 对象会挂起该协程的执行并等待该 Future 对象完成。
当该 Future 对象 完成，被打包的协程将恢复执行。

事件循环使用协同日程调度:
一个事件循环每次运行一个 Task 对象。
而一个 Task 对象会等待一个 Future 对象完成，该事件循环会运行其他 Task、回调或执行 IO 操作。

使用高层级的 asyncio.create_task() 函数来创建 Task 对象，也可用低层级的 loop.create_task() 或 ensure_future() 函数。
不建议手动实例化 Task 对象。

asyncio.Task 从 Future 继承了其除 Future.set_result() 和 Future.set_exception() 以外的所有 API。

Task 对象支持 contextvars 模块。
当一个 Task 对象被创建，它将复制当前上下文，然后在复制的上下文中运行其协程。
'''

# here put the import lib
import asyncio
from random import randint


async def nested():
    a = 0
    for _ in range(4):
        await asyncio.sleep(1)
        a += randint(1,10)
        print('nested -> {}'.format(a))
    return a


async def using_name():
    '''
    可以为 Task 设置一个名字，用于辨识
    可以在生成Task的时候 传入name参数来设置，也可以通过Task.set_name来设置
    '''
    task = asyncio.create_task(nested(), name='My_name_is_Task')
    # task.set_name('My_name_is_Task')
    await task
    print('Task name is', task.get_name())

    # task.result() 返回 Task 的结果。
    #   如果 Task 对象 已完成，其封包的协程的结果会被返回 (或者当协程引发异常时，该异常会被重新引发。)
    #   如果 Task 对象 被取消，此方法会引发一个 CancelledError 异常。
    #   如果 Task 对象的结果还不可用，此方法会引发一个 InvalidStateError 异常。
    print('Task result is', task.result())


async def using_cancel():
    '''
    要取消一个正在运行的 Task 对象可使用 cancel() 方法。
        调用此方法将使该 Task 对象抛出一个 CancelledError 异常给打包的协程。
        如果取消期间一个协程正在等待一个 Future 对象，该 Future 对象也将被取消。

    '''
    _task = asyncio.create_task(nested())
    await asyncio.sleep(2)  # 等待,以验证真的是运行以后再取消
    _task.cancel()
    try:
        await _task
    except asyncio.CancelledError:
        if _task.cancelled():
            # cancelled() 可被用来检测 Task 对象是否被取消。
            # 如果打包的协程没有抑制 CancelledError 异常并且确实被取消，该方法将返回 True。
            print("task 已经被取消了")

        if _task.done():
            # done()方法 返回 Task 是否已经完成  
            # 如果 Task 对象 已完成 则返回 True。
            # 当 Task 所封包的协程返回一个值、引发一个异常或 Task 本身被取消时，则会被认为 已完成。
            print('task 已经完成')
            


asyncio.run(using_name())
asyncio.run(using_cancel())


