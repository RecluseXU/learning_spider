# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-07
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   命令行组
    可以通过传入不同的命令来执行不同的内容
    python 1_group.py initdb
    python 1_group.py dropdb

'''

# here put the import lib
import click


@click.group()
def cli():
    pass


@cli.command()
def initdb():
    click.echo('Initialized the database')


@cli.command()
def dropdb():
    click.echo('Dropped the database')


cli.add_command(initdb)
cli.add_command(dropdb)


if __name__ == '__main__':
    cli()
