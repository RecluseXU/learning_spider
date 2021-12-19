# -*- encoding: utf-8 -*-
'''
@Time    :   2021-12-19
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   celery
其它命令查看
celery worker --help
celery --help
'''

# here put the import lib
from celery import Celery


broker_uri = 'redis://:65535@127.0.0.1:6379/0'
app = Celery('tasks', backend=broker_uri, broker=broker_uri)
# 第一个参数为当前模块的名称，只有在 __main__ 模块中定义任务时才会生产名称
# backend参数为 Celery结果后端 的链接 URI, 用于记录任务状态与保存结果, 如果你压根不需要结果,不设其实也行
# broker参数为 Broker 的链接 URI


@app.task
def add(x: int, y: int) -> int:
    """创建了一个名称为 add 的任务，返回的俩个数字的和"""
    return x + y


# 使用 worker 参数进行执行 Worker
# celery -A first_worker worker --loglevel=info

# 在生产环境中，如果需要将 Worker 作为守护进程在后台运行
# 可以使用使用类似 supervisord 这样的工具来进行管理
