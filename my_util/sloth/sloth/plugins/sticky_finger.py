# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-13
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   Sticky Finger 代理插件
'''

# here put the import lib
from .plugin import Plugin
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from sloth.wrappers import temp_page


class StickyFingers(Plugin):
    name = 'Sticky Fingers'
    mark = 'sticky_fingers'

    @property
    def base_url(self):
        return f'chrome-extension://{self.id}'

    @temp_page
    def proxy_change(self):
        """使用插件更换浏览器代理
        :param drvier: Webdriver
        """
        self.driver.get(f'{self.base_url}/pages/proxy/change.html')
        wait = WebDriverWait(self.driver, 18, 0.1)
        page_log = (By.ID, 'log')
        while True:
            try:
                wait.until((
                    EC.text_to_be_present_in_element(page_log, '更换代理: 成功')
                    or
                    EC.text_to_be_present_in_element(page_log, '更换代理: 失败')
                ))
                if '更换代理: 成功' in self.driver.page_source:
                    return True
            except TimeoutException:
                self.driver.refresh()

    @temp_page
    def proxy_clear(self):
        """ 清除代理設置, 使用系統代理
        :param drvier: Webdriver
        """
        url = f'{self.base_url}/pages/proxy/clear.html'
        self.driver.get(url)
        wait = WebDriverWait(self.driver, 18, 0.1)
        while True:
            try:
                wait.until(EC.text_to_be_present_in_element(
                    (By.ID, 'log'), '清理代理: 成功'))
                return True
            except TimeoutException:
                self.driver.refresh()

    @temp_page
    def proxy_set(self, proxy_host: str, proxy_port: str,
                  proxy_username: str = None, proxy_password: str = None
                  ) -> bool:
        """设置指定的代理
        :param proxy_host: 代理ip
        :param proxy_port: 代理端口
        :param proxy_username: 代理认证账户名
        :param proxy_password: 代理认证密码
        :return: 代理认证是否成功
        """
        url = f'{self.base_url}/pages/proxy/set.html'
        wait = WebDriverWait(self.driver, 10, 0.2)
        proxy = {
            'host': proxy_host, 'port': proxy_port,
            'user': proxy_username, 'password': proxy_password,
        }
        url += '?' + '&'.join([f'{k}={v}' for k, v in proxy.items()])
        self.driver.get(url)
        wait.until(lambda _: '设置代理' in self.driver.page_source)
        locator = (By.ID, 'log')
        try:
            wait.until(EC.text_to_be_present_in_element(locator, '设置代理: 成功'))
        except TimeoutException:
            return False
        if '设置代理: 成功' in self.driver.page_source:
            return True
        else:
            return False

    def created(self):
        self.proxy_clear()

    def before_destroyed(self):
        pass
