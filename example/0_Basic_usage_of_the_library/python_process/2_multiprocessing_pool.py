# -*- encoding: utf-8 -*-
'''
@Time    :   2021-05-17
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   multiprocessing进程池
'''

# here put the import lib
import multiprocessing as ms


def test():
    pass


pool_ = ms.Pool(5)  # 创建5条进程
for i in range(10):
    pool_.apply_async(test)  # 向进程池添加任务
pool_.close()  # 关闭进程池，不再接受请求
pool_.join()  # 等待所有的子进程结束

# 1.如上，进程池Pool被创建出来后，即使实际需要创建的进程数远远大于进程池的最大上限，pool_.apply_async(test)代码
#   依旧会不停的执行，并不会停下等待；相当于向进程池提交了10个请求，会被放到一个队列中；
# 2.但是有一点很重要，当执行完p1 = Pool(5)这条代码后，5条进程已经被创建出来了，只是还没有为他们各自
#   分配任务，也就是说，无论有多少任务，实际的进程数只有5条，计算机每次最多5条进程并行。
# 3.当Pool中有进程任务执行完毕后，这条进程资源会被释放，pool会按先进先出的原则取出一个新的请求给空闲的
#   进程继续执行；
# 4.当Pool所有的进程任务完成后，会产生5个僵尸进程，如果主线程不结束，系统不会自动回收资源，需要调用join函数去回收。
# 5.创建Pool池时，如果不指定进程最大数量，默认创建的进程数为系统的内核数量.

# 另外还有一种阻塞式添加任务的方法，p1.apply(test)，其每次只能向进程池添加一条任务，然后for循环会被堵塞等待，
# 直到添加的任务被执行完毕，进程池中的5个进程交替执行新来的任务，相当于单进程了。
