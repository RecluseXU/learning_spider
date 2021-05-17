# Pipeline  
在一个项目被蜘蛛抓取之后，它被发送到Pipeline  
管道通过几个按顺序执行的组件来处理它    

每个项管道组件（有时称为“项管道”）都是一个实现简单方法的 Python 类。它们接收一个项目并对其执行操作，还决定该项目是否应继续通过管道，或者是否应删除并不再处理  

项目管道的典型用途有：
* 清理HTML数据
* 验证抓取的数据（检查项目是否包含某些字段）
* 检查重复项（并删除它们）
* 将爬取的项目存储在数据库中


## 自己定义Pipeline  
每个item pipeline组件都是一个python类，必须实现以下方法：  
~~~python
def process_item(self, item, spider):
    """ 对每个管道都调用此方法
    函数必须: 返回一个item对象 或 返回Deferred 或 抛出DropItemException
    :param item: 在spider中yeild返回的item对象
    :param spider: Spider对象
    """
~~~
[Defferred定义](https://twistedmatrix.com/documents/current/api/twisted.internet.defer.Deferred.html) 
返回 item 则继续被下级一个 Pipeline 进行处理，丢弃 item 不再由Pipeline处理  


可以使用的一些方法  
~~~python
def open_spider(self, spider):
    """ 当spider启动时此方法会被调用, 可以将一些打开数据库连接的操作写在此处
    """
    pass
~~~
~~~python
def close_spider(self, spider):
""" 当spider关闭时调用此方法会被调用  
"""
    pass
~~~
