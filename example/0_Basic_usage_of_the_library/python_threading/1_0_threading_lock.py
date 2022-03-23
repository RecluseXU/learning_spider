#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@Time    :   2021-4-6
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   原始锁
原始锁是一个在锁定时不属于特定线程的同步基元组件。
在Python中, 它是能用的最低级的同步基元组件, 由 _thread 扩展模块直接实现。

原始锁处于 "锁定" 或者 "非锁定" 两种状态之一。它被创建时为非锁定状态。
它有两个基本方法， acquire()请求锁 和 release()释放锁，方法执行都是原子性的

class threading.Lock
    实现原始锁对象的类。一旦一个线程获得一个锁，会阻塞随后尝试获得锁的线程，直到它被释放
    任何线程都可以释放它。

    acquire(blocking=True, timeout=-1) -> bool
        可以阻塞或非阻塞地获得锁。
        当调用时参数 blocking 设置为 True(缺省值)，阻塞直到锁被释放，然后将锁锁定并返回 True 。
        在参数 blocking 被设置为 False 的情况下调用，将不会发生阻塞。

        当浮点型 timeout 参数被设置为正值调用时，只要无法获得锁，将最多阻塞 timeout 设定的秒数。
        timeout 参数被设置为 -1 时将无限等待。当 blocking 为 false 时, timeout 指定的值将被忽略。

        如果成功获得锁，则返回 True, 否则返回 False (例如发生 超时 的时候)。
    release() -> None
        释放一个锁。这个方法可以在任何线程中调用，不单指获得锁的线程。
        在未锁定的锁调用时，会引发 RuntimeError 异常。

    locked() -> bool
        如果获得了锁则返回True。

'''

# here put the import lib
import threading
import time


def just_run(word: str):
    print(word)
    lock.acquire()
    for i in range(5, 0, -1):
        print(word, i)
        time.sleep(1)
    lock.release()


if __name__ == '__main__':
    lock = threading.Lock()
    # 创建三个线程，处理
    threads = []
    for i in ['My', 'Your', 'Her']:
        thread = threading.Thread(target=just_run, args=[i])
        thread.start()
        threads.append(thread)
    # 阻塞
    for thread in threads:
        thread.join()
