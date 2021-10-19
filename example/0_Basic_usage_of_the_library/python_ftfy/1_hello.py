# -*- encoding: utf-8 -*-
'''
@Time    :   2021-10-19
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   修正Unicode
'''

# here put the import lib
import ftfy

# 修正mojibake(编码混淆)
# 修复通过检测明显是 UTF-8但被解码为其他东西的字符
print(ftfy.fix_text('âœ” No problems'))
# 修复被多次编码的乱码
print(ftfy.fix_text('The Mona Lisa doesnÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢t have eyebrows.'))
# 解码出现在HTML之外的HTML实体
# by the HTML 5 standard, only 'P&Eacute;REZ' is acceptable
print(ftfy.fix_text('P&EACUTE;REZ'))
