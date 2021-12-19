# -*- encoding: utf-8 -*-
'''
@Time    :   2021-12-19
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   celery配置
官方配置文档: https://docs.celeryproject.org/en/stable/userguide/configuration.html#configuration
'''

# here put the import lib
from celery import Celery


broker_uri = 'redis://:65535@127.0.0.1:6379/0'
app = Celery('tasks')


# print(f'配置实例的类型:{type(app.conf)}')
app.conf.update(
    broker_url='redis://:65535@127.0.0.1:6379/0',
    result_backend='redis://:65535@127.0.0.1:6379/0',
    task_annotations={
        'tasks.add': {'rate_limit': '10/m'},  # 速度限制
    }
)
# print(app.conf)


@app.task
def add(x, y):
    return x + y
