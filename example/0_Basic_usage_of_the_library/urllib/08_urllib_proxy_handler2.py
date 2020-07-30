import urllib.request
from fake_useragent import UserAgent

def load_data():
    url = "https://www.baidu.com"
    # 对于那些付费的代理，可能会带有账户和密码
    # type1:
    # my_proxy = [
    #     # 对于那些付费的代理，可能会带有账户和密码
    #     # '协议'：'用户名：密码@ip'
    #     {"https":"username:password@111.111.111.111:11111"}
    # ]
    # type2: 更常用,速度更快
    user_name = "user_name"
    password = "123123123"
    proxy_money = "111.111.111.111:11111"
    # 创建密码管理器
    password_manager = urllib.request.HTTPPasswordMgrWithDefaultRealm()
    # uri资源定位符 uri>url 
    password_manager.add_password(None,proxy_money, user_name, password)
    # 创建可以验证代理ip的处理器
    handle_auth_proxy = urllib.request.ProxyBasicAuthHandler(password_manager)
    # 创建opener
    opener_auth = urllib.request.build_opener(handle_auth_proxy)

    try:
        response = opener_auth.open(url)
    except Exception as exc:
        print(exc)

    print(response,end="\n\n")
    str_data = response.read().decode("utf-8")
    print(str_data)

    return str_data

data = load_data()
if(data is not None):
    with open("python/urllib/spider_resoult/07.html", "w", encoding='utf-8') as f:
        f.write(data)