# -*- encoding: utf-8 -*-
'''
@Time    :   2021-02-23
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   超时
'''

# here put the import lib
import httpx


# 实际上，如果不进行特别的设置，这个超时的时间时5秒
httpx.get('https://github.com/', timeout=0.001)

# 可以将timeout设置为None来禁用超时, 虽然这可能导致永远挂起
httpx.get('https://github.com/', timeout=None)
