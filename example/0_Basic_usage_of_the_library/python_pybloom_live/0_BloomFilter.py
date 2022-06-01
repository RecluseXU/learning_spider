# -*- encoding: utf-8 -*-
'''
@Time    :   2022-06-01
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   BloomFilter 容量固定的布隆过滤器
'''

# here put the import lib
from pybloom_live import BloomFilter


# capacity参数设置容量
# error_rate参数设置错误率
bloom_filter = BloomFilter(capacity=1000, error_rate=0.001)

# 添加元素
# 如果元素已经存在会返回True,否则返回False
# 如果添加元素超出容量，会报错
bloom_filter.add(1)
bloom_filter.add(1.0)
bloom_filter.add("1")

print('BloomFilter信息')
print(f'\t容量:\t{bloom_filter.capacity}')
print(f'\t错误率:\t{bloom_filter.error_rate}')
print(f'\t元素数量:{bloom_filter.count}')
print(f'\tBitArray:\t{bloom_filter.bitarray}')


print("1" in bloom_filter)  # True
print("2" in bloom_filter)  # False
