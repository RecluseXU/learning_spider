# -*- encoding: utf-8 -*-
'''
@Time    :   2022-10-31
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   使用timeit
'''

# here put the import lib
import timeit

# timeit.timeit(stmt='pass', setup='pass', timer=<default timer>, number=1000000, globals=None)
timeit.timeit('"-".join(str(n) for n in range(100))', number=10000)
timeit.timeit('"-".join([str(n) for n in range(100)])', number=10000)
timeit.timeit('"-".join(map(str, range(100)))', number=10000)


# timeit.repeat(stmt='pass', setup='pass', timer=<default timer>, repeat=5, number=1000000, globals=None)
