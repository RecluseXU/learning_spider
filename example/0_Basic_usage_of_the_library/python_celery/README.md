# Celery  

官方文档: https://docs.celeryproject.org/en/stable/  
Github: https://github.com/celery/celery  

@TODO https://www.celerycn.io/ru-men/celery-jin-jie-shi-yong

>官方：我们没有足够的钱来提供 Windows 的支持, 所以不要问关于 Windows 上的问题  

Celery 是一个消息任务队列  
您可以不用了解内部的原理直接使用，它的使用时非常简单的。此外 Celery 可以快速与您的产品扩展与集成，以及 Celery 提供了一系列 Celery 可能会用到的工具和技术支持方案  

> 什么是任务队列  
> 任务队列一般用于线程或计算机之间分配工作的一种机制  
> 任务队列的输入是一个称为任务的工作单元，有专门的职程（Worker）进行不断的监视任务队列，进行执行新的任务工作  

Celery 通过消息机制进行通信，通常使用中间人（Broker）作为客户端和职程（Worker）调节。启动一个任务，客户端向消息队列发送一条消息，然后中间人（Broker）将消息传递给一个职程（Worker），最后由职程（Worker）进行执行中间人（Broker）分配的任务  
Celery 可以有多个职程（Worker）和中间人（Broker），用来提高Celery的高可用性以及横向扩展能力  

* 简单
Celery 上手比较简单，不需要配置文件就可以直接运行。
这是一个简单的 Demo：
~~~python
from celery import Celery
app = Celery('hello', broker='amqp://guest@localhost//')
@app.task
def hello():
    return 'hello world'
~~~

* 高可用
如果出现丢失连接或连接失败，职程（Worker）和客户端会自动重试，并且中间人通过 主/主 主/从 的方式来进行提高可用性。

* 快速
单个 Celery 进行每分钟可以处理数以百万的任务，而且延迟仅为亚毫秒（使用 RabbitMQ、 librabbitmq 在优化过后）  

* 灵活
Celery 的每个部分几乎都可以自定义扩展和单独使用，例如自定义连接池、序列化方式、压缩方式、日志记录方式、任务调度、生产者、消费者、中间人（Broker）等  


## 安装  

~~~
pip install -U Celery
~~~

## 基础使用  

### 选择中间人（Broker）  
官方文档：https://docs.celeryproject.org/en/stable/getting-started/backends-and-brokers/index.html  
Celery 需要一个中间件来进行接收和发送消息，通常以独立的服务形式出现，成为 消息中间人（Broker）  

一般来说常用的是 **RabbitMQ** 或 **Redis**  
生产环境基本是 **RabbitMQ**  



## 常见问题  

### 任务总处于 PENDING （待处理）状态
所有任务的状态默认都是 PENDING （待处理）状态，Celery 在下发任务时不会更换任务状态， 并且如果没有历史任务的都是会被任务待处理状态  

1. 确认任务没有启用 ignore_result
如果启用，会强制跳过任务更新状态。
2. 确保 task_ignore_result 未启用。
3. 确保没有旧的职程（Worker）正在运行。
启动多个职程（Worker）比较容易，在每次运行新的职程（Worker）之前需要确保之前的职程是否关闭。
未配置结果后端的职程（Worker）是否正在运行，可能会消费当前的任务消息。
`–pidfile` 参数设置为绝对路径，确保该情况不会出现。
4. 确认客户是否配置正确。
可能由于某种场景，客户端与职程（Worker）的后端不配置不同，导致无法获取结果，所以需要确保配置是否正确：
~~~

~~~