# -*- encoding: utf-8 -*-
'''
@Time    :   2021-11-16
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   处理关键词
'''

# here put the import lib
from flashtext import KeywordProcessor

text = '为什么不问问这个神奇的海螺呢？'


# 一次性添加多个关键词
keyword_processor = KeywordProcessor()
keyword_processor.add_keywords_from_list(['头铁', '？'])
result = keyword_processor.extract_keywords(text)
print('一次性添加多个关键词(列表)', result)


# 通过字典添加多个关键词
# {'clean_name': ['list of unclean names']}
keyword_processor = KeywordProcessor()
keyword_processor.add_keywords_from_dict({
    'JOJO': ['海螺'],
    'DIO': ['不存在', '不是']
})
result = keyword_processor.extract_keywords(text)
print('一次性添加多个关键词(字典)', result)

# 删除关键词
keyword_processor = KeywordProcessor()
keyword_processor.add_keywords_from_list(['神奇', '海螺', '？', '问问'])
keyword_processor.remove_keyword('海螺')
keyword_processor.remove_keywords_from_list(['神奇', '问问'])
result = keyword_processor.extract_keywords(text)
print('删除关键词', result)
