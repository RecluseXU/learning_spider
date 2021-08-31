# -*- encoding: utf-8 -*-
'''
@Time    :   2021-06-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   文件
'''

# here put the import lib
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from bson import ObjectId
from typing import List, Dict


class MongoFile(AsyncIOMotorGridFSBucket):
    """ 文件与MongoDB, 增删查
    """
    async def upload_file(self, file: bytes) -> ObjectId:
        file_id = await self.upload_from_stream("test_file", file)
        return file_id

    async def get_file(self, file_id: str) -> bytes:
        """ 通過 file_id, 在MongoDB中讀出文件
        :param file_ids: 所需要的文件的file_id
        """
        grid_out = await self.open_download_stream(ObjectId(file_id))
        contents = await grid_out.read()
        return contents

    async def get_files(self, file_ids: List[str]) -> Dict:
        """ 通過 file_id, 在MongoDB中讀出文件
        :param file_ids: 所需要的文件的file_id
        :return: {'file_id': file_bytes}
        """
        tasks = [asyncio.create_task(self.get_file(file_id)) for file_id in file_ids]
        files = {file_id: await task for file_id, task in zip(file_ids, tasks)}
        return files


uri = 'mongodb://localhost:27017'
client = AsyncIOMotorClient(uri)
loop = asyncio.get_event_loop()

mongo_file = MongoFile(client['temp'], bucket_name='temp.fs')
imgs = [open(f'example/0_Basic_usage_of_the_library/python_motor/img/{i}.jpg', 'rb').read() for i in [1, 2]]
# 上传
file_ids = [loop.run_until_complete(mongo_file.upload_file(img)) for img in imgs]
# 下载
dl_imgs = loop.run_until_complete(mongo_file.get_files(file_ids))
for i, img in enumerate(dl_imgs.values(), start=1):
    with open(f'example/0_Basic_usage_of_the_library/python_motor/img/dl_{i}.jpg', 'wb') as f:
        f.write(img)
