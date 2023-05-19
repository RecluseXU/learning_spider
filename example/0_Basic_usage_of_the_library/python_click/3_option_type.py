# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-07
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   选项 参数类型
'''

# here put the import lib
import click


@click.group()
def cli():
    pass

# str / click.STRING
#   表示unicode字符串的默认参数类型
# int / click.INT
#   只接受整数的参数
# float / click.FLOAT
#   只接受浮点值的参数
# bool / click.BOOL
#   接受布尔值的参数
#       转化 (1, yes, y, true) 转化为 True
#       转化 (0, no, n， false) 转化为 False
# click.UUID:
#   接受 UUID 值的参数
#   不进行自动识别，只是表示为 uuid.UUID
# click.File(mode='r', encoding=None, errors='strict', lazy=None, atomic=False)
#   读写文件内容作为参数
# click.Path(exists=False, file_okay=True, dir_okay=True,
#            writable=False, readable=True, resolve_path=False,
#            allow_dash=False, path_type=None)
#   路径参数，主要用于对路径进行一些检查
# click.Choice(choices)
#   choices 为固定的字符串组, 填入的参数必须是 choices 中存在的字符串
# click.IntRange(min=None, max=None, clamp=False)
#   接受指定区间内的整数
# click.DateTime(formats)
#   接收 datetime.datetime 日期参数
#   formats List[str] 接收的日期格式, 默认为 ['%Y-%m-%d', '%Y-%m-%dT%H:%M:%S', '%Y-%m-%d %H:%M:%S']


@cli.command()
@click.option('--count', type=int)
def hello(count):
    """指定 选项的参数类型
    python 3_option_type.py hello --count=abc
    python 3_option_type.py hello --count=6
    """
    for _ in range(count):
        click.echo('Hello!')


@cli.command()
@click.option('--date', type=click.DateTime(['%Y-%m-%d', '%Y%m%d']))
def date_type(date):
    """指定 选项的参数类型
    python 3_option_type.py date-type --date=20230518
    python 3_option_type.py date-type --date=2023-05-18
    """
    click.echo(type(date))


# 自定义类型

class FourSliceIntType(click.ParamType):
    """输入的数要是4的倍数
    """
    name = '4 * integer'

    def convert(self, value, param, ctx):
        try:
            value = int(value)
        except Exception:
            self.fail(f'{value} is not a valid integer')
        if value % 4 != 0:
            self.fail(f'Option {self.name} must can been slice by 4')
        return value


@cli.command()
@click.option('--count', type=FourSliceIntType())
def hello2(count):
    """自定义参数类型
    python 3_option_type.py hello2 --count=abc
    python 3_option_type.py hello2 --count=6
    python 3_option_type.py hello2 --count=8
    """
    for _ in range(count):
        click.echo('Hello!')


if __name__ == '__main__':
    cli()
