# -*- encoding: utf-8 -*-
'''
@Time    :   2021-04-07
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   自己定义一个能使用with的类
'''


class Sample:
    def __init__(self):
        print('__init__')

    def __enter__(self):
        print('__enter__')
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("__exit__")


with Sample() as sample:
    print("example", sample)
