# -*- encoding: utf-8 -*-
'''
@Time    :   2021-10-12
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   命名转换简单用例
'''

# here put the import lib
from case_convert import (
    camel_case,
    kebab_case,
    pascal_case,
    snake_case,
    upper_case
)

text = 'hello_world'

print(camel_case(text))   # helloWorld
print(kebab_case(text))   # hello-world
print(pascal_case(text))  # HelloWorld
print(snake_case(text))   # hello_world
print(upper_case(text))   # HELLO_WORLD
