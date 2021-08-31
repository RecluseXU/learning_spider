# -*- encoding: utf-8 -*-
'''
@Time    :   2021-07-17
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   模拟人类操作
'''

# here put the import lib
from typing import Callable
from time import sleep as time_sleep
from random import random
import re

from .easing_functions import create_track
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.remote import webdriver
from selenium.webdriver.remote.webelement import WebElement


CHAR_MAP = {
    'number': re.compile(r'^[0-9]'),
    'letter_low': re.compile(r'^[a-z]'),
    'letter_up': re.compile(r'^[A-Z]'),
    'chinese': re.compile(r'^[\u4e00-\u9fa5]'),
    'other': re.compile(r'^\S'),
}


def keyboard_input(element: WebElement, _input: str):
    """模拟人键盘输入. 根据字符类型添加间隔
    :param element: 需要输入的元素
    :param _input: 输入的内容
    """
    # 统计字符与字符类型
    keys = []
    while _input:
        valid = False
        for type_name, pattern in CHAR_MAP.items():
            key = pattern.search(_input)
            if key:
                keys.append((key.group(), type_name))
                _input = _input[key.span()[1]:]
                valid = True
                break
        if not valid:
            raise Exception(
                'Invalid char "{}..." in input'.format(_input[:10]))

    # 遍历 等待 + 输入
    key_type_before = keys[0][1]
    base_typing_interval = 0.2
    for key, key_type in keys:
        element.send_keys(key)
        # 等待
        typing_interval = base_typing_interval
        if key_type_before != key_type:
            # 输入的字符类型变动时，等待时间增加
            typing_interval += 0.4 + random() / 10
        else:
            typing_interval -= 0.1 + random() / 10
        time_sleep(typing_interval)
        key_type_before = key_type


def mouse_move(
        action_chains: ActionChains,
        x_ease_func: Callable, x_distance: int,
        y_ease_func: Callable, y_distance: int,
        frame_amount: int = 50, seconds: int = 2
        ) -> ActionChains:
    """模拟鼠标移动
    :param driver: Webdriver
    :param element: 需要拖動的元素
    :param x_ease_func: x軸緩動函數, 用於生成偏移. 推薦用：selenium_x/script/easing_functions
    :param x_distance: 需要移動的距離
    :param y_ease_func: y軸緩動函數, 用於生成偏移. 推薦用：selenium_x/script/easing_functions
    :param y_distance: 需要移動的距離
    :param frame_amount: 動畫縂幀數
    :param seconds: 花費時間（秒）
    """
    # 計算間隔與偏移
    x_offsets = create_track(x_ease_func, x_distance, frame_amount)
    y_offsets = create_track(y_ease_func, y_distance, frame_amount)
    # 動作記錄
    for x_offset, y_offset in zip(x_offsets, y_offsets):
        action_chains.move_by_offset(x_offset, y_offset)
    # 設置動作間隔 1000 = 1s
    frame_pre_ms = int(seconds/frame_amount * 1000)
    for action in action_chains.w3c_actions.pointer_action.source.actions:
        if action['type'] == 'pointerMove':
            action['duration'] = frame_pre_ms
    return action_chains


def mouse_drag_element(
        driver: webdriver, element: WebElement,
        x_ease_func: Callable, x_distance: int,
        y_ease_func: Callable, y_distance: int,
        frame_amount: int = 50, seconds: int = 2
        ):
    """模拟鼠标拖拽
    :param driver: Webdriver
    :param element: 需要拖動的元素
    :param x_ease_func: x軸緩動函數, 用於生成偏移. 推薦用：selenium_x/script/easing_functions
    :param x_distance: 需要移動的距離
    :param y_ease_func: y軸緩動函數, 用於生成偏移. 推薦用：selenium_x/script/easing_functions
    :param y_distance: 需要移動的距離
    :param frame_amount: 動畫縂幀數
    :param seconds: 花費時間（秒）
    """
    # 計算間隔與偏移
    x_offsets = create_track(x_ease_func, x_distance, frame_amount)
    y_offsets = create_track(y_ease_func, y_distance, frame_amount)
    # 動作記錄
    action_chains = ActionChains(driver)
    action_chains.move_to_element_with_offset(element, 1, 1)
    action_chains.click_and_hold(element)
    for x_offset, y_offset in zip(x_offsets, y_offsets):
        action_chains.move_by_offset(x_offset, y_offset)
    action_chains.release(element)
    # 設置動作間隔 1000 = 1s
    frame_pre_ms = int(seconds/frame_amount * 1000)
    for action in action_chains.w3c_actions.pointer_action.source.actions:
        if action['type'] == 'pointerMove':
            action['duration'] = frame_pre_ms
    # 執行動作
    try:
        action_chains.perform()
    except Exception:
        print('Action Chains has been Interrupted')
