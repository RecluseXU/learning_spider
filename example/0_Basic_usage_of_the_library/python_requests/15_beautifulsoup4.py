from bs4 import BeautifulSoup

# BS4.4文档：https://beautifulsoup.readthedocs.io/zh_CN/v4.4.0/
html_doc = """
<html><head><title id="one">The Dormouse's story</title></head>
<body>
<p class="title"><b>The Dormouse's story</b></p>

<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>
<!-- ？我是注释 -->
<p class="story">...</p>
"""

# 1.转换类型
#   默认bs4会调用你系统中的lxml的解析库，会警告提示
#   如果不想看到警告，就主动设置bs4的解析库
soup = BeautifulSoup(html_doc, "lxml")

# 2.解析数据
#   标签    'bs4.element.Tag'
#       通过直接 .html标签名 的方式来获取，这个方法只能获取第一个
# result = soup.a
# print(result, "\n", result.name, "\n", type(result))

#   属性 'str'
#       tag的属性操作方法与字典一样
# result = soup.a['href']
# print(result, type(result))

#  内容 Navigablestring "bs4.element.NavigableString"
# result = soup.a.string
# print(result, type(result))

#   通用解析方法
# print("find 标签选择器")
# result = soup.find(name="p")
# print(result, type(result))
# result = soup.find(attrs={"class": "title"})
# print(result, type(result))
# result = soup.find(text="Tillie")
# print(result, type(result))
# result = soup.find(
#     name="p", 
#     attrs={"class": "story"})
# print(result, type(result))
# print()

# print("find_all 多标签选择器")
# result = soup.find_all('a')
# print(result, type(result))
# result = soup.find_all('a', limit=1)
# print(result, type(result))
# result = soup.find_all(attrs={"class": "sister"})
# print(result, type(result))
# print()

# print("select_one CSS选择器")
# result = soup.select_one('.sister')
# print(result, type(result))
# print()

# print("select CSS选择器")
# result = soup.select('.sister')
# print(result, type(result))
# result = soup.select('#one')  # id
# print(result, type(result))
# result = soup.select('head title')  # 后代选择
# print(result, type(result))
# result = soup.select('title, .title')
# print(result, type(result))
# result = soup.select('a[id="link3"]')
# print(result, type(result))

print("标签包裹的内容")
result = soup.select('.title')[0].get_text()
print(result, type(result))

print("标签的属性")
result = soup.select('a')[0].get('href')
print(result, type(result))
