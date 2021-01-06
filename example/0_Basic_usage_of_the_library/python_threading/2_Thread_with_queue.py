#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   2_thread_with_queue.py
@Time    :   2020-12-28
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   多线程+队列
'''

# here put the import lib
import threading
import time
import queue


def worker():
    while not q.empty():
        item = q.get()  # 或得任务
        print('处理队列项目 : ', item)
        time.sleep(1)


if __name__ == '__main__':
    # 将任务内容放入
    q = queue.Queue()
    for task in range(100):
        q.put(task)

    # 创建三个线程，处理
    threadNum = 3
    threads = []
    for i in range(threadNum):
        thread = threading.Thread(target=worker)
        thread.start()
        threads.append(thread)
    for thread in threads:
        thread.join()
    