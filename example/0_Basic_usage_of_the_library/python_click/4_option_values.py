# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-07
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   选项 传入多个值
'''

# here put the import lib
import click


@click.group()
def cli():
    pass


@cli.command()
@click.option('--count', nargs=2, type=int)
def hello(count):
    """一次性接收多个参数
    python 4_option_values.py hello --count 2 3
    """
    click.echo(f'Hello! {count}')


@cli.command()
@click.option('--count', type=(str, int))
def hello2(count):
    """一次性接收多个不同类型的参数
    python 4_option_values.py hello2 --count JOJO 3
    """
    for _ in range(count[1]):
        click.echo(f'Hello! {count[0]}')


@cli.command()
@click.option('--count', multiple=True)
def hello3(count):
    """合并多次获取传入的参数
    python 4_option_values.py hello3 --count JOJO --count DIO
    """
    click.echo(f'Hello! {count}')


if __name__ == '__main__':
    cli()
