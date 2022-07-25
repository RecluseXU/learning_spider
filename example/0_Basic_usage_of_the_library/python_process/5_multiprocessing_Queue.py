# -*- encoding: utf-8 -*-
'''
@Time    :   2022-06-20
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   multiprocessing queue通信

管道和队列
传递数据没有共享内存快，且每次传递的数据大小受限
但是使用队列可以在多个进程间传递，可以在不同主机上的进程间共享，以实现分布式
匿名管道则只能在父子进程间共享，命名管道可在同一台计算机的不同进程之间或在跨越一个网络的不同计算机的进程间共享

Queue与Pipe的区别
1. Queue使用 putget维护队列, pipe使用 send recv维护队列
2. pipe只提供两个端点, 而Queue没有限制  
   这意味着在使用Pipe时,只能同时启动两个进程
   一个生产者和一个消费者在这两个端点上操作(由pipe()返回的两个值)，这两个端点一起维护一个队列
   如果多个进程同时在管道的同一个端点上操作，就会出现错误(因为没有锁，类似于线程不安全)
   因此,两个端点相当于只为流程提供两个安全操作位置,从而将流程数量限制为只有2个
3. Queue的封装比较好
   Queue只提供一个结果,可以被多个进程同时调用
   Pipe()返回两个结果, 分别由两个进程调用
4. Queue的实现基于pipe
   所以pipe的运行速度比Queue快很多

当只需要两个进程时，管道更快，当需要多个进程同时操作队列时，使用队列

'''

# here put the import lib
import multiprocessing
from time import sleep


def producer(queue: multiprocessing.Queue):
    """生产者"""
    process_id = multiprocessing.current_process().pid
    for i in range(50):
        print(f'{process_id}生产者：生产{i}')
        sleep(0.1)
        queue.put(i)


def consumer(queue: multiprocessing.Queue):
    """消费者"""
    process_id = multiprocessing.current_process().pid
    while not queue.empty():
        product = queue.get()
        sleep(0.1)
        print(f'{process_id}消费者: 消费{product}')


if __name__ == '__main__':
    # 创建进程通信的Queue
    queue = multiprocessing.Queue(10)
    # 创建子进程
    process_producer = multiprocessing.Process(target=producer, args=(queue,))
    process_consumer = multiprocessing.Process(target=consumer, args=(queue,))
    # 启动子进程
    process_producer.start()
    while not queue.full():
        sleep(0.5)
    process_consumer.start()
    # 该子进程必须先执行完毕
    process_producer.join()
    process_consumer.join()
    print('完毕')
