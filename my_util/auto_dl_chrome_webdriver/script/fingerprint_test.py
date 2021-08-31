# -*- encoding: utf-8 -*-
'''
@Time    :   2021-07-14
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   測試瀏覽器指紋
'''
import os

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.wait import WebDriverWait


desired_capabilities = DesiredCapabilities.CHROME
desired_capabilities["pageLoadStrategy"] = "eager"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
stealth_path = os.path.join(BASE_DIR, 'stealth.min.js')

CHECK_FINGER_PRINT_URLS = [
    'https://pixelscan.net/',
    'https://www.yalala.com/',
    'https://bot.sannysoft.com/',
]
WEBDRIVER_FOLDER = 'venv'


class TaoBaoSpider(object):
    def __init__(self):
        self.init_browser()

    def init_browser(self):
        """ selenium 的 各种option作用（add_experimental_option、add_argument）
        """
        # chrome
        options = webdriver.ChromeOptions()
        # 设置为开发者模式，防止网站识别
        options.add_experimental_option(
            'excludeSwitches', ['enable-automation'])
        # options.add_argument('--proxy-server={0}'.format(random.choice(proxy_list)))
        options.add_experimental_option("useAutomationExtension", False)
        #   就是这一行告诉chrome去掉了webdriver痕迹
        options.add_argument("disable-blink-features=AutomationControlled")
        # options.add_argument('--headless')
        # options.add_argument('--no-sandbox')
        # options.add_argument('--disable-gpu')
        # prefs = {"profile.managed_default_content_settings.images": 2}
        # options.add_experimental_option("prefs", prefs)

        # 加载驱动程序
        drivePath = '{}/chromedriver.exe'.format(WEBDRIVER_FOLDER)
        self.driver = webdriver.Chrome(drivePath, options=options)

        # 加载selenium环境掩盖文件, 1688可以不需要这个
        with open(stealth_path, 'r') as fr:
            stealth_js = fr.read()
        self.driver.execute_cdp_cmd(
            "Page.addScriptToEvaluateOnNewDocument",
            {"source": stealth_js},
        )
        self.wait = WebDriverWait(self.driver, 20)

    def main(self):
        for url in CHECK_FINGER_PRINT_URLS:
            js = 'window.open(\'{}\')'.format(url)
            self.driver.execute_script(js)
        self.wait.until_not(lambda: True)


def main():
    tb_spider = TaoBaoSpider()
    tb_spider.main()


if __name__ == '__main__':
    main()
