import requests
from lxml import etree
from fake_useragent import UserAgent

ua = UserAgent()
url = 'https://news.baidu.com/'
headers = {
    "User-Agent": ua.random,
}

response = requests.get(url, headers=headers)
data = response.content.decode()

# 要使用,先装lxml   pip install lxml
# 具体怎么样要观察网页结构
# 转解析类型
xpath_data = etree.HTML(data)
# 调用 xpath的方法
#   节点/
result = xpath_data.xpath('/html/head/title/text()')
print(result)
#   跨节点//
result = xpath_data.xpath('//a/text()')
print("\n\n", result)
#   精确标签[@属性="属性值"]
result = xpath_data.xpath('//a[@mon="ct=1&a=1&c=top&pn=0"]/text()')
print("\n\n", result)
#   下标[?],通过下标可以选择第?个项
#       需要注意的是，这个东西与//一同使用的时候，需要注意结果。
#       第一个项序号并不是0, 而是1
result = xpath_data.xpath('/html/body/div[1]/ul/li[3]/a/text()')
print("\n\n", result)

if(data is not None):
    location = "requests/spider_resoult/13.html"
    with open(location, "w", encoding='utf-8') as f:
        f.write(data)
