#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   2_BrowserClass.py
@Time    :   2020-8-22 20:20:16
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   浏览器类相关
    官方文档：https://miyakogi.github.io/pyppeteer/reference.html#pyppeteer.page.Page.target
'''

# here put the import lib
import asyncio
from pyppeteer import launch


async def main():
    # 创建浏览器对象
    browser = await launch({
        'headless': False,
        'ignorehttpserrrors': True,
        'viewport': {'width': 1280, 'height': 800},
        'autoClose': True,
        })

    # 创建一个新页面
    page = await browser.newPage()

    # 创建一个无痕模式浏览器内容， 以无痕模式内容浏览东西的话不会报错cookie之类的数据
    # context = await browser.createIncognitoBrowserContext()
    # page = await context.newPage()
    # await page.goto('https://example.com')

    await page.goto('http://www.baidu.com')

    # 获取网页中的所有内容
    c = browser.browserContexts
    print(c)

    # 返回浏览器进程
    c = browser.process
    print(c)

    # 返回浏览器UerAgent
    c = browser.userAgent
    print(c)

    # 从浏览器中获取页面对象
    pages = await browser.pages()
    page = pages[0]

    # 断开连接
    browser.disconnect()

asyncio.get_event_loop().run_until_complete(main())
