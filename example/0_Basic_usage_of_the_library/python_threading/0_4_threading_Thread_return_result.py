#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@Time    :   2020-11-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   线程 返回计算结果
'''

# here put the import lib
import threading
import time


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
    for i in range(5):
        print('{} x {}'.format(args['word'], i))
        time.sleep(1)
    return 'OHHHHHHHHHHHHHH'


if __name__ == '__main__':
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
