## CProfileV  
用于分析代码性能的库  
基于 lsprof 的用C语言实现的扩展应用，运行开销比较合理，适合分析运行时间较长的程序  

Pypi: https://pypi.org/project/CProfileV  
Github: https://github.com/ymichael/cprofilev  
Python官方文档相关说明: https://docs.python.org/zh-cn/3/library/profile.html#module-cProfile  


安装
~~~bash
pip install cprofilev
~~~

## 命令行方式的使用方法

1. 通过命令行运行脚本 生成性能统计文件
~~~bash
python -m cProfile python脚本路径 -o 性能统计文件输出路径
~~~


1. 查看 性能统计文件 信息
~~~bash
cprofilev -f 性能统计文件路径
~~~
执行后会启动一个服务, 用浏览器访问即可  
结果是一个简易的表格，比较不直观，一般较少使用

较多的使用方法是生成热力图的方式来查看，比较直观
用flameprof 对 cProfile结果生成热力图
~~~bash
python -m flameprof 性能统计文件路径 > 热力图.svg
~~~
生成的内容其实是 xml 的格式，用浏览器打开即可查看
