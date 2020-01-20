import urllib.request
from fake_useragent import UserAgent

def load_data():
    url = "https://www.baidu.com"

    # 添加代理 
    #   '协议' ：'ip:端口号'
    #   建议弄多几个，每一个单独的代理设置一定的访问间隔
    my_proxy = [
        # 对于免费的代理，直接写就完事。
        {"https":"60.211.218.78:53281"},
        {"https":"27.191.234.69:9999"},
        {"https":"218.60.8.99:3129"},
        # 对于那些付费的代理，可能会带有账户和密码
        # '协议'：'用户名：密码@ip'
        {"https":"username:password@111.111.111.111:端口"}
    ]
    
    # 系统的urlopen()不支持代理的添加
    # 所以要自己创建处理器(Handler)
    # 代理处理器
    for proxy in my_proxy:
        my_handler = urllib.request.ProxyHandler(proxy)
        my_openner = urllib.request.build_opener(my_handler)
        try:
            # 使用代理注意可能代理无效导致错误发生 或者 代理无视了你（设置超时时间）
            response = my_openner.open(url,timeout=1)
        except Exception as exc:
            print(exc)
            continue
        print(response,end="\n\n")
        str_data = response.read().decode("utf-8")
        print(str_data)

        return str_data

data = load_data()
if(data is not None):
    with open("python/urllib/spider_resoult/07.html", "w", encoding='utf-8') as f:
        f.write(data)