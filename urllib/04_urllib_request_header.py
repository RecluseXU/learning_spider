import urllib.request

# 此处其实已经并不能得到正常的网页了，原因有很多
# 1. urllib并不能这样直接搞 https 还需要ssl辅助
# 2. 百度有反爬虫，没伪装成浏览器，就莫得。
def load_data():
    url = "https://www.baidu.com"

    header = {
        # 浏览器，用户信息
        # 此处通过fake-useragent获取一个随机的，合理的User-Agent
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0",
        "aim":"an offer"
    }

    # type1
    request = urllib.request.Request(url, headers=header)
    # type2
    # # 创建请求对象
    # request = urllib.request.Request(url)
    # # 为请求对象添加header信息
    # request.add_header("User-Agent",ua.random)

    # 请求网络数据
    response = urllib.request.urlopen(request)
    print(response,end="\n\n")
    str_data = response.read().decode("utf-8")

    # 获取整个请求头的信息
    _request_headers = request.headers
    print(_request_headers,end="\n\n")
    # 获取请求头的某个信息
    # 注意点：首字母大写，其他字母小写
    _useragent = request.get_header("User-agent")
    print(_useragent,end="\n\n")
    return str_data

data = load_data()
with open("python/urllib/spider_resoult/04.html", "w", encoding='utf-8') as f:
    f.write(data)