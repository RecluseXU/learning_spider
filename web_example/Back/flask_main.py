#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   flask_main.py
@Time    :   2020/05/23 19:46:40
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@License :   (C)Copyright 2017-2022, Recluse
@Desc    :   这是Flask编写的后端程序，使用了Flask-RESTful插件，网页内容为基于REST风格 Ajax动态刷新
'''

# here put the import lib

from flask import Flask, render_template
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS


app = Flask(__name__)
api = Api(app)
CORS(app)


def get_RESTful_dict(code: int, success: bool, data, meassage=None) -> dict:
    sta = 'success' if success else 'fail'
    format_d = {
        'code': code,
        'status': sta,
        'data': data,
    }
    if not success:
        format_d['meassage'] = meassage
    return format_d


@app.route('/LearningSpider', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/empty', methods=['GET'])
def empty():
    return render_template('empty.html')


'''RESTful API'''
'''页面相关'''


class MainMenu(Resource):
    def _get_params_parser(self):
        if not hasattr(self, "_parser"):
            self._parser = reqparse.RequestParser()
            self._parser.add_argument('block', required=True, help="Block Type Error", type=str)
        return self._parser

    def _load(self, block: str):
        if not hasattr(self, "_data"):
            self._data = {}

        if not self._data.get(block):
            self._data[block] = eval(render_template(block + '/main_menu.json'))
        return self._data[block]

    def get(self):
        args = self._get_params_parser().parse_args()
        return get_RESTful_dict(200, True, self._load(args['block']))


class Inner(Resource):
    def _get_params_parser(self):
        if not hasattr(self, "_parser"):
            self._parser = reqparse.RequestParser()
            self._parser.add_argument('block', required=True, type=str, help="Block Type Error")
            self._parser.add_argument('keyword', required=True, type=str, help="Keyword Error")
        return self._parser

    def _load(self, block: str, keyword: str):
        if not hasattr(self, "_data"):
            self._data = {}

        if not self._data.get(block):
            self._data[block] = {}
        if not self._data[block].get(keyword):
            self._data[block][keyword] = render_template(block + '/inner/' + keyword + '.html')
        return self._data[block][keyword]

    def get(self):
        args = self._get_params_parser().parse_args()
        return get_RESTful_dict(200, True, self._load(args['block'], args['keyword']))




api.add_resource(MainMenu, '/api/MainMenu')
api.add_resource(Inner, '/api/Inner')


'''调试'''


def run(debug=False):
    app.run(debug=debug)


if __name__ == '__main__':
    run(True)

