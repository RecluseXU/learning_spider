#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@Time    :   2021-4-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   
    threading模块的各种函数
'''

# here put the import lib
import threading
import time


def helloworld():
    for i in range(5):
        print('Sleep x {}'.format(i))
        time.sleep(1)


thread_ = threading.Thread(target=helloworld)
thread_.start()
print('当前存活的 Thread 对象的数量:', threading.active_count())
print('当前对应调用者的控制线程的 Thread 对象:', threading.current_thread())
print('当前线程的 “线程标识符”:', threading.get_ident())
print('内核分配给当前线程的原生集成线程 ID', threading.get_native_id())
print('主 Thread 对象(一般情况下，主线程是Python解释器开始时创建的线程):', threading.main_thread())


thread_.join()


