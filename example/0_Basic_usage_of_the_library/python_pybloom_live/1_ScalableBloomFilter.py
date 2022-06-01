# -*- encoding: utf-8 -*-
'''
@Time    :   2022-06-01
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   ScalableBloomFilter 容量可变的布隆过滤器
    容量可变,但如果超过初始容量,错误率会增加
'''

# here put the import lib
from pybloom_live import ScalableBloomFilter


# capacity参数设置容量
# error_rate参数设置错误率
# mode模式
#   ScalableBloomFilter.LARGE_SET_GROWTH 慢,内存消耗较小
#   ScalableBloomFilter.LARGE_SET_GROWTH 快,内存消耗较大
bloom_filter = ScalableBloomFilter(
    initial_capacity=100,
    error_rate=0.001,
    mode=ScalableBloomFilter.LARGE_SET_GROWTH)

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


assert("1" in bloom_filter)  # True
assert("2" not in bloom_filter)  # False
