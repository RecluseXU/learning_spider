#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   5_configer_event.py
@Time    :   2020/08/06 23:10:14
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   参数设置反馈
'''

# here put the import lib
import typing
from mitmproxy import ctx
from mitmproxy import exceptions


class AddHeader:
    def load(self, loader):
        loader.add_option(
            name="addheader",
            typespec=typing.Optional[int],
            default=None,
            help="Add a header to responses",
        )

    def configure(self, updates):
        if "addheader" in updates:
            if ctx.options.addheader is not None and ctx.options.addheader > 100:
                raise exceptions.OptionsError("addheader must be <= 100")

    def response(self, flow):
        if ctx.options.addheader is not None:
            flow.response.headers["addheader"] = str(ctx.options.addheader)


addons = [
    AddHeader()
]