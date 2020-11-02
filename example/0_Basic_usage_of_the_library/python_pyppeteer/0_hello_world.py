#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   0_hello_world.py
@Time    :   2020/08/22 19:01:03
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   pyppeteer Hello world 在第一次运行这个程序的时候，pyppeteer会从网上自己下载Chromium
    官方文档：https://miyakogi.github.io/pyppeteer/reference.html#pyppeteer.page.Page.target
'''

# here put the import lib
import asyncio
from pyppeteer import launch


async def main():
    # 创建浏览器对象
    browser = await launch({'headless': False})
    # 打开一个页面
    page = await browser.newPage()
    # 页面访问一个连接
    await page.goto('http://www.baidu.com')
    # 给网页弄个截图
    await page.screenshot({'path': 'example/0_Basic_usage_of_the_library/pyppeteer/baidu.png'})
    # 关闭浏览器
    await browser.close()

asyncio.get_event_loop().run_until_complete(main())
