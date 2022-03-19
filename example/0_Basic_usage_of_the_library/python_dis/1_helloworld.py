# -*- encoding: utf-8 -*-
'''
@Time    :   2022-03-18
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   对比性能
'''

# here put the import lib
import dis

# dis.dis 用于打印可阅读的字节码
# 机器用的是二进制数据, 这个打印的内容当然不是字节码本身
dis.dis('a is None')
print('**************************')
dis.dis('a == None')


"""
信息阅读
  第一列：对应的源代码行数
  第二列：对应的内存字节码的索引位置
    在第一列和第二列之间的 >> 号表示跳转的目标
  第三列: Python字节码指令
    指令的大致信息可以通过dis的文档查看到
    https://docs.python.org/zh-cn/3/library/dis.html?highlight=dis#python-bytecode-instructions
  第四列：指令参数
  第五列：实际参数
"""
