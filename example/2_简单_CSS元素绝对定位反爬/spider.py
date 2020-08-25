#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   spider.py
@Time    :   2020/08/25 14:32:31
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
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

    # 访问网页
    await page.goto('http://learnspider.evilrecluse.top:5001/LearningSpider')

    # 等待，点击，切换到目标页
    _button = await page.waitForSelector('#css_element_coordinates')
    await _button.click()

    # 等待价格元素出现
    elList = await page.waitForXPath('//*[@id="page-inner"]/div[1]/div/div/div[2]')
    elList = await elList.xpath('//*[@id="page-inner"]/div[1]/div/div/div[2]/div/div/div')

    result = []
    for el_re in elList:
        # 拿出标题做记录
        title = await (await (await el_re.xpath('./p[1]'))[0].getProperty('textContent')).jsonValue()
        culDict = {}
        for b in await el_re.xpath('./p[2]/em/b'):  # 遍历价格中的数字标签
            # 获取数字
            num = await (await b.getProperty('textContent')).jsonValue()
            if num == '¥':
                continue
            # 获取绝对定位的偏移值
            offset = await (await (await b.getProperty('style')).getProperty('left')).jsonValue()
            culDict[offset[:-2]] = num
        # print(culDict)
        price = '¥' + ''.join(map(lambda x: x[1], sorted(culDict.items(), key=lambda x: x[0])))
        # print(price)
        result.append({title: price})
    print(result)


asyncio.get_event_loop().run_until_complete(main())
