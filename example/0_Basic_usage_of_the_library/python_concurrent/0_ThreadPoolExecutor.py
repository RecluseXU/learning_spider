# -*- encoding: utf-8 -*-
'''
@Time    :   2021-04-07
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   线程池处理
'''

# here put the import lib
from concurrent.futures import ThreadPoolExecutor, wait
import urllib.request


URLS = ['http://www.baidu.com',
        'http://www.bing.com/',
        'http://google.com/']


# Retrieve a single page and report the URL and contents
def load_url(url, timeout):
    print('处理', url)
    with urllib.request.urlopen(url, timeout=timeout) as conn:
        return conn.read()


# 使用with来确保使用以后，线程池会被清理掉
with ThreadPoolExecutor(max_workers=5) as executor:
    # 利用url创建 Future对象，放入线程池
    futures_ = [executor.submit(load_url, url, 60) for url in URLS]
    wait(futures_)  # 等待所有执行完毕
    for future_ in futures_:
        print(len(future_.result()))
