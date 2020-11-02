import requests

url = "https://cn.bing.com/"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0'
}
free_proxy = {'http': '27.17.45.90:43411'}

response = requests.get(url=url, headers=headers, proxies=free_proxy)