官方文档： https://docs.python.org/zh-cn/3/library/dis.html  

Python代码在执行的时候，会先被编译为Python字节码，再由Python虚拟机执行Python字节码  
执行python文件时生成的pyc文件，就是用于存储Python字节码  
这些字节码是一种类似于汇编指令的中间语言，但是每个字节码对应的不是机器指令，而是一段C代码  

Dis模块，就是用于查看这些字节码的运行轨迹  
因此可以用Dis模块判断两个函数的内存占用谁会更大，谁会更消耗CPU性能  

通过 Python字节码指令，可以知道Python中内置函数、变量的取值过程、运行逻辑  
这对于 了解/优化 代码性能 非常有用   

这个库的层级只到 Python字节码 这个级别  
若是想要知道具体的实现, 可以查看 cpython虚拟机使用读字节码做对应事情的的代码  
https://github.com/python/cpython/blob/3.8/Python/ceval.c 第 1323 行有句 `switch (opcode)`  
此句便是 根据字节码指令 执行对应操作的 `switch` 语句  
查看 Python字节码指令 对应的 `case` 便能知道 字节码在虚拟机中的真正操作  
