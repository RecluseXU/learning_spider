import urllib.request
from fake_useragent import UserAgent

# 此处其实已经并不能得到正常的网页了，原因有很多
# 1. urllib并不能这样直接搞 https 还需要ssl辅助
# 2. 百度有反爬虫，没伪装成浏览器，就莫得。
def load_data():
    url = "https://www.baidu.com"
    ua = UserAgent()

    header = {
        "User-Agent":ua.random,
        "aim":"an offer"
    }

    # 系统的urlopen并没有添加代理的功能，需要我们自定义这个功能
    # 安全 套阶层 sll 第三方的CA数字证书
    # http 80端口 和 https 443端口
    # urlopen为什么可以请求数据 handler处理器
    # 自己的oepner请求数据
    
    # 创建自己的处理器
    my_handler = urllib.request.HTTPHandler()
    # 创建自己的openner
    my_openner = urllib.request.build_opener(my_handler)

    # 用自己创建的openner打开
    response = my_openner.open(url)
    print(response,end="\n\n")
    str_data = response.read().decode("utf-8")
    print(str_data)

    return str_data

data = load_data()
with open("python/urllib/spider_resoult/06.html", "w", encoding='utf-8') as f:
    f.write(data)