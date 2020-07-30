#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   flask_main.py
@Time    :   2020/05/23 19:46:40
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@License :   (C)Copyright 2017-2022, Recluse
@Desc    :   None
'''

# here put the import lib

from flask import Flask, request
from flask import render_template


app = Flask(__name__)

tool_function = {}


@app.route('/LearningSpider', methods=['GET'])
def index():
    return render_template('/index/index.html')


@app.route('/ui-elements.html', methods=['GET'])
def ui_element():
    return render_template('ui-elements.html')


@app.route('/popularity_estimated', methods=['GET'])
def popularity_estimated():
    return render_template('popularity_estimated.html')


'''AJAX'''
'''页面相关'''
@app.route('/api', methods=['GET'])
def api():
    pass


@app.route('/api/MainMenu', methods=['GET'])
def get_MainMenu_api():
    block = request.args.get("Block")
    return render_template(block + '/main_menu.json')


@app.route('/ajax-get-inner', methods=['GET'])
def inner_popularity_estimated():
    keyword = request.args.get("keyword")
    if keyword == 'PopularityEstimated':
        return render_template('inner_popularity_estimated.html')
    elif keyword == 'GameInfo':
        return render_template('inner_game_information.html')


'''数据相关'''



def run(debug=False):
    app.run(debug=debug)


if __name__ == '__main__':
    run(debug=True)