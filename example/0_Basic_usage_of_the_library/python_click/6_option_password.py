# -*- encoding: utf-8 -*-
'''
@Time    :   2021-09-03
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   Option 输入密码

hide_input 用于隐藏输入
confirmation_promt 用于重复输入
'''

# here put the import lib
import click


@click.group()
def cli():
    pass


@cli.command()
@click.option('--password', prompt=True, hide_input=True)
def input_password(password):
    """输入密码(隐藏)
    python 6_option_password.py input_password
    """
    click.echo('password: %s' % password)


@cli.command()
@click.option('--password', prompt=True, hide_input=True,
              confirmation_prompt=True)
def input_password_conf(password):
    """输入密码(隐藏 + 二次确认)
    python 6_option_password.py input_password_conf
    """
    click.echo('password: %s' % password)


@cli.command()
@click.password_option()
def input_password_simple(password):
    """输入密码(二次确认)
    python 6_option_password.py input_password_simple
    """
    click.echo('password: %s' % password)


if __name__ == '__main__':
    cli()
