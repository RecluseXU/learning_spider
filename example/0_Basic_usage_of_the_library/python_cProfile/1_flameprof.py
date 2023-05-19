# -*- encoding: utf-8 -*-
'''
@Time    :   2022-12-03
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   利用flameprof生成热力图

用flameprof 对 cProfile结果生成热力图
python -m flameprof 1_flameprof.prof 1_flameprof.py > mark.svg

注意: 生成 .prof 的python版本需要与 flameprof的python版本一致, 否则会报错

热力图查看
上部的图是按照函数调用栈和执行时间排列
下部反方向的图按照函数执行时间比例从大到小排列
宽度表示每个函数的执行时间占用的比例，越宽表示越耗时
'''

# here put the import lib
import cProfile
import re
import os


if __name__ == '__main__':
    pr = cProfile.Profile()
    pr.enable()  # 开始收集性能分析数据

    re.compile("foo|bar")

    pr.disable()  # 停止收集性能分析数据

    base_dir = os.path.dirname(__file__)
    output_path = os.path.join(base_dir, '1_flameprof.prof')
    pr.dump_stats(output_path)  # 把当前性能分析的内容写入一个文件
