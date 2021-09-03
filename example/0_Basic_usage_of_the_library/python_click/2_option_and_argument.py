# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-07
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   命令选项与参数
    python 2_option_and_argument.py hello qq --count=12
'''

# here put the import lib
import click


@click.group()
def cli():
    pass


@cli.command()
@click.option('--count', default=1, help='number of greetings')
@click.argument('name')
def hello(count, name):
    for x in range(count):
        click.echo(f'Hello {name}!')


if __name__ == '__main__':
    cli()
