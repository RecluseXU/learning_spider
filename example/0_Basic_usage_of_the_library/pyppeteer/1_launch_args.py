#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   1_launch_args.py
@Time    :   2020/08/22 19:31:40
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
    官方文档：https://miyakogi.github.io/pyppeteer/reference.html#pyppeteer.page.Page.target
'''

# here put the import lib
import asyncio
from pyppeteer import launch


async def main():
    # 创建浏览器对象
    browser = await launch({
        # 无头模式
        'headless': False,
        # 忽略https错误，默认false
        'ignorehttpserrrors': True,
        # 界面大小
        'viewport': {'width': 1280, 'height': 800},
        # 脚本执行完后是否自动关闭浏览器
        'autoClose': True,
        # Chromium 或者 Chrome 的路径,如果填入的话，就不用默认的 Chromium
        # 'executablePath': ''
        # 用户数据目录的路径
        # 'userDataDir': 'example/0_Basic_usage_of_the_library/pyppeteer/',
        # 打印日志的日志级别。默认与根记录器
        # 'log level': ''
        })

    page = await browser.newPage()
    await page.goto('http://www.baidu.com')
    await page.screenshot({'path': 'example/0_Basic_usage_of_the_library/pyppeteer/baidu.png'})
    await browser.close()

asyncio.get_event_loop().run_until_complete(main())
