#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@Time    :   2021-4-6
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   

最古老的同步原语

一个信号量管理一个内部计数器
该计数器因 acquire() 方法的调用而递减，因 release() 方法的调用而递增
当 acquire() 方法发现计数器为零时，将会阻塞，直到其它线程调用 release() 方法


class threading.Semaphore(value=1)
    该类实现信号量对象。信号量对象管理一个原子性的计数器，代表 release() 方法的调用次数减去 acquire() 的调用次数再加上一个初始值。如果需要， acquire() 方法将会阻塞直到可以返回而不会使得计数器变成负数。在没有显式给出 value 的值时，默认为1。

    acquire(blocking=True, timeout=None)
        获取一个信号量。
        如果在进入时内部计数器的值大于零，则将其减一并立即返回 True.
        如果在进入时内部计数器的值为零，则将会阻塞直到被对 release() 的调用唤醒。 一旦被唤醒（并且计数器的值大于 0），则将计数器减 1 并返回 True。 每次对 release() 的调用将只唤醒一个线程。 线程被唤醒的次序是不可确定的。
        当发起调用时将 blocking 设为假值，则不进行阻塞。 如果一个无参数调用将要阻塞，则立即返回 False；在其他情况下，执行与无参数调用时一样的操作，然后返回 True。
        当发起调用时如果 timeout 不为 None，则它将阻塞最多 timeout 秒。 请求在此时段时未能成功完成获取则将返回 False。 在其他情况下返回 True。

    release(n=1)
        释放一个信号量，将内部计数器的值增加 n。 
        当进入时值为零且有其他线程正在等待它再次变为大于零时，则唤醒那 n 个线程
'''

# here put the import lib
import threading
import time


def eat():
    food.acquire()
    print(threading.get_ident(), '吃')

def cook():
    for i in range(6):
        food.release()
        print(threading.get_ident(), '煮')

if __name__ == '__main__':
    food = threading.Semaphore()
    threads = [
        threading.Thread(target=eat),
        threading.Thread(target=eat),
        threading.Thread(target=eat),
        threading.Thread(target=eat),
        threading.Thread(target=eat),
        threading.Thread(target=eat),
        threading.Thread(target=cook),
    ]
    for t in threads:
        t.start()