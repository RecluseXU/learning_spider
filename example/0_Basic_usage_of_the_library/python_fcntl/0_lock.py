# -*- encoding: utf-8 -*-
'''
@Time    :   2022-06-01
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   进程级文件锁

LOCK_SH: 表示要创建一个共享锁，在任意时间内，一个文件的共享锁可以被多个进程拥有
LOCK_EX: 表示创建一个排他锁，在任意时间内，一个文件的排他锁只能被一个进程拥有
         LOCK_EX是“劝告锁”,系统内核不会强制检查锁的状态，需要在代码中进行文件操作的地方显式检查才能生效
LOCK_UN: 表示删除该进程创建的锁(解锁)
LOCK_MAND: 它主要是用于共享模式强制锁，它可以与 LOCK_READ 或者 LOCK_WRITE 联合起来使用，
           从而 表示是否允许并发的读操作或者并发的写操作
           （尽管在 flock() 的手册页中没有介绍 LOCK_MAND,但是阅读内核源代码就会发现,这在内核中已经实现了）
LOCK_NB: 如果指定此参数，函数不能获得文件锁就立即返回，否则，函数会等待获得文件锁
         LOCK_NB可以同LOCK_SH或LOCK_EX进行按位或（|）运算操作

在给文件加锁之前,一定要保证文件以相应的访问模式打开
要对一个文件加上共享锁,一定要首先按读模式打开文件
若要给文件加上排他锁,则首先要按写模式打开对应文件
若想加两种锁，则需要按读写模式打开
'''

# here put the import lib
import fcntl
import os


file_path = os.path.join(os.path.dirname(__file__), "test.json")
with open(file_path, 'w') as f:
    fcntl.flock(f.fileno(), fcntl.LOCK_EX)  # 加锁
    # 加锁后，其它进程再次请求该锁就会阻塞
    f.write("独占此文件")

# 解锁,可以像这样显式调用
# f.close() 操作会使文件锁失效
# 进程结束后文件锁失效
fcntl.flock(f.fileno(), fcntl.LOCK_UN)
