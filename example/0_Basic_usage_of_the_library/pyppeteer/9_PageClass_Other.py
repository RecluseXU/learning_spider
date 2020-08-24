#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   9_PageClass_Other.py
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

    # Page.addScriptTag(options: Dict[KT, VT] = None, **kwargs) → pyppeteer.element_handle.ElementHandle
    # 给页面添加一个script标签，可以写入一些东西
    # url, path, content三个参数中必须选一个填入
    # 会返回已经被添加好的 ElementHandle 实例
    # 参数：
    #   url (string): URL of a script to add.
    #   path (string): Path to the local JavaScript file to add.
    #   content (string): JavaScript string to add.
    #   type (string): Script type. Use module in order to load a JavaScript ES6 module
    await page.addScriptTag({
        "content": "console.log('Hello addScriptTag')"
    })

    # Page.addStyleTag(options: Dict[KT, VT] = None, **kwargs) → pyppeteer.element_handle.ElementHandle
    # 给页面添加一个style标签，可以写入一些东西
    # url, path, content三个参数中必须选一个填入
    # 参数：
    #   url (string): URL of the link tag to add.
    #   path (string): Path to the local CSS file to add.
    #   content (string): CSS string to add.
    await page.addScriptTag({
        "url": "https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.0.0-alpha1/css/bootstrap.css"
    })

    # Page.bringToFront 将页面置于最前（激活选项卡）
    await page.bringToFront()

    # Page.click(selector: str, options: dict = None, **kwargs)
    # 此方法使用选择器获取元素，如果需要，将其滚动到视图中，然后使用鼠标在元素的中心单击
    # 如果没有元素匹配选择器，该方法将引发PageError
    # 参数
    #   button (str): left, right, or middle, defaults to left.
    #   clickCount (int): defaults to 1.
    #   delay (int|float): Time to wait between mousedown and mouseup in milliseconds. defaults to 0.
    await page.click('#su')


    #  Page.setUserAgent(userAgent: str)
    #  设置UserAgent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')

    # Page.setViewport(viewport: dict)
    # 设置Viewport
    # 可填入选项：
    #   width (int): page width in pixel.
    #   height (int): page height in pixel.
    #   deviceScaleFactor (float): Default to 1.0.
    #   isMobile (bool): Default to False.
    #   hasTouch (bool): Default to False.
    #   isLandscape (bool): Default to False.
    await page.setViewport({
        'width': 1024,
        'height': 1024,
    })

    # Page.emulateMedia(mediaType: str = None)
    # 设置CSS  media type
    # 你可以填入 'screen', 'print', None 中的一个
    await page.emulateMedia('screen')


    # Page.exposeFunction(name: str, pyppeteerFunction: Callable[[…], Any])
    # 将一个Python函数绑定到浏览器window对象中，可以在使用过程中调用
    # 参数：
    #   name (string) – Name of the function on the window object.
    #   pyppeteerFunction (Callable) – Function which will be called on python process. This function should not be asynchronous function.

    # Page.focus(selector: str)
    # 为选择器匹配的元素设置焦点
    # 若没有元素被匹配，则报错
    await page.focus('#kw')


    # Page.goBack(options: dict = None, **kwargs) → Optional[pyppeteer.network_manager.Response]
    # 页面回退，基于Page访问记录，如果不能回退，则会返回None
    # 参数与goto()一致
    await page.goBack()

    # goForward(options: dict = None, **kwargs) → Optional[pyppeteer.network_manager.Response]
    # 页面前进，基于Page访问记录，如果不能回退，则会返回None
    # 参数与goto()一致
    await page.goForward()


    # goto(url: str, options: dict = None, **kwargs) → Optional[pyppeteer.network_manager.Response]
    # 页面访问url
    # 参数：
    #   timeout (int): 最大请求时间,默认为 30 秒, 传入0可以禁用此项. 此默认值可以通过 setDefaultNavigationTimeout()方法 来设置.
    #   waitUntil (str|List[str]): 什么时候认为请求已经成功了, 默认是load项. 可选项目：
    #       load: 当 load 事件被触发
    #       domcontentloaded: 当 DOMContentLoaded 事件被触发
    #       networkidle0: 500ms内没有正在连接的网络请求
    #       networkidle2: 500ms内正在连接的网络请求不超过两个
    # 可能引发的错误
    #   url无效
    #   请求超时
    #   资源读取失败
    await page.goto('https://www.baidu.com/')

    # hover(selector: str)
    # 鼠标悬停在选择器匹配的元素上
    # 若没有元素被匹配，则报错
    await page.hover('#su')



    # metrics() → Dict[str, Any]
    # 返回页面 metrics 信息
    # 信息批注
    #   Timestamp (number): The timestamp when the metrics sample was taken.
    #   Documents (int): Number of documents in the page.
    #   Frames (int): Number of frames in the page.
    #   JSEventListeners (int): Number of events in the page.
    #   Nodes (int): Number of DOM nodes in the page.
    #   LayoutCount (int): Total number of full partial page layout.
    #   RecalcStyleCount (int): Total number of page style recalculations.
    #   LayoutDuration (int): Combined duration of page duration.
    #   RecalcStyleDuration (int): Combined duration of all page style recalculations.
    #   ScriptDuration (int): Combined duration of JavaScript execution.
    #   TaskDuration (int): Combined duration of all tasks performed by the browser.
    #   JSHeapUsedSize (float): Used JavaScript heap size.
    #   JSHeapTotalSize (float): Total JavaScript heap size.
    c = await page.metrics()
    print(c)

    # Page.reload(options: dict = None, **kwargs) → Optional[pyppeteer.network_manager.Response]
    # 刷新这个页面
    # 参数与goto()一致
    await page.reload()

    # Page.screenshot(options: dict = None, **kwargs) → Union[bytes, str]
    # 给网页弄一张截图
    # 参数：
    #   path (str): The file path to save the image to. The screenshot type will be inferred from the file extension.
    #   type (str): Specify screenshot type, can be either jpeg or png. Defaults to png.
    #   quality (int): The quality of the image, between 0-100. Not applicable to png image.
    #   fullPage (bool): When true, take a screenshot of the full scrollable page. Defaults to False.
    #   clip (dict): An object which specifies clipping region of the page. This option should have the following fields:
    #   x (int): x-coordinate of top-left corner of clip area.
    #   y (int): y-coordinate of top-left corner of clip area.
    #   width (int): width of clipping area.
    #   height (int): height of clipping area.
    #   omitBackground (bool): Hide default white background and allow capturing screenshot with transparency.
    #   encoding (str): The encoding of the image, can be either 'base64' or 'binary'. Defaults to 'binary'.
    await page.screenshot({'path': 'example/0_Basic_usage_of_the_library/pyppeteer/baidu.png'})

    # Page.select(selector: str, *values) → List[str]
    # 选择 options 并返回被选的值
    # 若没有元素被匹配，则报错

    # Page.setBypassCSP(enabled: bool) → None
    # 设置Content-Security-Policy

    # Page.setCacheEnabled(enabled: bool = True) → None
    # 是否启用Cache

    # Page.setContent(html: str) → None
    # 设置网页HTML内容

    # Page.setJavaScriptEnabled(enabled: bool)
    # 设置js是否启用

    # Page.setOfflineMode(enabled: bool) 
    # 设置是否启用离线模式


    # Page.setRequestInterception(value: bool) 
    # 启用/禁用请求拦截。
    # 激活请求拦截可以启用请求类的abort（），continue_（）和response（）方法。 这提供了修改页面发出的网络请求的功能。

    # Page.tap(selector: str)
    # Tap选择器匹配的元素
    # 若没有元素被匹配，则报错

    # Page.xpath(expression: str) → List[pyppeteer.element_handle.ElementHandle][source]
    # 返回匹配xpath的元素 list
    # 要是没有匹配项则返回空的list


    # Page.type(selector: str, text: str, options: dict = None, **kwargs)
    # 在指定元素中输入内容
    # 若没有元素被匹配，则报错




    # Page.close()
    # 关闭page
    await page.close()


asyncio.get_event_loop().run_until_complete(main())
