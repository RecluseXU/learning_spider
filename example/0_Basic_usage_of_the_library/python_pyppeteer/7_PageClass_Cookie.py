#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   7_PageClass_Cookie.py
@Time    :   2020-8-23 01:33:25
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

    # Page.cookies(*urls) → dict
    # 获取Cookie
    # 如果指定url那就返回那个url的Cookie，没指定就返回当前页面Cookie
    c = await page.cookies()
    print(c)

    # Page.deleteCookie(*cookies)
    # 删除Cookie
    # cookies可以填入的参数
    #   name (str): 必须传入
    #   url (str)
    #   domain (str)
    #   path (str)
    #   secure (bool)
    await page.deleteCookie({'name': 'BAIDUID'})

    # Page.setCookie(*cookies) → None[source]
    # 设置Cookie
    # 可选Cookie的参数：
    #   name (str): required
    #   value (str): required
    #   url (str)
    #   domain (str)
    #   path (str)
    #   expires (number): Unix time in seconds
    #   httpOnly (bool)
    #   secure (bool)
    #   sameSite (str): 'Strict' or 'Lax'


asyncio.get_event_loop().run_until_complete(main())