# -*- encoding: utf-8 -*-
'''
@Time    :   2021-07-17
@Author  :   _evilRecluse
@_contact :   https://github.com/RecluseXU
@Desc    :   緩動函數 Python 版本
    參考：https://easings.net/cn#
'''

# here put the import lib
from math import sin, cos, pi, sqrt
from typing import Callable, List, Tuple
from random import random, sample


def ease_in_sine(x: float) -> float:
    return 1 - cos((x * pi) / 2)


def ease_in_quad(x: float) -> float:
    return x * x


def ease_in_cubic(x: float) -> float:
    return x * x * x


def ease_in_quart(x: float) -> float:
    return x * x * x * x


def ease_in_quint(x: float) -> float:
    return x * x * x * x * x


def ease_in_expo(x: float) -> float:
    return 0 if x == 0 else pow(2, 10 * x - 10)


def ease_in_circ(x: float) -> float:
    return 1 - sqrt(1 - pow(x, 2))


def ease_in_back(x: float) -> float:
    c1 = 1.70158
    c3 = c1 + 1
    return c3 * x * x * x - c1 * x * x


def ease_in_elastic(x: float) -> float:
    c4 = (2 * pi) / 3
    if x == 0 or x == 1:
        return x
    else:
        return -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4)


def ease_in_bounce(x: float) -> float:
    return 1 - ease_out_bounce(1 - x)


def ease_out_sine(x: float) -> float:
    return sin((x * pi) / 2)


def ease_out_quad(x: float) -> float:
    return 1 - (1 - x) * (1 - x)


def ease_out_cubic(x: float) -> float:
    return 1 - pow(1 - x, 3)


def ease_out_quart(x: float) -> float:
    return 1 - pow(1 - x, 4)


def ease_out_quint(x: float) -> float:
    return 1 - pow(1 - x, 5)


def ease_out_expo(x: float) -> float:
    return 1 if x == 1 else 1 - pow(2, -10 * x)


def ease_out_circ(x: float) -> float:
    return sqrt(1 - pow(x - 1, 2))


def ease_out_back(x: float) -> float:
    c1 = 1.70158
    c3 = c1 + 1
    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2)


def ease_out_elastic(x: float) -> float:
    c4 = (2 * pi) / 3
    if x == 0 or x == 1:
        return x
    else:
        return pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1


def ease_out_bounce(x: float) -> float:
    n1 = 7.5625
    d1 = 2.75

    if (x < 1 / d1):
        return n1 * x * x
    elif (x < 2 / d1):
        x -= 1.5 / d1
        return n1 * x * x + 0.75
    elif (x < 2.5 / d1):
        x -= 2.25 / d1
        return n1 * x * x + 0.9375
    else:
        x -= 2.625 / d1
        return n1 * x * x + 0.984375


def ease_in_out_sine(x: float) -> float:
    return -(cos(pi * x) - 1) / 2


def ease_in_out_quad(x: float) -> float:
    if x < 0.5:
        return 2 * x * x
    else:
        return 1 - pow(-2 * x + 2, 2) / 2


def ease_in_out_cubic(x: float) -> float:
    if x < 0.5:
        return 4 * x * x * x
    else:
        return 1 - pow(-2 * x + 2, 3) / 2


def ease_in_out_quart(x: float) -> float:
    if x < 0.5:
        return 8 * x * x * x * x
    else:
        return 1 - pow(-2 * x + 2, 4) / 2


def ease_in_out_quint(x: float) -> float:
    if x < 0.5:
        return 16 * x * x * x * x * x
    else:
        return 1 - pow(-2 * x + 2, 5) / 2


def ease_in_out_expo(x: float) -> float:
    if x == 0 or x == 1:
        return x
    elif x < 0.5:
        return pow(2, 20 * x - 10) / 2
    else:
        return (2 - pow(2, -20 * x + 10)) / 2


def ease_in_out_circ(x: float) -> float:
    if x < 0.5:
        return (1 - sqrt(1 - pow(2 * x, 2))) / 2
    else:
        return (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2


def ease_in_out_back(x: float) -> float:
    c1 = 1.70158
    c2 = c1 * 1.525

    if x < 0.5:
        return (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    else:
        return (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2


def ease_in_out_elastic(x: float) -> float:
    c5 = (2 * pi) / 4.5
    if x == 0 or x == 1:
        return x
    elif x < 0.5:
        return -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
    else:
        return (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1


def ease_in_out_bounce(x: float) -> float:
    if x < 0.5:
        return (1 - ease_out_bounce(1 - 2 * x)) / 2
    else:
        return (1 + ease_out_bounce(2 * x - 1)) / 2


def noise_cover_trigonometric(region_amount: int, amplitude: Tuple[int, int]):
    """噪声, 分区三角函数叠加
    :param region_amount: 区域数量, 也许和帧数不重叠会有更好的效果
    :param amplitude: 振幅范围
    """
    # 区域切分多分, 随机选择位置作为分区位置, 换算分区位置百分比
    cent_amount = region_amount * 5
    cents = sample(range(1, cent_amount), region_amount)
    regions_cent = [cent/cent_amount for cent in cents]
    regions_cent.sort()
    # 百分比转区域
    regions, pre_cent = [], 0
    for cent in regions_cent:
        regions.append((pre_cent, cent))
        pre_cent = cent
    regions.append((cent, 1))
    dif_amplitude, base_amplitude = amplitude[1] - amplitude[0], amplitude[0]

    def noise(x: float):
        for region in regions:
            if x < region[1]:
                period = region[1] - region[0]
                amplitude = random() * dif_amplitude + base_amplitude
                return amplitude * sin(2 * pi * (x + region[0]) / period)
    return noise


def create_offsets(track_func: Callable, distance: int,
                   frames: int = 100) -> List[int]:
    """創建軌跡
    :param track_func: 所采用的轨迹函數
    :param distance: 所要移動的距離
    :param seconds: 操作執行時間
    :param frames: 幀數
    :param noice_func: 噪声函数, 计算的结果会叠加在轨迹函数结果上
    :return: 偏移数组
    """
    offsets, position = [0], 0
    for frame_index in range(1, frames):
        neo_position = round(track_func(frame_index/frames) * distance)
        offsets.append(neo_position - position)
        position = neo_position
    return offsets


def create_track(track_func: Callable, distance: int,
                 frames: int = 100) -> List[int]:
    """創建軌跡
    :param track_func: 所采用的轨迹函數
    :param distance: 所要移動的距離
    :param seconds: 操作執行時間
    :param frames: 幀數
    :param noice_func: 噪声函数, 计算的结果会叠加在轨迹函数结果上
    :return: 偏移数组
    """
    return [
        round(track_func(frame_index/frames) * distance)
        for frame_index in range(0, frames)
    ]
