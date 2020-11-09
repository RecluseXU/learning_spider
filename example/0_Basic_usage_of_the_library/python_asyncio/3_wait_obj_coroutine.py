#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   3_wait_obj_coroutines.py
@Time    :   2020-11-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   Python 协程属于 可等待 对象，因此可以在其他协程中被等待
'''

# here put the import lib
import asyncio

async def nested():
    return 42

async def main():
    # 如果只是声明 nested() 那么什么事情都不会发生
    # A coroutine object is created but not awaited,
    # 如果一个协程创建出来，但是没有awaited
    # so it *won't run at all*.
    # 那么它根本就不会被执行
    nested()

    # Let's do it differently now and await it:
    print(await nested())  # 将会输出42

asyncio.run(main())
