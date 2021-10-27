## 目标  

https://yixingjianzhizuo.cn.china.cn/contact-information/  
![image.png](https://i.loli.net/2021/10/27/7ycdM3mAQZnGSIv.png)  
尝试去获取此中的信息  

## 难点  
不同于 [3_简单_58同城品牌公寓](https://github.com/RecluseXU/learning_spider/tree/master/example/3_%E7%AE%80%E5%8D%95_58%E5%90%8C%E5%9F%8E%E5%93%81%E7%89%8C%E5%85%AC%E5%AF%93)
此站的字体是动态生成的, 其中的字符虽然不变, 但是会打乱顺序  
字体虽然是动态生成，字体中的每一个字符都是不变的（指点阵图）, 所以其实只要知道 点阵图 和 真实字符的关系，就能还原回去  


## 处理流程  

1. 找到加密字符所使用的字体  
	![image.png](https://i.loli.net/2021/10/27/mDuVEaqK587BlcH.png)  
	可以观察到, 此处加密字体名为: **icomoon**

2. 找到字体定义  
	![image.png](https://i.loli.net/2021/10/27/oHdkeTujOWDaICw.png)  
	根据字体名搜索一番, 发现其定义就在 HTML 中  

3. 获取字体文件  
	使用正则把字体的主体内容获取下来, 进行编码处理  
	~~~python
	pattern = re.compile(r"font-family:'icomoon'[\s\S]+?base64,([^']+)")
    font_mark_base64 = pattern.search(html).group(1)
    font_bytes = base64.b64decode(font_mark_base64)
   	~~~

4. 处理字体得到 {HTML_Unicode: 真实字符} 的记录  
	1. 获取获取字符映射关系 {Unicode: 字符名称}  
	2. 获取字符映射关系 {字符名称: 点阵图操作记录_md5}  
		由于点阵图操作相当长, 所以做md5方便后续操作
	3. 实际字符与字符名称映射{点阵图操作记录_md5: 实际上的字符}  
		手工识别做字典 / 点阵图生成图片做OCR
	4. 整合字符映射 {HTML-Unicode: 实际上的字符}  
		HTML-Unicode -> 字符名称 -> 点阵图操作记录 -> 实际上的字符
	具体看 **main.py**
5. 处理HTML


