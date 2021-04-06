#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@Time    :   2021-4-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   线程相关

threading 这个模块在较低级的模块 _thread 基础上建立较高级的线程接口。
threading 模块中最核心的内容是 threading.Thread 这个线程类
创建 threading.Thread 对象,然后让它们运行，每个 Thread 对象代表一个线程，
在每个线程中我们可以让程序处理不同的任务，这就是多线程编程。值得注意的是，程序运行时默认就是在主线程上

'''

# here put the import lib
import threading
import time


def helloworld():
    for i in range(5):
        print('HelloWorld x {}'.format(i))
        time.sleep(1)

# Thread 的构造方法中，最重要的参数是 target，所以我们需要将一个 callable 对象赋值给它，线程才能正常运行。
thread_ = threading.Thread(target=helloworld)
print(type(thread_))
# 如果要让一个 Thread 对象启动，调用它的 start() 方法就好了。
thread_.start()
# join() 方法会使得程序进入等待。一直卡在这句话里，直到线程运行完毕
thread_.join()


