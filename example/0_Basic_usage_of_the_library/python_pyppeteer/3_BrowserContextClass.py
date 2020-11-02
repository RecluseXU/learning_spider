#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   3_BrowserContextClass.py
@Time    :   2020-8-22 20:20:16
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   浏览器内容类相关 BrowserContext Class
    官方文档：https://miyakogi.github.io/pyppeteer/reference.html#pyppeteer.page.Page.target
BrowserContext 类 提供了多个独立的浏览器会话  
当浏览器启动，浏览器会创建一个默认的 BrowserContext实例，这个实例中包含了一个默认的page
如果一个 BrowserContext实例 通过window.open打开了新的BrowserContext实例，那么新实例会附属于旧实例
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

    context = browser.browserContexts[0]

    # 返回BrowserContext实例的浏览器
    c = context.browser
    print(c)

    # 返回BrowserContext中所有激活的target
    c = context.targets()
    print(c)

    # 关闭BrowserContext实例，属于其下的子BrowserContext实例也会被一并关闭
    context.close()


asyncio.get_event_loop().run_until_complete(main())
