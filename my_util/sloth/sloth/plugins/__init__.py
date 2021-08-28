# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-13
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   插件相关
'''

# here put the import lib
import os
from .plugin import Plugin
from typing import Dict, List
import json
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from .sticky_finger import StickyFingers
from sloth.wrappers import temp_page
import re


BASE_PATH = os.path.dirname(os.path.dirname(__file__))
PLUGINS_CLASS: List[Plugin] = [
    StickyFingers,
]


class Plugins:
    @staticmethod
    def load_local_plugins() -> List[Dict]:
        """获取本地可用插件信息
        :return: 基本插件信息, static/plugins 下的插件信息 与 对应类信息
        """
        # 会用于创建对象的类
        plugins_map = {
            plugin_class.name: plugin_class for plugin_class in PLUGINS_CLASS
        }
        plugins = []
        exts_folder_path = os.path.join(BASE_PATH, 'static/plugins')
        for ext_folder_name in os.listdir(exts_folder_path):
            ext_folder_path = os.path.join(exts_folder_path, ext_folder_name)
            mainfest_path = os.path.join(ext_folder_path, 'manifest.json')
            if not os.path.exists(mainfest_path):
                continue
            with open(mainfest_path, 'r', encoding='utf-8') as fp:
                name = json.loads(fp.read())['name']
                if name not in plugins_map:
                    print(f'未编写类处理插件{name}')
                    continue
                plugins.append({
                    'name': name,
                    'path': ext_folder_path,
                    'class': plugins_map[name],
                })
        return plugins

    @staticmethod
    @temp_page
    def load_plugins_id(driver: WebDriver, plugins_note: List[Dict[str, str]]):
        """获取插件id
        :param driver: webdriver
        :param plugins_note: 从 search_plugins 方法中获取到的插件基本信息
        :return: 添加id 信息后的插件基本信息
        """
        driver.get('chrome://system')
        WebDriverWait(driver, 20, poll_frequency=0.2).until(
            EC.presence_of_element_located((By.ID, 'extensions-value'))
        )
        html = driver.page_source
        pattern = r'(?<=id="extensions-value">)[\S\s]+?(?=</div)'
        plugins_mark = re.search(pattern, html).group().split('\n')
        plugins_mark = filter(lambda x: x, plugins_mark)
        plugins_mark = [mark.split(' : ')[:2] for mark in plugins_mark]
        # 统合数据
        for id, name in plugins_mark:
            for plugin_note in plugins_note:
                if plugin_note['name'] == name:
                    plugin_note['id'] = id
                    break
        return plugins_note

    @staticmethod
    def create_plugins_instance(
            driver: WebDriver, plugins_note: List[Dict[str, str]]):
        """ 创建插件对象
        :param driver: 记录了代理信息的webdriver
        """
        for note in plugins_note:
            plugin_class = note['class']
            plugin_instance = plugin_class(
                driver=driver, id=note['id'], path=note['path'],
            )
            plugin_instance.created()
            setattr(driver, plugin_class.mark, plugin_instance)
