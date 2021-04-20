# -*- encoding: utf-8 -*-
'''
@Time    :   2021-04-07
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   自己定义一个能使用with的类
'''

# here put the import lib
class Sample:
    def __enter__(self):
        print('进入 __enter__')
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("进入 __exit__")

with Sample() as sample:
    print ("实例: ", sample)