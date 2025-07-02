# -*- encoding: utf-8 -*-
'''
@Time    :   2023-07-05
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   True是一种特殊的int, 在判断变量是否是int类型时会出现问题
'''

# here put the import lib

var = True
if isinstance(var, int):
    print(f"{var} 是 int 类型")
else:
    print(f"{var} 不是 int 类型")
