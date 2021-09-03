# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-07
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   提示 prompt
'''

# here put the import lib
import click


@click.group()
def cli():
    pass


@cli.command()
@click.option('--count', prompt=True)
def hello(count):
    """通过命令行要求输入没有提供的参数
    python 5_option_tips.py hello
    """
    click.echo(f'Hello! {count}')


@cli.command()
@click.option('--count', prompt="You hava not input --count:")
def hello2(count):
    """通过命令行要求输入没有提供的参数
    python 5_option_tips.py hello2
    """
    click.echo(f'Hello! {count}')


def abort_if_false(ctx, param, value):
    if not value:
        ctx.abort()


@cli.command()
@click.option('--yes', is_flag=True, callback=abort_if_false,
              expose_value=False,
              prompt='Are you sure you want to do that?')
def hello3():
    """ 询问是否真的要怎么做
    """
    click.echo('You Do That')


if __name__ == '__main__':
    cli()
