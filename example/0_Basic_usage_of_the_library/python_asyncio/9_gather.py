#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   9_gather.py
@Time    :   2020-11-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   并发运行任务
    awaitable asyncio.gather(*aws, return_exceptions=False)
        并发 运行 aws 序列中的 可等待对象。
        如果 aws 中的某个可等待对象为协程，它将自动作为一个任务加入日程。
        如果所有可等待对象都成功完成，结果将是一个由所有返回值聚合而成的列表。
            结果值的顺序与 aws 中可等待对象的顺序一致。
        如果 return_exceptions 为 False (默认)，所引发的首个异常会立即传播给等待 gather() 的任务。
            aws 序列中的其他可等待对象 不会被取消 并将继续运行。
        如果 return_exceptions 为 True，异常会和成功的结果一样处理，并聚合至结果列表。
        如果 gather() 被取消，所有被提交 (尚未完成) 的可等待对象也会 被取消。
        如果 aws 序列中的任一 Task 或 Future 对象 被取消，它将被当作引发了 CancelledError 一样处理
            在此情况下 gather() 调用 不会 被取消。
            这是为了防止一个已提交的 Task/Future 被取消导致其他 Tasks/Future 也被取消。

注解 
    如果 return_exceptions 为 False，则在 gather() 被标记为已完成后取消它将不会取消任何已提交的可等待对象。 
    例如
        在将一个异常传播给调用者之后，gather 可被标记为已完成，
        因此，在从 gather 捕获一个（由可等待对象所引发的）异常之后调用 gather.cancel() 将不会取消任何其他可等待对象。
    在 3.7 版更改: 如果 gather 本身被取消，则无论 return_exceptions 取值为何，消息都会被传播。
'''

# here put the import lib
import asyncio


async def factorial(name, number):
    '''
    计算阶乘
    '''
    f = 1
    for i in range(2, number + 1):
        print(f"Task {name}: Compute factorial({i})...")
        await asyncio.sleep(1)
        f *= i
    print(f"Task {name}: {number}的阶乘 = {f}")
    return '{}! = {}'.format(number, f)


async def main():
    # Schedule three calls *concurrently*:
    # asyncio.gather 将一些 Future 和 coroutine 封装成一个 Future。
    futures = asyncio.gather(
        factorial("A", 2),
        factorial("B", 3),
        factorial("C", 4),
    )
    a = await asyncio.ensure_future(futures)
    for _result in a:
        print(_result)
asyncio.run(main())
