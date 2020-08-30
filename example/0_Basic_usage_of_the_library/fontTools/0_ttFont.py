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
from fontTools.pens.pointPen import BasePointToSegmentPen


work_folder = 'F:/Workspace/learning_spider/example/0_Basic_usage_of_the_library/fontTools/'

with open(work_folder + '58_font.ttf', 'rb') as f:
    a = f.read()
ttf = TTFont(BytesIO(a))


print('返回字体中可用的“最佳” unicode cmap词典，如果没有unicode cmap子表可用，则返回None')
c = ttf.getBestCmap()
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
c = ttf.save(work_folder + 'zxc.ttf')
print(c)

print('将字体导出为TTX')
c = ttf.saveXML(work_folder + '58.xml')
print(c)