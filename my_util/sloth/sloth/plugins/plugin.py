# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-14
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   基础类
'''

# here put the import lib
from selenium.webdriver.chrome.webdriver import WebDriver
import abc


class Plugin(metaclass=abc.ABCMeta):
    name: str  # 插件名称, 必填, 用于匹配寻找id
    mark: str  # 插件标识, 必填, 用于设置属性

    def __init__(self, driver: WebDriver, id: str, path: str) -> None:
        """初始化
        :param driver: Webdriver
        :param id: 插件id
        :param name: 插件名称
        :param path: 插件本地路径
        """
        self.id = id
        self.path = path
        self.driver = driver

    @abc.abstractmethod
    def created(self):
        """插件对象创建后执行一些操作
        """
        pass

    @abc.abstractmethod
    def before_destroyed(self):
        """浏览器关闭前执行一些操作
        """
        pass
