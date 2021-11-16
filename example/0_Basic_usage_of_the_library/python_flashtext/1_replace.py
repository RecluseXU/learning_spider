# -*- encoding: utf-8 -*-
'''
@Time    :   2021-11-16
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   字符串替换相关
'''

# here put the import lib
from flashtext import KeywordProcessor

text = '聚集的祈愿将成为新生的闪耀之星，化作光芒闪耀的道路吧!同调召唤!飞翔吧!星尘龙!'

# 字符串替换
keyword_processor = KeywordProcessor()
keyword_processor.add_keyword('星', '⭐')
result = keyword_processor.replace_keywords(text)
print('字符串替换', result)

# 同样要注意默认大小写不敏感的问题
