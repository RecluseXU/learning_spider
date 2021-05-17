# -*- encoding: utf-8 -*-
'''
@Time    :   2021-05-17
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   进程PID可以用于标识进程，但需要注意，如果进程过多，可能出现重复的情况
    下面的代码用了这个原理，使得python程序在系统中只能运行一个
'''

# here put the import lib
from os import getpid, unlink
from os.path import exists
from psutil import pid_exists


class SingleProcess:
    """ 基于PID文件记录实现系统级进程单例
    """
    def __init__(self, lock_file_path: str) -> None:
        self.lock_file_path = lock_file_path

    def is_already_run(self) -> bool:
        """ 判断是否已经有其它进程运行此程序
        pid用文件记录，如果没有这个文件，那么判定未运行
        """
        if not exists(self.lock_file_path):
            return False
        else:
            with open(self.lock_file_path, 'r', encoding='utf-8')as f:
                pid = int(f.read())
            return pid_exists(pid)

    def __enter__(self):
        """ PID写入文件，作为记录
        """
        if self.is_already_run():
            print('已有在运行进行')
            exit(1)
        with open(self.lock_file_path, 'w', encoding='utf-8')as f:
            f.write(str(getpid()))

    def __exit__(self, exc_type, exc_value, traceback):
        """ 正常运行后删除记录文件，表明无进程运行中
        """
        unlink(self.lock_file_path)


if __name__ == '__main__':
    with SingleProcess('lock.txt') as lock:
        print('!!!')
    print('!!!')
