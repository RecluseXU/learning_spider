# -*- encoding: utf-8 -*-
'''
@Time    :   2021-05-25
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   multiprocessing进程池的map函数
'''

# here put the import lib
import multiprocessing as ms


def test(i):
    return i + 10


if __name__ == '__main__':
    items = [1, 2, 3, 4, 5]

    # Pool.map_async 用法与 map函数一致，作用也相同，但是此方法是用进程池处理的，而不是串行阻塞进行
    pool_ = ms.Pool(5)
    result = pool_.map_async(test, items)  # 用法与map是一致的
    pool_.close()
    pool_.join()
    print(result.get())
