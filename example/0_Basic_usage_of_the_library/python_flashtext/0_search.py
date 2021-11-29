# -*- encoding: utf-8 -*-
'''
@Time    :   2021-11-16
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   字符串查找相关
'''

# here put the import lib
from flashtext import KeywordProcessor


text = '卡Q因: 接招吧DIO!!!半径30米的绿宝石溅射!!!'

# 字符串抽取
keyword_processor = KeywordProcessor()  # 默认大小写不敏感
keyword_processor.add_keyword('绿宝石')
keyword_processor.add_keyword('dio')
keyword_processor.add_keyword('JOJO')
result = keyword_processor.extract_keywords(text)
print('字符串抽取', result)

# 自定义抽取返回记录
keyword_processor = KeywordProcessor()
keyword_processor.add_keyword('绿宝石', ['疯狂钻石', '不屈白银'])
result = keyword_processor.extract_keywords(text)
print('字符串抽取（自定义抽取返回记录）', result)

# 大小写敏感需设置参数
keyword_processor = KeywordProcessor(case_sensitive=True)
keyword_processor.add_keyword('dio')
keyword_processor.add_keyword('卡Q因')
result = keyword_processor.extract_keywords(text)
print('字符串抽取（大小写敏感）', result)

# 获取结果的区间
keyword_processor = KeywordProcessor()
keyword_processor.add_keyword('卡Q因', '花京院')
keyword_processor.add_keyword('dio')
result = keyword_processor.extract_keywords(text, span_info=True)
print('字符串抽取（结果区间）', result)
