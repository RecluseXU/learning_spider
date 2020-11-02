#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   02_greenlet.py
@Time    :   2020/11/02 11:44:17
@Author  :   EvilRecluse
@Contact :   evilrecluse@sxkid.com
@Desc    :   greenlet是一个用C实现的协程模块，通过设置.switch()可以实现任意函数之间的切换 
                但这种切换属于手动切换，当遇到IO操作时，程序会阻塞，而不能自动进行切换
'''

# here put the import lib
from greenlet import greenlet
import time


def test1():
    print(" running test1")
    gr2.switch() # 切换到test2
    print(" running test1 again ")
    time.sleep(2)
    gr2.switch()
 
def test2():
    print("\033[31;1m running test2 \033[0m")
    gr1.switch()
    print("\033[32;1m running test2 again\033[0m")
 
gr1 = greenlet(test1) # 实例化一个协程
gr2 = greenlet(test2) # 实例化另一个协程

gr1.switch() # 执行gr1，切换到grl1执行test1
