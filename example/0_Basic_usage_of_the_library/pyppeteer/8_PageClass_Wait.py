#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   8_PageClass_Wait.py
@Time    :   2020-8-24 12:38:10
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

    # Page.waitFor(selectorOrFunctionOrTimeout: Union[str, int, float], options: dict = None, *args, **kwargs) → Awaitable[T_co]
    # 等待函数执行，超时，元素出现。
    # 这个函数的作用会因为第一个参数传入不同的内容而不同
    #   如果selectorOrFunctionOrTimeout是number (int或float)，那么它将被视为超时(以毫秒为单位)，并返回在超时后执行的future。
    #   如果selectorOrFunctionOrTimeout是一个JavaScript函数字符串，那么这个方法是waitForFunction()的快捷方式。
    #   如果selectorOrFunctionOrTimeout是选择器字符串或xpath字符串，则此方法是waitForSelector（）或waitForXPath（）的快捷方式。 如果字符串以//开头，则将该字符串视为xpath。
    # Pyppeteer尝试自动检测功能或选择器，但有时会漏检。
    # 如果不能按预期工作，请直接使用waitForFunction（）或waitForSelector（）。
    # 参数：
    #   selectorOrFunctionOrTimeout – 选择器, xpath, 函数名 或者时间数字（毫秒）.
    #   args (Any) – 传递给函数的参数
    # 返回值:
    #   Return awaitable object which resolves to a JSHandle of the success value.


    # Page.waitForFunction(pageFunction: str, options: dict = None, *args, **kwargs) → Awaitable[T_co]
    # 等待，直到函数完成并返回一个值
    # Parameters:	args (Any) – 传递给 pageFunction 的参数.
    # Returns:	Return awaitable object which resolves when the pageFunction returns a truthy value. It resolves to a JSHandle of the truthy value.
    # 可选参数:
    #   polling (str|number): pageFunction 执行间隔, 默认是 raf. 如果参数传入一个数字，那么它将被视为函数执行的毫秒间隔
    #       raf: 不断执行requestAnimationFrame回调中的pageFunction. This is the tightest polling mode which is suitable to observe styling changes.
    #       mutation: 在每次DOM更变的时候执行 pageFunction
    #   timeout (int|float): 最大等待时间 毫秒. 默认为 30000 (30 seconds). 传入0可以禁用此项.

    # Page.waitForNavigation(options: dict = None, **kwargs) → Optional[pyppeteer.network_manager.Response]
    # 等待 导航navigation
    # 参数和goto()相同
    # 当页面导航到新URL或重新加载时，这将返回Response
    # 运行将间接导致页面导航的代码时，它很有用
    navigationPromise = page.waitForNavigation()
    await page.click('#bottom_layer > div.s-bottom-layer-left > p:nth-child(5) > a')
    await navigationPromise  # 等待，直到导航结束

    # Page.waitForRequest(urlOrPredicate: Union[str, Callable[[pyppeteer.network_manager.Request], bool]], options: Dict[KT, VT] = None, **kwargs) → pyppeteer.network_manager.Request
    # 等待Request
    # 参数:	
    #   urlOrPredicate – 等待的url
    #   选项:
    #       timeout (int|float): 最大等待时间, 默认为 30 秒, 传入0禁用此项.
    await page.waitForRequest('http://www.baidu.com')
    await page.waitForRequest(lambda req: req.url == 'http://www.baidu.com' and req.method == 'GET')

    # Page.waitForResponse(urlOrPredicate: Union[str, Callable[[pyppeteer.network_manager.Response], bool]], options: Dict[KT, VT] = None, **kwargs) → pyppeteer.network_manager.Response
    # 等待Response
    # 参数同Page.waitForRequest

    # Page.waitForSelector(selector: str, options: dict = None, **kwargs) → Awaitable[T_co]
    # 等待与选择器匹配的元素出现，要是页面已经有了匹配的元素，那么会立即返回
    # Returns:	Return awaitable object which resolves when element specified by selector string is added to DOM.
    # 参数:	
    #   selector (str) – 选择器
    #   可选项：
    #       visible (bool):等待元素在DOM中出现，并且可见; i.e. to not have display: none or visibility: hidden CSS properties. Defaults to False.
    #       hidden (bool): 等待元素在DOM中出现，隐藏的都算, i.e. have display: none or visibility: hidden CSS properties. Defaults to False.
    #       timeout (int|float): 最大等待时间（毫秒）.默认为30000 (30 秒). 传递0禁用此项.

    # Page.waitForXPath(xpath: str, options: dict = None, **kwargs) → Awaitable[T_co]
    # 等待与xpath匹配的元素出现，要是页面已经有了匹配的元素，那么会立即返回
    # 参数同 Page.waitForSelector

asyncio.get_event_loop().run_until_complete(main())
