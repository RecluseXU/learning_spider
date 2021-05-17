# -*- encoding: utf-8 -*-
'''
@Time    :   2021-05-17
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   fork创建进程
'''

# here put the import lib
import os


pid = os.fork()  # 创建一个子进程, pid为0的代表子进程
os.wait()  # 等待子进程结束释放资源

# 缺点：
# 1.兼容性差，只能在类linux系统下使用，windows系统不可使用；
# 2.扩展性差，当需要多条进程的时候，进程管理变得很复杂；
# 3.会产生“孤儿”进程和“僵尸”进程，需要手动回收资源。

# 优点：
# 是系统自带的接近低层的创建方式，运行效率高
