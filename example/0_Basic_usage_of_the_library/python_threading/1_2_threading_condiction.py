#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@Time    :   2021-4-6
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   

条件变量总是与某种类型的锁对象相关联，锁对象可以通过传入获得，或者在缺省的情况下自动创建。
当多个条件变量需要共享同一个锁时，传入一个锁很有用。锁是条件对象的一部分，你不必单独地跟踪它。

class threading.Condition(lock=None)
    实现条件变量对象的类。一个条件变量对象允许一个或多个线程在被其它线程所通知之前进行等待。
    如果给出了非 None 的 lock 参数，则它必须为 Lock 或者 RLock 对象，并且它将被用作底层锁。
    否则，将会创建新的 RLock 对象，并将其用作底层锁。

    acquire(*args)
        请求底层锁。此方法调用底层锁的相应方法，返回值是底层锁相应方法的返回值。

    release()
        释放底层锁。此方法调用底层锁的相应方法。没有返回值。

    wait(timeout=None)
        等待直到被通知或发生超时。如果线程在调用此方法时没有获得锁，将会引发异常。
        这个方法释放底层锁，然后阻塞，直到在另外一个线程中调用同一个条件变量的 notify() 或 notify_all() 唤醒它，或者直到可选的超时发生。一旦被唤醒或者超时，它重新获得锁并返回。
        当提供了 timeout 参数且不是 None 时，它应该是一个浮点数，代表操作的超时时间，以秒为单位（可以为小数）。

    wait_for(predicate, timeout=None)
        等待，直到条件计算为真。 predicate 应该是一个可调用对象而且它的返回值为一个布尔值

    notify(n=1)
        唤醒n个正在等待这个条件的线程。如果线程在调用这个方法时没有获得锁，会引发异常。

    notify_all()
        唤醒所有正在等待这个条件的线程。 如果线程在调用这个方法时没有获得锁，会引发异常。


生产者与消费者模型 例子
'''

# here put the import lib
import threading
import time


def produce(condiction, good_produce):
    for i in range(4):
        with condiction:
            print(threading.get_ident(), '生产')
            good_produce()
            condiction.notify(2)
        time.sleep(1)
    
                
def consume(condiction, good_is_valid, good_consume):
    with condiction:
        print(threading.get_ident(), '正在等待消费')
        condiction.wait_for(good_is_valid)
    good_consume()
    print(threading.get_ident(), '消费')
        

class Good:
    good = 0
    
    def have_good(self):
        return self.good > 0
    
    def produce_good(self):
        self.good += 2
    
    def consume_good(self):
        self.good -= 1


if __name__ == '__main__':
    good = Good()
    condiction = threading.Condition()

    consumes = []
    consumes = [
        threading.Thread(target=consume, args=[condiction, good.have_good, good.consume_good]) 
        for i in range(8)
    ]
    for consume in consumes:
        consume.start()
    produce = threading.Thread(target=produce, args=[condiction, good.produce_good])
    produce.start()
    
    
    
