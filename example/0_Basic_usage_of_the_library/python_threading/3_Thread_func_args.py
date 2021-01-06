#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   1_Thread.py
@Time    :   2020-11-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   线程 传参运行传入函数
'''

# here put the import lib
import threading
import time

class MyThread(threading.Thread):
    def __init__(self, func, **func_args):
        threading.Thread.__init__(self)
        self.func = func
        self.args = func_args
    def run(self):
        self.result = self.func(self.args)

def helloworld(args):
    for i in range(5):
        print('{} x {}'.format(args['word'], i))
        time.sleep(1)



if __name__ == '__main__':
    t = MyThread(helloworld, word='My Word')
    t.run()
