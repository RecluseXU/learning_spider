# -*- encoding: utf-8 -*-
'''
@Time    :   2022-12-03
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   
ncalls: 调用次数
tottime: 在指定函数中消耗的总时间（不包括调用子函数的时间）
percall: tottime/ncalls
cumtime: 指定的函数及其所有子函数（从调用到退出）消耗的累积时间。这个数字对于递归函数来说是准确的。
percall: cumtime 除以原始调用（次数）的商（即：函数运行一次的平均时间）
filename:lineno(function) 提供相应数据的每个函数

如果第一列中有两个数字（例如3/1）,则表示函数递归。
第二个值是原始调用次数，第一个是调用的总次数。
当函数不递归时，这两个值是相同的，并且只打印单个数字。
'''

# here put the import lib
import cProfile
import re


cProfile.run('re.compile("foo|bar")')
