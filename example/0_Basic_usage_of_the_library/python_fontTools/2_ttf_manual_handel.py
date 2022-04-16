# -*- encoding: utf-8 -*-
'''
@Time    :   2020-08-29
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   静态字体，手工处理方法
    这种方法其实很简单，也很死板，只能应对最简单的情况
    将字体文件 ttf/woff 用在线字体解析网站解析得到uncode和对应的结果  
    比如： https://kekee000.github.io/fonteditor/
    手工编写转换字典,将html进行转换即可
'''

# here put the import lib
from fontTools.ttLib import TTFont
from io import BytesIO


work_folder = 'example/0_Basic_usage_of_the_library/fontTools/file/58'

ttf_file_path = '{}/{}'.format(work_folder, '58_font.ttf')
with open(ttf_file_path, 'rb') as f:
    a = f.read()
ttf = TTFont(BytesIO(a))

print('转换字典：')
baidu_font_dict = {
    '9fa4': 0, '9ea3': 1, '9f92': 2, '993c': 3,
    '9a4b': 4, '958f': 5, '9476': 6, '9e3a': 7, '9fa5': 8, '9f64': 9}
convert_dict = {'&#x{};'.format(k): str(v) for k, v in baidu_font_dict.items()}
print(convert_dict)
