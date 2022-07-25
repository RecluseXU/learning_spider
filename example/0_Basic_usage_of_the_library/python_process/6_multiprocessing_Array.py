# -*- encoding: utf-8 -*-
'''
@Time    :   2022-06-20
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   multiprocessing 共享内存 Array

共享内存
数据操作最快，因为是直接在内存层面操作，省去中间的拷贝工作
但是共享内存只能在单机上运行，且只能操作基础数据格式，无法直接共享复杂对象

TypeCode      C类型	           Python类型	Minimum size in bytes
'b'         signed char	         int                1
'B'       unsigned char	         int                1
'u'      Py_UNICODE	Unicode    character            2
'h'        signed short	         int	            2
'H'       unsigned short         int                2
'i'        signed int            int                2
'I'         无符号整型            int                2
'l'        signed long           int                4
'L'        无符号长整型           int                4
'q'     signed long long         int                8
'Q'     无符号 long long          int                8
'f'           float             float               4
'd'           double            float               8
'''

# here put the import lib
import multiprocessing


def odd_printer(index_array: multiprocessing.Array):
    """单数计数"""
    process_id = multiprocessing.current_process().pid
    while index_array[0] < 50:
        if index_array[0] % 2 == 1:
            print(f'{process_id}单数: {list(index_array)}')
            index_array[0] += 1
            index_array[1] -= 1


def even_printer(index_array: multiprocessing.Array):
    """双数计数"""
    process_id = multiprocessing.current_process().pid
    while index_array[0] < 50:
        if index_array[0] % 2 == 0:
            print(f'{process_id}双数: {list(index_array)}')
            index_array[0] += 1
            index_array[1] += 1


if __name__ == '__main__':
    # 共享内存
    # multiprocessing.Array(TypeCode, 初始值)
    index_array = multiprocessing.Array('i', [i for i in range(2)])
    # 创建子进程
    process_producer = multiprocessing.Process(
        target=odd_printer, args=(index_array,))
    process_consumer = multiprocessing.Process(
        target=even_printer, args=(index_array,))
    # 启动子进程
    process_producer.start()
    process_consumer.start()
    # 该子进程必须先执行完毕
    process_producer.join()
    process_consumer.join()
    print('完毕')
