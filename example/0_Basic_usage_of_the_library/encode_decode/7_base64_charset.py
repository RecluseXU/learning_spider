# -*- encoding: utf-8 -*-
'''
@Time    :   2020-08-27
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   自定义字符集的base64编码与解码用例
'''

# here put the import lib
import string
import random

# 定义自己的64个字符
# 从标准库里将大写字母，小写字母，数字（一共62个字符）
char64 = string.ascii_uppercase + string.ascii_lowercase + string.digits
# 额外添加两个字符(一共64个字符)
char64 += '+'+'/'
char64 = list(char64)
# 打乱码表
random.shuffle(char64)


def cut(obj, sec):
    '''
    将字符串按照指定数量进行切分
    '''
    return [obj[i:i+sec] for i in range(0, len(obj), sec)]


def ascii_2_base64(ascii_str: str) -> str:
    '''
    正常来说，一个ASCII字符占8位
    一个base64字符占6位
    3*8 = 24 = 4*6位
    这个函数就是用来做这个转换的
    单个字符位数不够的，计算时会用0补全
    整个字符位数不够的，在最后会用=来补足

    b1    b2    b3
    n1  n2  n3  n4

    '''
    print('传入的数据字符串\t', ascii_str)
    # 将数据转为bytes
    origin_bytes = ascii_str.encode()
    print('将传入数据转为bytes\t', origin_bytes)

    # 转为八位二进制
    base64_8_bin = [
        f"{str(bin(b)).replace('0b', ''):0>8}"
        for b in origin_bytes
    ]
    print('将数据转为八位二进制\t', base64_8_bin)

    # 按每6位切分
    base64_6_bin = cut(''.join(base64_8_bin), 6)
    print('每6位切分一次数据\t', base64_6_bin)

    # 最后一位位数补足到6位
    base64_6_bin[-1] += '0' * (6 - len(base64_6_bin[-1]))
    print('将最后一位的位数补足\t', base64_6_bin)

    # 将被切分的数据重新转为10进制
    base64_int = list(map(lambda x: int(x, 2), base64_6_bin))
    print('每段二进制数转十进制\t', base64_int)

    # 码表中寻找目标字符替换对应项
    base64_str = list(map(lambda x: char64[x], base64_int))
    print('码表中寻找目标字符替换\t', base64_str)

    # 位数不够的地方补=
    base64_str += ['='] * (3 - len(base64_8_bin) % 3)
    print('用=将数据补全到24*n位\t', base64_str)

    # 最终结果
    base64_str = ''.join(base64_str)
    print('ascii转base64 最终结果\t', base64_str)
    return base64_str


def base64_2_ascii(base64_str: str) -> str:
    '''
    做和上面相反的操作
    '''
    print('传入的数据字符串\t', base64_str)
    # 处理最后一个字符，通过码表判断是否为填充用的字符，是则在记录后去除
    if base64_str[-1] not in char64:
        base64_str = base64_str.replace(base64_str[-1], '')
    print('按码表处理填充字符\t', base64_str)
    # 码表中寻找目标十进制数字序号替换对应项
    base64_int = list(map(lambda x: char64.index(x), base64_str))
    print('码表中寻找目标序号替换\t', base64_int)
    # 十进制数字序号转六位二进制
    base64_6_bin = [f"{bin(x)[2:]:0>6}" for x in base64_int]
    print('十进制序号转六位二进制\t', base64_6_bin)
    # 六位二进制转八位二进制
    base64_8_bin = cut(''.join(base64_6_bin), 8)
    print('六位二进制转八位二进制\t', base64_8_bin)
    # 抛弃位数不足的位数
    base64_8_bin = list(filter(lambda x: len(x) == 8, base64_8_bin))
    print('抛弃位数不足八位的项\t', base64_8_bin)
    # 八位二进制转ascii字符
    ascii_str = [chr(int(x, 2)) for x in base64_8_bin]
    print('八位二进制转ascii字符\t', ascii_str)
    ascii_str = ''.join(ascii_str)
    print('base64转ascii 最终结果\t', ascii_str)


if __name__ == '__main__':
    base64_str = ascii_2_base64('216as1d6asd')
    print()
    base64_2_ascii(base64_str)
