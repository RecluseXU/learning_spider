## fcntl  
fcntl 这个模块是 Python 自带的文件锁模块  

**注意：Windows的Python环境中没有这个模块**  

python 官方文档：https://docs.python.org/zh-cn/3.9/library/fcntl.html  



## 文件锁  
使用文件锁能够避免多个进程向同一个文件 写或读 造成混乱的问题  

文件锁可以保证同时只有一个进程写文件
`fcntl` 这个库，它实际上为 Unix 上的 `ioctl`，`flock` 和 `fcntl` 函数提供了一个接口  
