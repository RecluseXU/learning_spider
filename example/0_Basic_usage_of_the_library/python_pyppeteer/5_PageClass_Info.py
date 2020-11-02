#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   5_PageClass_Operations.py
@Time    :   2020-8-22 23:03:54
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

    # Page.url
    # 返回页面url
    c = page.url
    print(c)

    # Page.viewport
    # 得到页面viewport信息
    c = page.viewport
    print(c)

    # Page.title()
    # 返回页面标题
    c = await page.title()
    print(c)

    # Page.touchscreen
    # 返回页面Touchscreen对象
    c = page.touchscreen
    print(c)

    # Page.tracing
    # 返回页面追踪对象
    c = page.tracing
    print(c)

    # Page.mouse
    # 得到页面的 Mouse 对象
    c = page.mouse
    print(c)

    # isClosed() → bool[source]
    # 页面是否已经关闭
    c = page.isClosed()
    print(c)

    # keyboard
    # 得到页面的 keyboard 对象
    c = page.keyboard
    print(c)

    # mainFrame
    # 得到页面的 Frame 对象
    c = page.mainFrame
    print(c)

    # Page.content() → str
    # 返回页面html
    c = await page.content()
    print(c)


asyncio.get_event_loop().run_until_complete(main())