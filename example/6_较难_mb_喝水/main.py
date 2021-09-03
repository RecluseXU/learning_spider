# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-01
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   喝水吧
'''

# here put the import lib
from steps.step_1_trigger import triger as step1
from steps.step_2_page import page as step2


drink_water_url = step1()
step2(drink_water_url)
