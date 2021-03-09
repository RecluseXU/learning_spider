#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   00_start.py
@Time    :   2020/02/23 16:05:23
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@License :   (C)Copyright 2017-2022, Recluse
@Desc    :   selenium是一个自动化测试工具，可以用来作很多事情 
'''

# here put the import lib
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from os import path

driver_path = '{}/BrowserDriver/chromedriver.exe'.format(path.dirname(__file__))

# 创建一个Firefox WebDriver的实例
driver = webdriver.Chrome(executable_path=driver_path)
# driver.get 方法将打开URL中填写的地址
# WebDriver 将等待，直到页面完全加载完毕（其实是等到”onload” 方法执行完毕）
# 然后返回继续执行你的脚本。
# 值得注意的是，如果你的页面使用了大量的Ajax加载， WebDriver可能不知道什么时候页面已经完全加载:
driver.get("http://www.python.org")
# 下一行是用assert的方式确认标题是否包含“Python”一词。
#  (译注：assert 语句将会在之后的语句返回false后抛出异常，详细内容可以自行百度)
print("Python" in driver.title)
# WebDriver 提供了大量的方法让你去查询页面中的元素，这些方法形如： find_element_by_*。 
# 例如：包含 name 属性的input输入框可以通过 find_element_by_name 方法查找到
# 详细的查找方法可以在第四节元素查找中查看:
elem = driver.find_element_by_name("q")
# 接下来，我们发送了一个关键字，这个方法的作用类似于你用键盘输入关键字。
# 特殊的按键可以使用Keys类来输入，该类继承自 selenium.webdriver.common.keys为了安全起见，我们先清除input输入框中的任何预填充的文本（例如：”Search”）,从而避免我们的搜索结果受影响：
elem.clear()
elem.send_keys("pycon")
elem.send_keys(Keys.RETURN)
# 提交页面后,你会得到所有的结果。为了确保某些特定的结果被找到，使用`assert`如下:
print("No results found." not in driver.page_source)
# 最后，关闭浏览器窗口
# 你还可以使用quit方法代替close方法
# quit将关闭整个浏览器，而_close——只会关闭一个标签页
# 如果你只打开了一个标签页，大多数浏览器的默认行为是关闭浏览器:
driver.close()
