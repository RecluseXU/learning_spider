// PathNode基础信息
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

var jscode = `
function f(){
    var b = 123;
    a = ['a', 'b'];
}`;

const visitor = {
    BlockStatement(path)
    {
        console.log('当前路径 源码:\n', path.toString());
        console.log('当前路径 节点:\n', path.node)
        console.log('当前路径 父级节点:\n', path.parent);
        console.log('当前路径 父级路径:\n', path.parentPath)
        console.log('当前路径 类型:\n', path.type)
        
        console.log('-------------------------------------------------------')

        console.log('当前路径 contexts:\n', path.contexts);  // 包含节点的queue, parentPath, scope, state, opts, priorityQueue
        console.log('当前路径 hub:\n', path.hub);
        console.log('当前路径 state:\n', path.state);
        console.log('当前路径 opts:\n', path.opts)
        console.log('当前路径 skipKeys:\n', path.skipKeys)
        // 装载着当前path节点的结点
        // 有些时候，这个项会和 parent 相同
        // 有些时候会不同，比如说BlockStatement用一个list来装载函数内容，那么函数内容的container是一个list,则与parent不同
        console.log('当前路径 container:\n', path.container)
        console.log('当前路径 key:\n', path.key)
        console.log('当前路径作用域 scope:\n', path.scope)
    }
}

let ast = parser.parse(jscode);
traverse(ast, visitor);
