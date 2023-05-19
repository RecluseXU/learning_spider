# -*- encoding: utf-8 -*-
'''
@Time    :   2022-07-23
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   通过代码获取热图
'''
# here put the import lib
from pyheat import PyHeat
import os


code_filepath = os.path.join(os.path.dirname(__file__), 'test_code.py')


ph = PyHeat(code_filepath)
ph.create_heatmap()
# To view the heatmap.
ph.show_heatmap()
# To output the heatmap as a file.
ph.show_heatmap('image_file.png')
