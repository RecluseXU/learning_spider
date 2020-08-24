#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   6_PageClass_JS.py
@Time    :   2020-8-23 01:11:00
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

    # Page.evaluate(pageFunction: str, *args, force_expr: bool = False) → Any
    # 执行js代码，并返回结果
    # 参数
    #   pageFunction (str) – js代码
    #   force_expr (bool) – If True, evaluate pageFunction as expression. If False (default), try to automatically detect function or expression.
    c = await page.evaluate('function a(){return {"Hello":"Page.evaluate"};}')
    print(c)

    # Page.evaluateHandle(pageFunction: str, *args) → pyppeteer.execution_context.JSHandle
    # 在页面上执行一个js代码,返回一个JSHandle对象
    c = await page.evaluateHandle('document.getElementById("bottom_layer");')
    print(c)


asyncio.get_event_loop().run_until_complete(main())
