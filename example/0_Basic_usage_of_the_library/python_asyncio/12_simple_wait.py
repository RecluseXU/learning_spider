#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   12_simple_wait.py
@Time    :   2020-11-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   
'''

# here put the import lib
import asyncio


async def foo():
    return 42

async def main():
    task = asyncio.create_task(foo())
    done, pending = await asyncio.wait({task})
    print(done, pending)

asyncio.run(main())
