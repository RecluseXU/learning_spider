#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   1_finally_and_return.py
@Time    :   2021-01-04
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   finally与return 的优先级
无论是否发生异常，`finally`子句始终在离开`try`语句之前执行
* 如果`try`子句中发生了异常且未由`except`子句处理（或在`except`或`else`子句中发生），
  则在执行`finally`子句后重新引发该异常
* 当`try`语句的任何其他子句通过`break`，`continue`或`return`语句离开时
  `finally`子句也将“在离开的`try`时候”执行

如果一个函数没有 `return`，会隐式的返回 `None`
函数的返回只有一个，如果显式声明了 `return`，那么会覆盖旧的 `return`
参考：https://stackoverflow.com/questions/19805654/python-try-finally-block-returns
'''


def a():
    try:
        return 'A'
    finally:
        print('B')


def b():
    try:
        return 'A'
    finally:
        print('B')
        try:
            return 'C'
        finally:
            print('D')


print(a())
print('---------------------------')
print(b())
