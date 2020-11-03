#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   04_gevent_compare.py
@Time    :   2020/11/02 14:11:03
@Author  :   EvilRecluse
@Contact :   evilrecluse@sxkid.com
@Desc    :   对比执行过程
'''

# here put the import lib
import gevent


def task(pid):
    gevent.sleep(1)
    print('task %s done'%pid)

def synchronous():  # 同步一个线程执行函数
    for i in range(1,10):
        task(i)

def asynchronous(): # 异步一个线程执行函数
    threads = [gevent.spawn(task,i) for i in range(10)]
    gevent.joinall(threads)

print('synchronous:')
synchronous()   # 同步执行时要等待执行完后再执行
print('asynchronous:')
asynchronous()  # 异步时遇到等待则会切换执行