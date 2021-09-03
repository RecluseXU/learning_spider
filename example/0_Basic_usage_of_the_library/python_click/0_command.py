# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-07
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   click命令行使用
    通过装饰器 click.command() 让函数变成一个 Click 命令
    通过命令行可以查看结果 python 0_helloworld.py --help
'''

# here put the import lib
import click


@click.command()
def hello():
    # 为什么这个使用 echo() 而不是常规的 print() 函数？
    #   用 echo() 是为了让 Click 同时支持 Python2 和 Python3 不出问题
    click.echo('Hello World!')


if __name__ == '__main__':
    hello()
