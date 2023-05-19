# -*- encoding: utf-8 -*-
'''
@Time    :   2023-05-19
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   计算大文件行数

4核8G python3.6 测算速度 单位: 秒
计算方法             100M    500M     1G    10G
readline            0.13    0.85    1.58   13.53
buffer_count        0.13    0.62    1.18   10.21
buffer_count_iter   0.08    0.42    0.83   8.33
'''

# here put the import lib


def count_by_readline(filename):
    """依次读取每行"""
    lines = 0
    with open(filename, 'r') as f:
        for _ in f:
            lines += 1
    return lines


def count_by_wc(filename):
    """通过Linux Shell wc 统计"""
    import subprocess
    output = subprocess.getoutput('wc -l {}'.format(filename))
    return int(output[:output.find(' ')])


def count_by_buffer_count(filename):
    """读取固定量级数据, 从数据中统计换行量级"""
    lines = 0
    buffer_size = 1024 * 1024
    with open(filename, 'rb') as f:
        buffer = f.read(buffer_size)
        while buffer:
            lines += buffer.count(b'\n')
            buffer = f.read(buffer_size)
    return lines


def count_by_buffer_count_iter(filename):
    """在 buffer_count 基础上引入 itertools 模块"""
    from itertools import takewhile, repeat
    buffer_size = 1024 * 1024
    with open(filename, 'rb') as f:
        buffers = takewhile(lambda x: x, (f.read(buffer_size) for _ in repeat(None)))
        return sum(buffer.count(b'\n') for buffer in buffers)
