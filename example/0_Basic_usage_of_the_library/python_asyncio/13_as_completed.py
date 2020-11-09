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


async def foo():
    return randint(1,100)

async def main():
    the_futures = []
    the_futures.append(asyncio.ensure_future(foo()))
    the_futures.append(asyncio.ensure_future(foo()))
    the_futures.append(asyncio.ensure_future(foo()))
    the_futures.append(asyncio.ensure_future(foo()))
    
    for coro in asyncio.as_completed(the_futures):
        earliest_result = await coro
        print(earliest_result)
asyncio.run(main())
