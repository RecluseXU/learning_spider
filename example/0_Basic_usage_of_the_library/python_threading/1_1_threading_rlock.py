#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@Time    :   2021-4-6
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   

重入锁是一个可以被同一个线程多次获取的同步基元组件
在内部，它在基元锁的锁定/非锁定状态上附加了 "所属线程" 和 "递归等级" 的概念
在锁定状态下，某些线程拥有锁 ； 在非锁定状态下， 没有线程拥有它

常见场景是线程想要处理递归执行的需要请求锁的函数
'''

# here put the import lib
import threading
import time


class MyThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self.i = 5
    def run(self):
        # 由于递归，这里其实会反复请求锁
        #   如果这里是个普通的互斥锁，在第二次请求的时候就会一直等待，无法继续进行
        rlock.acquire()  
        print(self.native_id, self.i)
        self.i -= 1
        time.sleep(1)
        if self.i > 0:
            self.run()
        rlock.release()


if __name__ == '__main__':
    rlock = threading.RLock()
    thread = MyThread()
    thread.start()
    thread.join()