# -*- encoding: utf-8 -*-
'''
@Time    :   2021-05-17
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   multiprocessing 创建子进程
'''

# here put the import lib
import multiprocessing as ms


def test():
    pass


p1 = ms.Process(target=test)  # 创建子进程
p1.start()  # 子进程 开始执行
p1.join()  # 等待子进程结束

# 特点：
# 1.注意：Process对象可以创建进程，但Process对象不是进程，其删除与否与系统资源是否被回收没有直接的关系。
# 2.主进程执行完毕后会默认等待子进程结束后回收资源，不需要手动回收资源；join()函数用来控制子进程
#   结束的顺序,其内部也有一个清除僵尸进程的函数，可以回收资源；
# 3.Process进程创建时，子进程会将主进程的Process对象完全复制一份，这样在主进程和子进程各有一个Process
#   对象，但是p1.start()启动的是子进程，主进程中的Process对象作为一个静态对象存在，不执行。
# 4.当子进程执行完毕后，会产生一个僵尸进程，其会被join函数回收，或者再有一条进程开启，start函数也会回收
#   僵尸进程，所以不一定需要写join函数。
# 5.windows系统在子进程结束后会立即自动清除子进程的Process对象，而linux系统子进程的Process对象

# 如果没有join函数和start函数的话会在主进程结束后统一清除
