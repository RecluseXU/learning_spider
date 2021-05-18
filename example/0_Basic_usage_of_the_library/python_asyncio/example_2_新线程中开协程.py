# -*- encoding: utf-8 -*-
'''
@Time    :   2021-04-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   新线程中开协程
'''

# here put the import lib
import asyncio
import time
import threading


gLock = threading.Lock()
gStart = time.time()


def pinfo(text):
    global gLock
    gLock.acquire()
    print(text)
    gLock.release()


def startLoop(loop):
    asyncio.set_event_loop(loop)
    loop.run_forever()


def moreWork(name, x):
    global gStart
    pinfo("moreWork:start name={}  {},  {}".format(name, x, time.time()-gStart))
    time.sleep(x)
    pinfo("moreWork:endxx name={}  {}， {}".format(name, x, time.time()-gStart))


if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    t = threading.Thread(target=startLoop, args=(loop,))
    t.start()
    pinfo("main:middle")
    loop.call_soon_threadsafe(moreWork, "h1", 6)
    pinfo("main:h1 {}".format(time.time()-gStart))
    loop.call_soon_threadsafe(moreWork, "h2", 3)
    pinfo("main:h2 {}".format(time.time()-gStart))
    for i in range(1, 10):
        time.sleep(2)
        pinfo("main:sleep {}, {}".format(i, time.time()-gStart))
    pinfo("main:end {}".format(time.time()-gStart))
