import urllib.request

def load_data():
    url = "http://www.baidu.com/"
    # get 请求
    # http 请求
    # response:http响应的对象
    response = urllib.request.urlopen(url)
    print(response)
    # 读取内容 bytes类型
    data = response.read()
    print(data)
    # 将文件获取的内容转换为字符串
    # 一般返回的有两种类型 str和bytes类型
    # str->bytes  encode
    # bytes->str  decode
    str_data = data.decode("utf-8")
    print(str_data)
    
    return str_data

data = load_data()
with open("python/urllib/spider_resoult/01.html", "w") as f:
    f.write(data)