#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   4_PageClass_Selector.py
@Time    :   2020-8-22 20:20:16
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   页面类 Page Class
    官方文档：https://miyakogi.github.io/pyppeteer/reference.html#pyppeteer.page.Page.target
Page类提供了与标签交互的方法，一个浏览器可以有多个Page对象

'''

# here put the import lib
import asyncio
from pyppeteer import launch


async def main():
    browser = await launch({
        'headless': False,
        'ignorehttpserrrors': True,
        'viewport': {'width': 1280, 'height': 800},
        'autoClose': True,
        })

    page = await browser.newPage()
    await page.goto('http://www.baidu.com')

    # Page.J(selector: str) 或者 Page.uerySelector() 
    # 方法可以通过 选择器 获取一个元素
    # 如果方法找到与选择器匹配的元素，则返回其ElementHandle实例。如果没有找到，返回None。
    c = await page.J("#s_lg_img")
    print(c)

    # Page.JJ(selector: str) 或者 Page.querySelectorAll()
    # 方法可以通过 选择器 获取一些元素
    c = await page.JJ(".c-color-gray2")
    print(c)

    # Page.Jeval(selector: str, pageFunction: str, *args) 或者 Page.querySelectorEval()
    # 方法可以通过 选择器 获取 一个元素 ，并且将元素作为参数，传入到pageFunction中执行一些代码
    # 如果这个函数没有找到匹配的元素，会报错
    # 参数:
    # selector 选择器字符串
    # pageFunction (str) javascript回调函数，在找到元素一些以后，元素会以数组的形式当做一个参数传入到定义的回调函数中
    # args (Any) – 可以传给pageFunction的参数
    c = await page.Jeval("#s_lg_img", "function zxc(a){return 'Found Element :' + a}")
    print(c)

    # Page.JJeval(selector: str, pageFunction: str, *args) 或者 Page.querySelectorAllEval()
    # 方法可以通过 选择器 获取 一些元素 ，并且将元素作为参数，传入到pageFunction中执行一些代码
    # 如果这个函数没有找到匹配的元素，会报错
    # 参数同上
    c = await page.JJeval(".c-color-gray2", "function zxc(a){return 'Found Element :' + a}")
    print(c)

    # Page.Jx(expression: str) 或者 xpath()
    # 传入xpath表达式，返回结果为list
    c = await page.xpath('//*[@id="s_lg_img"]')
    print(c)


asyncio.get_event_loop().run_until_complete(main())
