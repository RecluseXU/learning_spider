## 基本信息
目标URL：https://www.amazon.cn/  
<!-- ![](info/../info_res/browser_preview.png) -->
![image](https://i.loli.net/2020/08/18/QOcnhbiEPRGvXu3.png)  

## 描述  
静态网页  
亚马逊中国搜索结果里一共有10页，其中包含了一些商品信息  

## 使用的包/工具/技术
| 步骤       | 包/工具/技术 |
| ---------- | ------------ |
| 网页分析   | Devtools     |
| 爬取网页   | scrapy       |
| 解析网页   | xpath        |
| 数据持久化 | mysql        |

## 问题与对应处理  
### IP访问频率  
懒得弄代理，选择每次爬取后等待一段时间  
### User-Agent限制  
请求头填写自己编写`User-Agent`即可  

## 分析
并没有碰到什么大的困难  
只是在编写xpath的时候有一些阻碍  
~~~
        for _item in response.xpath('//div[@class="a-section a-spacing-medium"]'):
            try:
                good = AmazonItem()
                good['name'] = _item.xpath('./div/h2/a/span/text()').extract()[0]
                good['image'] = _item.xpath('./span/a/div/img/@src').extract()[0]
                good['url'] = 'www.amazon.cn' + _item.xpath('./div/h2/a/@href').extract()[0]

                price = _item.xpath('.//span[@data-a-color="price"]/span[not(@aria-hidden)]/text()')
                mutl_price = _item.xpath('.//div[@class="a-section a-spacing-medium"]//div/span[@class="a-color-price"]')
                good['price'] = price.extract()[0] if price else mutl_price.extract()[0]
                
                good['stars'] = _item.xpath('//div[@class="a-section a-spacing-medium"]/div/div/span/span/a/i/span/text()').extract()[0][:3]
                yield good
            except Exception as e:
                print(e)
                print(good)
        
        next_page = response.xpath('//div[@class="a-section a-spacing-none a-padding-base"]/div/ul/li[@class="a-last"]/a/@href')
~~~


<p style="text-align:right">Recluse<br>2020-7-23 23:12:00 </p>