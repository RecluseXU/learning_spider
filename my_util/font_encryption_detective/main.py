# -*- encoding: utf-8 -*-
'''
@Time    :   2021-11-04
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   通用自动处理字体加密脚本
'''

# here put the import lib
from typing import Dict
from fontTools.ttLib import TTFont
from io import BytesIO
import ddddocr
from ttf_glyph_image import get_font_image_map
import os


work_folder = os.path.dirname(__file__)


def get_font_decrypt_map(font: bytes) -> Dict[str, str]:
    """生成字体，保存字体ttf，保存字体ttx，记录cmap
    :param font: 字体文件bytes
    :return: {HTML-Unicode: 真实字符}
    """
    ttf = TTFont(BytesIO(font))
    # 保存到xml进行查看，生成一些字体的属性来用
    font_xml_uri = os.path.join(work_folder, 'font.xml')
    ttf.saveXML(font_xml_uri)
    # {字符名称: HTML-Unicode}
    cmap = ttf.getBestCmap()
    html_unicode_map = {}
    for unicode_num, font_char_name in cmap.items():
        html_unicode = f'&#x{hex(unicode_num)[2:]};'
        html_unicode_map[font_char_name] = html_unicode
    print('{字符名称: HTML-Unicode}\n', html_unicode_map)
    # {字符名称: 真实字符}
    real_char_map = {}
    dddd = ddddocr.DdddOcr()
    font_image_map = get_font_image_map(ttf)
    for char_name, char_img in font_image_map.items():
        real_char = dddd.classification(char_img)
        real_char_map[char_name] = real_char
    print('{字符名称: 真实字符}\n', real_char_map)
    # {HTML_Unicode: 真实字符}
    decrypt_map = {}
    for char_name, html_unicode in html_unicode_map.items():
        real_char = real_char_map.get(char_name)
        if real_char:
            decrypt_map[html_unicode] = real_char
        else:
            print(f'字符处理失败: {html_unicode}')
    print('{HTML_Unicode: 真实字符}\n', decrypt_map)
    return decrypt_map


if __name__ == "__main__":
    # 入读字体文件
    font_dir = os.path.join(work_folder, 'test_fonts')
    fonts_filename = os.listdir(font_dir)
    fonts_file_path = [
        os.path.join(font_dir, filename)
        for filename in fonts_filename
    ]
    # 逐一解密
    for font_file_path in fonts_file_path:
        print(f'-----------------------\n{font_file_path}\n---------------------')
        with open(font_file_path, 'rb') as frb:
            font_bytes = frb.read()
        decrypt_map = get_font_decrypt_map(font_bytes)
        print(font_file_path, '\n', decrypt_map)
        print()
