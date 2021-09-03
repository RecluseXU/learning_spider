# -*- encoding: utf-8 -*-
'''
@Time    :   2021-09-03
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   Argument 参数 - 多个输入值

'''

# here put the import lib
import click


@click.group()
def cli():
    pass


@cli.command()
@click.argument('names', nargs=-1)
@click.argument('dst', nargs=1)
def hi(names, dst):
    """多个参数值
    其中，nargs=-1 表明参数 src 接收不定量的参数值，参数值会以 tuple 的形式传入函数
    如果 nargs 大于等于 1，表示接收 nargs 个参数值
    python 8_argument_variadic.py hi JOJO 卡Q因 DIO
    """
    for name in names:
        click.echo(f"{name}: Hello {dst}")


if __name__ == '__main__':
    cli()
