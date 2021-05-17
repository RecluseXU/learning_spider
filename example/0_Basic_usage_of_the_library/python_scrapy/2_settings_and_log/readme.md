有非常多的一些设置项目可以在setting里面设置  

## 默认配置的代码说明  
~~~python
settings.py
    # Crawl responsibly by identifying yourself (and your website) on the user-agent
    # 默认的 USER_AGENT 可以被定义在这里
    #USER_AGENT = 'tutorial (+http://www.yourdomain.com)'

    # Obey robots.txt rules
    # 是否遵循 robots.txt 规则
    ROBOTSTXT_OBEY = False

    # Configure maximum concurrent requests performed by Scrapy (default: 16)
    # 最大并发请求数
    #CONCURRENT_REQUESTS = 32

    # Configure a delay for requests for the same website (default: 0)
    # See https://docs.scrapy.org/en/latest/topics/settings.html#download-delay
    # See also autothrottle settings and docs
    # 爬虫同一个网站的时候设置的间歇时间
    #DOWNLOAD_DELAY = 3

    # The download delay setting will honor only one of:
    # 每个域名下，并发的请求数
    #CONCURRENT_REQUESTS_PER_DOMAIN = 16
    # 每个IP,并发请求数
    #CONCURRENT_REQUESTS_PER_IP = 16

    # Disable cookies (enabled by default)
    # 是否启用 cookies（默认启用）
    #COOKIES_ENABLED = False

    # Disable Telnet Console (enabled by default)
    # 是否启用 Telnet 控制台（默认启用）
    #TELNETCONSOLE_ENABLED = False

    # Override the default request headers:
    # 是否要覆盖默认的请求头
    #DEFAULT_REQUEST_HEADERS = {
    #   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    #   'Accept-Language': 'en',
    #}

    # Enable or disable spider middlewares
    # 是否启用爬虫中间件
    # See https://docs.scrapy.org/en/latest/topics/spider-middleware.html
    #SPIDER_MIDDLEWARES = {
    #    'tutorial.middlewares.TutorialSpiderMiddleware': 543,
    #}

    # Enable or disable downloader middlewares
    # 是否启用下载器中间件
    # See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
    #DOWNLOADER_MIDDLEWARES = {
    #    'tutorial.middlewares.TutorialDownloaderMiddleware': 543,
    #}

    # Enable or disable extensions
    # 是否启用插件
    # See https://docs.scrapy.org/en/latest/topics/extensions.html
    #EXTENSIONS = {
    #    'scrapy.extensions.telnet.TelnetConsole': None,
    #}

    # Configure item pipelines
    # 配置 启用的管道
    # See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
    ITEM_PIPELINES = {
    'tutorial.pipelines.TutorialPipeline': 301,
    }

    # Enable and configure the AutoThrottle extension (disabled by default)
    # 限制抓取速度的插件
    # See https://docs.scrapy.org/en/latest/topics/autothrottle.html
    # 启用与否
    AUTOTHROTTLE_ENABLED = True
    # The initial download delay
    # 初始链接抓取延迟
    AUTOTHROTTLE_START_DELAY = 5
    # The maximum download delay to be set in case of high latencies
    # 最大延迟时间
    AUTOTHROTTLE_MAX_DELAY = 60
    # The average number of requests Scrapy should be sending in parallel to
    # each remote server
    # 向服务器并行发送请求的个数
    AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
    # Enable showing throttling stats for every response received:
    # 是否显示这个插件的信息
    AUTOTHROTTLE_DEBUG = False

    # Enable and configure HTTP caching (disabled by default)
    # HTTP缓存
    # See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
    # 启用与否
    #HTTPCACHE_ENABLED = True
    # 缓存过期时间(单位：秒)
    #HTTPCACHE_EXPIRATION_SECS = 0
    # 缓存文件夹路径
    #HTTPCACHE_DIR = 'httpcache'
    # 忽略哪些码
    #HTTPCACHE_IGNORE_HTTP_CODES = []
    #HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.FilesystemCacheStorage'
~~~

## 日志记录配置  
`Scrapy`提供了log功能，可以通过 `logging` 模块使用  

通过在`setting.py`中进行以下设置可以被用来配置`logging`:  
~~~python
LOG_FILE = "mySpider.log"
LOG_LEVEL = "INFO"
~~~
此处指定了 日志文件地址 与 `logging`级别  

### Log级别
`Scrapy`提供5层`Log`级别:
* CRITICAL - 严重错误(critical)
* ERROR - 一般错误(regular errors)
* WARNING - 警告信息(warning messages)
* INFO - 一般信息(informational messages)
* DEBUG - 调试信息(debugging messages)

级别设置得越高，记录的log内容就越少  


### 全部log配置  
* LOG_ENABLED 
默认: True，启用logging  
* LOG_ENCODING  
默认: 'utf-8'，logging使用的编码
* LOG_FILE  
默认: None，在当前目录里创建logging输出文件的文件名  
* LOG_LEVEL  
默认: 'DEBUG'，log的最低级别  
* LOG_STDOUT  
默认: False 如果为 True，进程所有的标准输出(及错误)将会被重定向到log中  
>例如，执行 print "hello" ，其将会在Scrapy log中显示

