#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   5_future.py
@Time    :   2020-11-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   Future 是一种特殊的 低层级 可等待对象，表示一个异步操作的 最终结果。
    当一个 Future 对象 被等待，这意味着协程将保持等待直到该 Future 对象在其他地方操作完毕。
    在 asyncio 中需要 Future 对象以便允许通过 async/await 使用基于回调的代码。

    通常情况下 没有必要 在应用层级的代码中创建 Future 对象。
    Future 对象有时会由库和某些 asyncio API 暴露给用户，用作可等待对象

    task是可以理解为单个coroutine，经过ensure_future方法处理而形成
    而众多task所组成的集合经过asyncio.gather处理而形成一个future。

    再不精确的粗略的说，future就是存放着众多task或future的容器。
    而task又是future的子类，所以不管是task还是future还是coreture都可以看成是一个广义的携程
    future无非是一个内部包含众多携程的大携程而已，await后面，task,coroture,future都可以接。
'''

# here put the import lib
import asyncio


async def hello(name):
    await asyncio.sleep(2)
    print('Hello, ', name)

coroutine = hello("World")
_task = asyncio.ensure_future(coroutine)
print(_task.__class__)  # Task

_future = asyncio.Future()  # 标准future
print(_future.__class__)  # Future

print(issubclass(_task.__class__, _future.__class__))  # true, Task类是Future类的子类

# 首先a是一个Task,又因为Task类是Futrue类的子类，所以，我们也可以说，a是一个Future
# 下面验证If the argument is a Future, it is returned directly.
c = asyncio.ensure_future(_future)
print(c is _future)
d = asyncio.ensure_future(_task)
print(d is _task)
