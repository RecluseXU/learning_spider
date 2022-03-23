#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@Time    :   2020-12-29
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   多线程队列+结果返回
'''

# here put the import lib
import threading
import time
import queue


class MyThread(threading.Thread):
    def __init__(self, func, **func_args):
        threading.Thread.__init__(self)
        self.func = func
        self.func_args = func_args

    def run(self):
        self._result = self.func(self.func_args)

    def result(self):
        return self._result


def helloworld(args):
    while not q.empty():
        print('{} x {}'.format(args['word'], q.get()))
        time.sleep(1)
    return 'OHHHHHHHHHHHHHH'


if __name__ == '__main__':
    # 将任务内容放入
    q = queue.Queue()
    for task in range(51):
        q.put(task)

    # 创建三个线程，处理
    threads = []
    for i in ['My', 'Your', 'Her']:
        thread = MyThread(helloworld, word=i)
        thread.start()
        threads.append(thread)
    # 阻塞
    for thread in threads:
        thread.join()
    # 输出结果
    for thread in threads:
        print(thread.result())
