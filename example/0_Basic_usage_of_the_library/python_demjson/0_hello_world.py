# -*- encoding: utf-8 -*-
'''
@Time    :   2023-01-03
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   
'''

# here put the import lib
import demjson3

# From Python to JSON
demjson3.encode(['one', 42, True, None])
# '["one",42,true,null]'

# From JSON to Python
demjson3.decode('["one",42,true,null]')
# ['one', 42, True, None]


# 来自js的对象数据
a = """
{
    a: "1",
    b: "2",
}
"""
print(demjson3.decode(a))
