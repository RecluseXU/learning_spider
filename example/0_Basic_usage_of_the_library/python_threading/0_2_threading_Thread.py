#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@Time    :   2020-11-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   
    1. 编写一个自定义类继承 Thread
    2. 复写 run() 方法, 在 run() 方法中编写任务处理代码
    3. 创建这个 Thread 的子类的实例使用
'''

# here put the import lib
import threading
import time


def helloworld():
    for i in range(5):
        print('HelloWorld x {}'.format(i))
        time.sleep(1)



if __name__ == '__main__':
    t = threading.Thread(target=helloworld)
    # 开始线程活动的方法。
    #   它在一个线程里最多只能被调用一次。（多于一次则报错）
    #   它安排对象的 run() 方法在一个独立的控制进程中调用。
    t.start()
    # 代表线程活动的方法。
    #   你可以在子类型里重载这个方法。 
    #   标准的 run() 方法会对作为 target 参数传递给该对象构造器的可调用对象（如果存在）发起调用，并附带从 args 和 kwargs 参数分别获取的位置和关键字参数。
    # t.run()
    print('线程活动方法(执行的内容):', )
    print('线程名(可以在构造函数设置):', t.name)
    print('线程标识符:', t.ident)
    print('线程的原生集成线程 ID', t.native_id)
    print('线程是否存活:', t.is_alive())
    print('是否为守护线程(在调用 start() 之前要设置好):', t.daemon)



    # 等待，直到线程终结。
    #   这会阻塞调用这个方法的线程，直到被调用 join() 的线程终结
    t.join()
