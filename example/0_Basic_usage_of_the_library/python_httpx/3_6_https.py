# -*- encoding: utf-8 -*-
'''
@Time    :   2021-03-02
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   自签证书
    如果需要建立与本地服务器的HTTPS连接（例如，测试仅HTTPS服务），则需要创建并使用自己的证书（自签证书）
    在服务器生成密钥对以后，拿到其对应的.pem密钥文件，传入verify参数之中即可
'''

# here put the import lib
import httpx


r = httpx.get("https://localhost:8000", verify="/tmp/client.pem")
