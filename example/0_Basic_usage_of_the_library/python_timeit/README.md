# Timeit  

python 自带的模块之一, 为测算代码耗时提供了一些方法  

官方文档: https://docs.python.org/zh-cn/3/library/timeit.html?highlight=timeit#module-timeit  


~~~python
# 简单测试样例
import timeit
timeit.timeit('"-".join(str(n) for n in range(100))', number=10000)
timeit.timeit('"-".join([str(n) for n in range(100)])', number=10000)
timeit.timeit('"-".join(map(str, range(100)))', number=10000)
~~~

