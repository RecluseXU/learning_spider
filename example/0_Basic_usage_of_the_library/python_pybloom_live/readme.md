# pybloom-live  






## 布隆过滤器  
### 布隆过滤器是什么  
本质上布隆过滤器( BloomFilter )是一种数据结构，比较巧妙的概率型数据结构（probabilistic data structure），特点是高效地插入和查询，可以用来告诉你 “某样东西一定不存在或者可能存在”  

相比于传统的 `Set`、`Map` 等数据结构，它更高效、占用空间更少，但是缺点是其返回的结果是概率性的，而不是确切的  

### 布隆过滤器原理  
布隆过滤器内部维护一个 bitArray(位数组)， 开始所有数据全部置 0 。当一个元素过来时，能过多个哈希函数（hash1,hash2,hash3....）计算不同的在哈希值，并通过哈希值找到对应的 bitArray 下标处，将里面的值 0 置为 1 
需要说明的是，布隆过滤器有一个误判率的概念，误判率越低，则数组越长，所占空间越大。误判率越高则数组越小，所占的空间越小  

### 布隆过滤器的准确性  
布隆过滤器的核心思想有两点：  
* 多个hash，增大随机性，减少hash碰撞的概率  
* 扩大数组范围，使hash值均匀分布，进一步减少hash碰撞的概率  

虽然布隆过滤器已经尽可能的减小hash碰撞的概率了，但是，并不能彻底消除，布隆过滤器只能告诉我们某样东西一定不存在以及它可能存在  

### 布隆过滤器的应用  
* 网页爬虫对URL的去重，避免爬取相同的URL地址  
* 反垃圾邮件，从数十亿个垃圾邮件列表中判断某邮箱是否垃圾邮箱（同理，垃圾短信）  
* 缓存穿透，将所有可能存在的数据缓存放到布隆过滤器中，当黑客访问不存在的缓存时迅速返回避免缓存及DB挂掉  
* 黑名单过滤  



## pybloom  

Github: https://github.com/joseph-fox/python-bloomfilter  
Pypi: https://pypi.org/project/pybloom-live  

### 安装  
python3直接pip安装即可  
~~~python
pip3 install pybloom_live
~~~


## 使用  

`pybloom_live`下面有两种过滤器类，`BloomFilter`（定容）和 `ScalableBloomFilter`（可伸缩的）
