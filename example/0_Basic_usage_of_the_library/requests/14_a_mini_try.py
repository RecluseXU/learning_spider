import requests
from lxml import etree


class Spider_3DM_biss(object):
    def __init__(self, pages_number):
        self._index_page_url = "https://bbs.3dmgame.com/forum-2544-!PAGE_NUM!.html"
        self.page_number = 1
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        }

    def get_page_url(self):
        return self._index_page_url.replace("!PAGE_NUM!", str(self.page_number))

    def run(self):
        response = requests.get(self.get_page_url(), headers=self.headers)
        data = response.content.decode()

        xpath_data = etree.HTML(data)

        result = xpath_data.xpath('//a[@class="s xst"]/text()')
        print(result)

    if(data is not None):
        location = "requests/spider_resoult/14.html"
        with open(location, "w", encoding='utf-8') as f:
            f.write(data)
