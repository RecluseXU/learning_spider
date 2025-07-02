# py-spy  
Py-Spy是Python程序的抽样分析器。 它允许您可视化查看Python程序在哪些地方花了更多时间，整个监控方式无需重新启动程序或以任何方式修改工程代码。  
Py-Spy的开销非常低：它是用Rust编写的，速度与编译的Python程序不在同一个进程中运行。 这意味着Py-Spy可以安全地用于生成生产环境中的Python应用调优分析  

Github: https://github.com/benfred/py-spy  
Pypi: https://pypi.org/project/py-spy/  

~~~bash
pip install py-spy
~~~


使用方式
1. 通过进程ID记录  
	~~~bash
	py-spy record -o profile.svg --pid 12345
	~~~

2. 通过运行脚本记录  
	~~~bash
	py-spy record -o profile.svg -- python myprogram.py
	~~~
