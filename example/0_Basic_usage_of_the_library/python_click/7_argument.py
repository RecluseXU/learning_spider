# -*- encoding: utf-8 -*-
'''
@Time    :   2021-09-03
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   Argument 参数

hide_input 用于隐藏输入
confirmation_promt 用于重复输入
'''

# here put the import lib
import click


@click.group()
def cli():
    pass


@cli.command()
@click.argument('name')
def hi(name: str):
    """说你好
    python 7_argument.py hi JOJO
    """
    click.echo(f'Hello {name}')


if __name__ == '__main__':
    cli()
