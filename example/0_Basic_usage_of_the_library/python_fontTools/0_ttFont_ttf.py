#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   0_ttFont.py
@Time    :   2020/08/29 21:46:59
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
'''

# here put the import lib
from fontTools.ttLib import TTFont
from io import BytesIO


work_folder = 'example/0_Basic_usage_of_the_library/fontTools/file/58'

ttf_file_path = '{}/{}'.format(work_folder, '58_font.ttf')
with open(ttf_file_path, 'rb') as f:
    a = f.read()
ttf = TTFont(BytesIO(a))


print('返回字体中可用的“最佳” unicode cmap词典，如果没有unicode cmap子表可用，则返回None')
c = ttf.getBestCmap()
print(c)

print('实际上，这个字典的key就是10进制的unicode')
c = {str(hex(k))[2:]:v for k,v in c.items()}
print(c)

print('获取字形名称的列表，按字母顺序排序')
c = ttf.getGlyphNames()
print(c)

print('返回GlyphSet')
c = ttf.getGlyphSet()
print(c)


c = ttf.tables['cmap']
print(c)

print('将字体保存到磁盘')
file_path = '{}/{}'.format(work_folder, 'another_58_font.ttf')
c = ttf.save(file_path)

print('将字体导出为TTX')
file_path = '{}/{}'.format(work_folder, '58_font.xml')
c = ttf.saveXML(file_path)