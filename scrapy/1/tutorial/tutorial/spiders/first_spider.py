import scrapy
from tutorial.items import TutorialItem
'''
Spider是用户编写用于从单个网站(或者一些网站)爬取数据的类。

其包含了一个用于下载的初始URL，如何跟进网页中的链接以及如何分析页面中的内容， 提取生成 item 的方法。

为了创建一个Spider，您必须继承 scrapy.Spider 类， 且定义一些属性:

    name: 用于区别Spider。 该名字必须是唯一的，您不可以为不同的Spider设定相同的名字。
    start_urls: 包含了Spider在启动时进行爬取的url列表。 因此，第一个被获取到的页面将是其中之一。 后续的URL则从初始的URL获取到的数据中提取。
    parse() 是spider的一个方法。 被调用时，每个初始URL完成下载后生成的 Response 对象将会作为唯一的参数传递给该函数。 该方法负责解析返回的数据(response data)，提取数据(生成item)以及生成需要进一步处理的URL的 Request 对象。

'''


class BingSpider(scrapy.Spider):
    name = "first"
    allowed_domains = ["bing.com"]
    start_urls = [
        "https://cn.bing.com/",
    ]

    def parse(self, response):
        item = TutorialItem()
        item["identification"] = response.xpath('//*[@id="b_footerItems"]//text()').extract()
        item["name"] = response.xpath('//*[@id="sbox"]//text()').extract()
        
        # print(next_page)
        yield item

