#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@Time    :   2020-11-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   线程 传参运行传入函数
'''

# here put the import lib
import threading


def helloworld(arg1, arg2, arg3):
    print(arg1, arg2, arg3)


if __name__ == '__main__':
    t = threading.Thread(target=helloworld, args=['Hello', 'World', '!!!'])
    t.run()
