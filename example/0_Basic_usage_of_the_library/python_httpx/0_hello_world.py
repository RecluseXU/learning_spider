# -*- encoding: utf-8 -*-
'''
@Time    :   2021-02-23
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   安装是否成功？
'''

# here put the import lib
import httpx


r = httpx.get('https://httpbin.org/get')
print(r)
