# Path-to-RegExp  
github 文档: https://github.com/pillarjs/path-to-regexp/tree/v1.7.0

## 固定参数  
匹配定义: `/a/b`  
匹配意义: 只能匹配 `/a/b` 这个路径  


## 命名参数  
匹配定义: `/:a`  
匹配意义: 匹配只有一个层级的路径, 并把层级参数命名为 a
~~~javascript
var re = pathToRegexp('/:foo/:bar', keys)
re.exec('/test/route')
//=> {foo :'test', bar: 'route'}
~~~

用法: 添加 `:` 后即可为参数命名, 这个层级的参数会被命名为 `:`后的字符. 只能处理`[A-Za-z0-9_]` 中的字符  



## 可选参数  
匹配定义: `/:a/:b?`  

~~~javascript
re.exec('/test')
//=> {a: 'test', b: undefined}

re.exec('/test/route')
//=> {a: 'test', b: 'route'}
~~~

用法: 在定义后添加`?`匹配出现一次或者不出现的情况  



## 匹配0次或多次  
匹配定义: `/:foo*`  

~~~javascript
re.exec('/')
//=> {foo: undefined}

re.exec('/bar/baz')
//=> {foo: 'bar/baz'}
~~~

用法: 在定义后添加`*`匹配出现0次字符或者不出现字符的情况  


## 匹配1次或多次  
匹配定义: `/:foo+`  
~~~javascript
re.exec('/')
//{ foo: null}

re.exec('/bar/baz')
//=> {foo: 'bar/baz'}
~~~
用法: 在定义后添加`*`匹配出现1次字符或者不出现字符的情况  


## 自定义匹配  
匹配定义: `/:foo(\\d+)`
~~~javascript
re.exec('/123')
//=> ['/123', '123']

re.exec('/abc')
//=> null
~~~

用法: 声明指定的匹配, 用括号括起来即可
      使用`\`进行转义  


## 匹配任意字符  
匹配定义: `/foo/*`  
~~~
re.exec('/foo/bar/baz')
//=> ['/foo/bar/baz', 'bar/baz']
~~~

用法: 在一个层级单独使用一个`*` 相当于使用`(.*)`, 可以匹配后续的任意字符(包括`/`)  


