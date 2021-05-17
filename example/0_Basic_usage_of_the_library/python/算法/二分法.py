# -*- encoding: utf-8 -*-
'''
@Time    :   2021-04-29
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   二分法查找
'''

# here put the import lib


def binary_search_normal(self, array, data):
    """二分查找法非递归实现"""
    array.sort()
    start, end = 0, len(array)-1
    while start <= end:
        mid_index = (start + end) // 2
        if array[mid_index] == data:
            return True
        if data > array[mid_index]:
            start = mid_index + 1
        else:
            end = mid_index - 1
    return False