#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   1_woff.py
@Time    :   2021-02-22
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   woff实际上并没有什么太大的不同
'''

# here put the import lib
from fontTools.ttLib import TTFont
from io import BytesIO


work_folder = 'example/0_Basic_usage_of_the_library/fontTools/file/xuanzhi'

file_path = '{}/{}'.format(work_folder, 'font.woff')
with open(file_path, 'rb') as f:
    a = f.read()
woff = TTFont(BytesIO(a))


print('返回字体中可用的“最佳” unicode cmap词典,如果没有unicode cmap子表可用,则返回None')
c = woff.getBestCmap()
print(c)

print('获取字形名称的列表，按字母顺序排序')
c = woff.getGlyphNames()
print(c)

print('返回GlyphSet')
c = woff.getGlyphSet()
print(c)


c = woff.tables['cmap']
print(c)


print('将字体导出为TTX')
file_path = '{}/{}'.format(work_folder, 'font.xml')
c = woff.saveXML(file_path)
