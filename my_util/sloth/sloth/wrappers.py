# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-15
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   辅助装饰器
'''

# here put the import lib
# from uuid import uuid1
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.webdriver import WebDriver


def temp_page(func):
    """ 插件設置頁訪問，訪問完畢后返回原頁面，需要全局锁定，否则可能不正确
    """
    def wrap_func(*args, **kwargs):
        driver = None
        for arg in args:
            if isinstance(arg, object) and hasattr(arg, 'driver'):
                driver = arg.driver
            if isinstance(arg, WebDriver):
                driver = arg
                break
        if driver is None:
            if 'driver' in kwargs:
                driver = kwargs['driver']
            if 'self' in kwargs and kwargs['self'].driver:
                driver = kwargs['self'].driver
            else:
                print('without driver')

        # 记录原页ID以便返回
        origin_window_id = driver.current_window_handle
        # 新开页访问
        # key = uuid1().hex
        actived_windows = set(driver.window_handles)
        driver.execute_script('window.open("about:blank");')
        new_window_id = WebDriverWait(driver, 10, 0.1).until(
            lambda _: set(driver.window_handles).difference(actived_windows)
        )
        driver.switch_to_window(new_window_id.pop())
        # WebDriverWait(driver, 10, 0.2).until(EC.url_contains(key))
        # 处理内容
        result = func(*args, **kwargs)
        # 关闭页面，返回原页
        driver.close()
        driver.switch_to_window(origin_window_id)
        return result
    return wrap_func
