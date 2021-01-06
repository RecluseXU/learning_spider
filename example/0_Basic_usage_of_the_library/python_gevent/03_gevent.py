#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   03_gevent.py
@Time    :   2020/11/02 11:53:23
@Author  :   EvilRecluse
@Contact :   evilrecluse@sxkid.com
@Desc    :   Gevent 是一个第三方库，可以轻松通过gevent实现并发同步或异步编程
    在gevent中用到的主要模式是Greenlet, 它是以C扩展模块形式接入Python的轻量级协程。 
    Greenlet全部运行在主程序操作系统进程的内部，但它们被协作式地调度。
    Gevnet遇到IO操作时，会进行自动切话，属于主动式切换。
'''

# here put the import lib
import gevent, time


def func1():
    print(' 主人来电话啦...')
    gevent.sleep(3)
    print(' 主人那家伙又来电话啦...')
 
def func2():
    print('\033[32;1m 打个电话...\033[0m')
    gevent.sleep(2)
    print('\033[32;1m 咦，电话给挂了，接着打...\033[0m')
 
def func3():
    print("\033[31;1m 哈哈哈哈 \033[0m")
    gevent.sleep(0)
    print("\033[31;1m 嘿嘿嘿。。。。\033[0m")
 
start_time = time.time()
gevent.joinall([
    gevent.spawn(func2), # 生成一个协程
    gevent.spawn(func1),
    gevent.spawn(func3),
])
print("\033[32;1m running time:", (time.time() - start_time))