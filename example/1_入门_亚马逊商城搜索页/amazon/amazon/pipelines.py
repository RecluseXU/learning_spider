# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

from amazon.DB.mysql import MysqlAmazonGoods, init_mysql_db, AmazonGoods


class AmazonPipeline(object):
    def __init__(self):
        init_mysql_db()

    def process_item(self, item, spider):
        MysqlAmazonGoods.update_a_AmazonGoods_data_to_mysql(AmazonGoods(**item))
        return item

    def close_spider(self, spider):
        MysqlAmazonGoods.close_session()
