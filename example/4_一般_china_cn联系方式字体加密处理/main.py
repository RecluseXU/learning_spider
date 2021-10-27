# -*- encoding: utf-8 -*-
'''
@Time    :   2021-10-26
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   china.cn 公司联系方式字体加密处理
'''

# here put the import lib
from typing import Dict, List
from fontTools.ttLib import TTFont
from fontTools.cffLib import CharStrings
from fontTools.misc.textTools import byteord, strjoin, num2binary
from fontTools.misc.fixedTools import floatToFixedToStr
from hashlib import md5
from io import BytesIO
import requests
import os
import re
import base64
from fontTools.ttLib.tables._c_m_a_p import cmap_format_12



BASE_PATH = os.path.dirname(__file__)


def get_page() -> str:
    """获取基本html"""
    file_path = os.path.join(BASE_PATH, 'origin_page.html')
    if os.path.exists(file_path):
        print('获取HTML: 从文件获取')
        with open(file_path, 'r', encoding='utf-8')as f:
            html = f.read()
            return html
    print('获取HTML: 访问网页获取')
    url = "https://yixingjianzhizuo.cn.china.cn/contact-information/"
    headers = {
        'authority': 'yixingjianzhizuo.cn.china.cn',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'user-agent': (
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
            'AppleWebKit/537.36 (KHTML, like Gecko) '
            'Chrome/95.0.4638.54 Safari/537.36'
        ),
        'accept': (
            'text/html,application/xhtml+xml,application/xml;'
            'q=0.9,image/avif,image/webp,image/apng,*/*;'
            'q=0.8,application/signed-exchange;v=b3;q=0.9'
        ),
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8'
    }
    with requests.request("GET", url, headers=headers)as resp:
        html = resp.content.decode('gbk')
        with open(file_path, 'w', encoding='utf-8')as f:
            f.write(html)
    return html


def get_font(html: str):
    """从HTML获取中获取字体信息, 保存到字体文件
    ttf utf-8 base64
    """
    file_path = os.path.join(BASE_PATH, 'icomoon.ttf')
    if os.path.exists(file_path):
        print('获取字体: 从已有文件中获取')
        with open(file_path, 'rb')as f:
            html = f.read()
            return html
    print('获取字体: 从HTML中截取保存')
    pattern = re.compile(r"font-family:'icomoon'[\s\S]+?base64,([^']+)")
    font_mark_base64 = pattern.search(html).group(1)
    font_bytes = base64.b64decode(font_mark_base64)
    with open(file_path, 'wb')as f:
        f.write(font_bytes)
    return font_bytes


def collect_operation(char_string: CharStrings) -> List:
    """整合操作到数组中"""
    token, index = True, 0
    operations, args = [], []
    while True:
        token, isOperator, index = char_string.getToken(index)
        if token is None:
            break
        # 积累操作参数
        if isOperator is False:
            if isinstance(token, float):
                token = floatToFixedToStr(token, precisionBits=16)
            else:
                token = str(token)
            args.append(token)
            continue
        # 记录操作记录
        if token in ('hintmask', 'cntrmask'):
            hintMask, isOperator, index = char_string.getToken(index)
            bits = [num2binary(byteord(byte), 8) for byte in hintMask]
            hintMask = strjoin(bits)
            line = args + [token, hintMask]
        else:
            line = args + [token]
        operation = ' '.join(line)
        args.clear()
        operations.append(operation)
    return operations


def get_font_map(font_bytes: bytes) -> Dict:
    """计算字体映射字典
    """
    ttfont = TTFont(BytesIO(font_bytes))
    print(ttfont.keys())
    print(r'获取获取字符映射关系 {Unicode: 字符名称}')
    unicode_map = {}
    cmap_table = ttfont['cmap']
    for table in cmap_table.tables:
        if table.isUnicode() is False:
            continue
        for code, name in table.cmap.items():
            unicode_map[hex(code)] = name
    # 转HTML-Unicode
    unicode_map = {
        f'&#x{unicode_code[2:]};': name
        for unicode_code, name in unicode_map.items()
    }
    print(unicode_map)
    print(r'获取字符映射关系 {字符名称: 点阵图操作记录_md5}')
    # 操作记录很长, 用md5保存处理比较方便
    table = ttfont['CFF ']
    cff_fontset = table.cff
    cff_font = cff_fontset['OpenTypeSansMedium']
    cff_char_strings = cff_font.CharStrings
    charstrings_map = {}
    for char_string_name in cff_char_strings.keys():
        operation_notes = collect_operation(cff_char_strings[char_string_name])
        op_md5 = md5('\n'.join(operation_notes).encode('utf-8')).hexdigest()
        charstrings_map[char_string_name] = op_md5
    print(charstrings_map)
    print(r'实际字符与字符名称映射{点阵图操作记录_md5: 实际上的字符}')
    print('(此处手工获取, 如果有需要可以通过点阵图记录生成图片做OCR获取)')
    real_char_map = {
        '385e07353a10fd4127a04a721a9f7134': '0',
        'ef34c845c431d2f5c09665d612f447da': '1',
        'c2ddb25fce6e236c545bdc9ea40d6675': '2',
        'a187b4d7f2cd4a2ce105babe1fa1c9f7': '3',
        '24ef5586d11c966ba4076e4653114f32': '4',
        'b4186d1177d054d4128e544320d20da3': '5',
        '51f64789693bfee72b4cce294002ec62': '6',
        '02b4d1fa1c87f5e509c5e97fc4bd5638': '7',
        '3c3de8661ec65606e6655bf7ba3f6de3': '9',
        '745ad2868cf5443f4151cc174b6201a2': '-',
    }
    print(real_char_map)
    # HTML-Unicode -> 字符名称 -> 点阵图操作记录 -> 实际上的字符
    print(r'整合字符映射 {HTML-Unicode: 实际上的字符}')
    final_map = {}
    for html_unicode, char_name in unicode_map.items():
        op_md5 = charstrings_map[char_name]
        real_char = real_char_map[op_md5]
        final_map[html_unicode] = real_char
    print(final_map)
    # 记录字体XML 方便查看
    xml_path = os.path.join(BASE_PATH, 'icomoon_font.xml')
    if os.path.exists(xml_path) is False:
        ttfont.saveXML(xml_path)
        print('生成字体xml记录方便查看(程序本身并不使用)')
    return final_map


# 注意每次访问字体都会变, 留心清理中间生成的内容
html = get_page()
font_bytes = get_font(html)
char_map = get_font_map(font_bytes)
for html_unicode, real_char in char_map.items():
    html = html.replace(html_unicode, real_char)
with open(os.path.join(BASE_PATH, 'fix.html'), 'w', encoding='utf-8')as f:
    f.write(html)
