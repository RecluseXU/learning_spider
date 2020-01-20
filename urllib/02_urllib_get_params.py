import urllib.request
import urllib.parse
import string

# 此处其实已经并不能得到正常的网页了，原因有很多
# 1. urllib并不能这样直接搞 https 还需要ssl辅助
# 2. 百度有反爬虫，没伪装成浏览器，就莫得。
def load_data():
    url = "http://www.baidu.com/s?wd="
    para = "找工作"
 
    final_url = url+para
    print(final_url)

    # 由于网址中包含了汉字，而ascii码中并不包含汉字。所以要转译
    encode_new_url = urllib.parse.quote(final_url, safe=string.printable)
    print(encode_new_url)

    response = urllib.request.urlopen(encode_new_url)
    data = response.read()
    print(data)

    str_data = data.decode("utf-8")
    print(str_data)
    return str_data

data = load_data()
with open("python/urllib/spider_resoult/02.html", "w") as f:
    f.write(data)